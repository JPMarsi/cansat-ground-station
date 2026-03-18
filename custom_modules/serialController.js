// serialController.js
// manejo del puerto serie y parsing de telemetría

const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

let port = null;
let parser = null;

// variable exportable con la linea cruda de telemetria
// para despues convertirla a json y csv con el handler
let var_text_from_serial_to_raw_telemetry = null;

/*
// serial_init(puerto, baudios)
// abre el puerto serie y prepara el parser por linea
// es decir, lee la linea completa, no un par de chars
*/
function serial_init(portPath, baud) {
  port = new SerialPort({
    path: portPath,
    baudRate: baud,
    autoOpen: true,
  });

  parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" })); // detecta fin linea

  return parser;
}

/*
// serial_detect()
// detecta telemetria buscando ",,telemetry" (un identificador)
// y guarda la linea cruda, sin formatear
*/
function serial_detect(line) {
  if (!line) return null;

  const clean = line.trim();

  if (clean.includes(",,telemetry")) {
    var_text_from_serial_to_raw_telemetry = clean;
    return "telemetry";
  }

  return "unknown";
}

/*
// serial_read_to_json_telemetry()
// convierte la telemetria guardada a json
// detecta el ",," y guarda solo telemetria
*/
function serial_read_to_json_telemetry() {
  if (!var_text_from_serial_to_raw_telemetry) return null;

  let text = var_text_from_serial_to_raw_telemetry;

  const split = text.split(",,");
  const data = split[0];

  const fields = data.split(",");

  let json = {};

  for (let i = 0; i < fields.length; i++) {
    json[`FIELD_${i}`] = fields[i];
  }

  return json;
}

/*
// serial_write_from_cmd_telemetry(state)
// envia comando para encender o apagar telemetria
// los comandos genericos son funciones fijas
*/
function serial_write_from_cmd_telemetry(state, teamId = 0) {
  if (!port || !port.writable) return;

  const cmd = state ? "ON" : "OFF";

  const message = `CMD,${teamId},CX,${cmd}\r\n`;

  port.write(message);
}

module.exports = {
  serial_init,
  serial_detect,
  serial_read_to_json_telemetry,
  serial_write_from_cmd_telemetry,
  var_text_from_serial_to_raw_telemetry,
};
