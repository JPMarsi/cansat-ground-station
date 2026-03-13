// El main.js funciona con un simulador de telemetría que se actualiza cada segundo. Para probar el frontend.
//{"TEAM_ID":0,"MISSION_TIME":"00:00:05","PACKET_COUNT":5,"MODE":"F","STATE":"ASCENT","ALTITUDE":105.0,"TEMPERATURE":25.0,"PRESSURE":101.3,"VOLTAGE":4.1,"CURRENT":0.5,"GYRO_R":1.1,"GYRO_P":2.2,"GYRO_Y":3.3,"ACCEL_R":0.1,"ACCEL_P":0.2,"ACCEL_Y":0.3,"GPS_TIME":"00:00:05","GPS_ALTITUDE":105.0,"GPS_LATITUDE":-33.295000,"GPS_LONGITUDE":-66.337000,"GPS_SATS":8,"CMD_ECHO":"OK","OPTIONAL_DATA":"SIM"}
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import { Telemetry } from "./config.js";

const PORT_PATH = "COM6";     // Se cambia a mano
const BAUD_RATE = 115200;

const port = new SerialPort({
  path: PORT_PATH,
  baudRate: BAUD_RATE,
});

const parser = port.pipe(
  new ReadlineParser({ delimiter: "\r\n" })
);

port.on("open", () => {
  console.log(`[main] Puerto abierto: ${PORT_PATH} @ ${BAUD_RATE}`);
});

port.on("error", (err) => {
  console.error("[main] Error en puerto:", err.message);
});

parser.on("data", (line) => {
  const cleanLine = line.trim();
  const data = JSON.parse(cleanLine);
  Object.assign(Telemetry, data); //actualizo el objeto global de telemetría
console.log("[main] Telemetría actualizada:", Telemetry);
  








});