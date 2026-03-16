// prueba del fileHandler

const fh = require("./fileHandler"); // lo importa

// establecer path de guardado (el directorio actual)
fh.file_path("./data");

// crear archivo csv de telemetria vacio
const id = 1;
const teamid = 1000;
const file = fh.file_csv_create_telemetry(id, teamid);

console.log("CSV:", file);

// crear el header
const header = "TEAM_ID,MISSION_TIME,PACKET_COUNT,MODE,STATE,ALTITUDE";
fh.file_csv_writeHeader_telemetry(id, header);

// datos simulados (json random)
const telemetry_json = {
  TEAM_ID: 1000,
  MISSION_TIME: "12:00:01",
  PACKET_COUNT: 1,
  MODE: "F",
  STATE: "ASCENT",
  ALTITUDE: 123.4,
};

// convertir json a csv
const csv_line = fh.data_getHandle_from_json_to_csv(telemetry_json);

// escribir linea nueva
fh.file_csv_writeLine_telemetry(id, csv_line);

console.log("Linea escrita:", csv_line);

// leer linea 1 (la 0 es el header)
const line = fh.file_csv_readLine_telemetry(id, 1);

console.log("Linea leida:", line);
