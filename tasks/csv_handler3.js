const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const { createObjectCsvWriter } = require("csv-writer");

const port = new SerialPort({
    path: "/dev/ttyACM0",
    baudRate: 115200
});

const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

const csvWriter = createObjectCsvWriter({ // crea un objeto que escribe el csv
    path: "telemetry.csv",
    header: [
        {id:"TEAM_ID", title:"TEAM_ID"},
        {id:"MISSION_TIME", title:"MISSION_TIME"},
        {id:"PACKET_COUNT", title:"PACKET_COUNT"},
        {id:"MODE", title:"MODE"},
        {id:"STATE", title:"STATE"},
        {id:"ALTITUDE", title:"ALTITUDE"},
        {id:"TEMPERATURE", title:"TEMPERATURE"},
        {id:"PRESSURE", title:"PRESSURE"},
        {id:"VOLTAGE", title:"VOLTAGE"},
        {id:"CURRENT", title:"CURRENT"},
        {id:"GYRO_R", title:"GYRO_R"},
        {id:"GYRO_P", title:"GYRO_P"},
        {id:"GYRO_Y", title:"GYRO_Y"},
        {id:"ACCEL_R", title:"ACCEL_R"},
        {id:"ACCEL_P", title:"ACCEL_P"},
        {id:"ACCEL_Y", title:"ACCEL_Y"},
        {id:"GPS_TIME", title:"GPS_TIME"},
        {id:"GPS_ALTITUDE", title:"GPS_ALTITUDE"},
        {id:"GPS_LATITUDE", title:"GPS_LATITUDE"},
        {id:"GPS_LONGITUDE", title:"GPS_LONGITUDE"},
        {id:"GPS_SATS", title:"GPS_SATS"},
        {id:"CMD_ECHO", title:"CMD_ECHO"},
        {id:"OPTIONAL_DATA", title:"OPTIONAL_DATA"}
    ]
});

parser.on("data", async (line) => { // parser json a csv

    console.log("RX:", line);

    if (!line.includes("{")) return; // si es un json

    try {
        const jsonStr = line.substring(line.indexOf("{"));
        const data = JSON.parse(jsonStr);
        await csvWriter.writeRecords([data]);
        console.log("saved", data.PACKET_COUNT); // paquete guardado

    } catch (err) {
        console.log("error:", err.message); // error de parseo
    }
});
