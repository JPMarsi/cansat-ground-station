// fileHandler.js
// manejo de archivos CSV, TXT y Markdown

const fs = require("fs");
const path = require("path");

// VARIABLES EXPORTABLES

let var_text_from_serial_to_json_telemetry = null;
let var_text_from_csv_to_json_telemetry = null;

let base_path = "./data";

// PATH
// cambia el lugar donde se guardan los archivos

function file_path(p) {
  base_path = p;

  if (!fs.existsSync(base_path)) {
    fs.mkdirSync(base_path, { recursive: true });
  }
}

// TIME
// Toma el horario de la pc
// hay que cambiarlo o agregar la de la telemetria

function timestamp() {
  const d = new Date();

  const Y = d.getFullYear();
  const M = String(d.getMonth() + 1).padStart(2, "0");
  const D = String(d.getDate()).padStart(2, "0");

  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");

  return `${Y}_${M}_${D}_${h}_${m}_${s}`;
}

// JSON to CSV
// Hace la conversion

function data_getHandle_from_json_to_csv(data) {
  if (!data) return null;

  const values = Object.values(data);

  return values.join(",");
}

// JSON to TXT

function data_get_from_json_to_txt(data, format) {
  if (!data) return null;

  let out = [];

  if (format === "var") {
    for (const [k, v] of Object.entries(data)) {
      out.push(`${k} = ${v}`);
    }
  }

  if (format === "cmd") {
    for (const [k, v] of Object.entries(data)) {
      out.push(`${k} ${v}`);
    }
  }

  if (format === "msg") {
    for (const [k, v] of Object.entries(data)) {
      out.push(`${k} ${v}`);
    }
  }

  return out.join("\n");
}

// CSV GENERICO (por si se quiere guardar otras cosas)

function file_csv_create(name) {
  const full = path.join(base_path, name);
  fs.writeFileSync(full, "");
  return full;
}

// CSV TELEMETRY

let telemetry_files = {};

function file_csv_create_telemetry(id, team) {
  const name = `telemetry_team${String(team)}_id${String(id).padStart(4, "0")}_${timestamp()}.csv`;

  const full = path.join(base_path, name);

  fs.writeFileSync(full, "");

  telemetry_files[id] = full;

  return full;
}

function file_csv_writeHeader_telemetry(id, header) {
  const file = telemetry_files[id];
  if (!file) return;

  fs.appendFileSync(file, header + "\n");
}

function file_csv_writeLine_telemetry(id, line) {
  const file = telemetry_files[id];
  if (!file) return;

  fs.appendFileSync(file, line + "\n");
}

function file_csv_readLine_telemetry(id, line) {
  const file = telemetry_files[id];
  if (!file) return null;

  const data = fs.readFileSync(file, "utf8").split("\n");

  return data[line] || null;
}

module.exports = {
  var_text_from_serial_to_json_telemetry,
  var_text_from_csv_to_json_telemetry,

  data_getHandle_from_json_to_csv,
  data_get_from_json_to_txt,

  file_path,

  file_csv_create,
  file_csv_create_telemetry,
  file_csv_writeHeader_telemetry,
  file_csv_writeLine_telemetry,
  file_csv_readLine_telemetry,

  // Para despues
  /*
  file_txt_create,
  file_txt_create_log,
  file_txt_writeHeader_log,
  file_txt_writeLine_log,
  file_txt_readLine_log,

  file_mkd_create,
  file_mkd_create_resume,
  file_mkd_writeHeader_resume,
  file_mkd_writeBody_resume,
  file_mkd_readLine_resume
  */
};
