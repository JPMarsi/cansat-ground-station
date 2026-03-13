import { Telemetry } from "./config.js";

/**
 * Setea texto seguro en un elemento por id.
 */
function setText(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = value ?? "";
}

/**
 * Formatea números sin romper si viene string/null.
 */
function fmtNumber(v, decimals = 2) {
  if (v === null || v === undefined || v === "") return "0";
  const n = Number(v);
  if (Number.isNaN(n)) return String(v);
  return n.toFixed(decimals);
}


// Actualiza TODA la info del panel izquierdo.
export function updateLeftPanel(t = Telemetry) {
  // Cabecera
  setText("team", t.TEAM_ID);
  setText("missionTime", t.MISSION_TIME);
  setText("packetCount", t.PACKET_COUNT);
  setText("mode", t.MODE);
  setText("state", t.STATE);

  // Sensores principales
  setText("altitude", fmtNumber(t.ALTITUDE, 2));
  setText("temperature", fmtNumber(t.TEMPERATURE, 2));
  setText("pressure", fmtNumber(t.PRESSURE, 2));
  setText("voltage", fmtNumber(t.VOLTAGE, 2));
  setText("current", fmtNumber(t.CURRENT, 2));

  // Giroscopio
  setText("gyroR", fmtNumber(t.GYRO_R, 2));
  setText("gyroP", fmtNumber(t.GYRO_P, 2));
  setText("gyroY", fmtNumber(t.GYRO_Y, 2));

  // Acelerómetro
  setText("accelR", fmtNumber(t.ACCEL_R, 2));
  setText("accelP", fmtNumber(t.ACCEL_P, 2));
  setText("accelY", fmtNumber(t.ACCEL_Y, 2));

  // GPS
  setText("gpsTime", t.GPS_TIME);
  setText("gpsAltitude", fmtNumber(t.GPS_ALTITUDE, 2));
  setText("gpsLatitude", fmtNumber(t.GPS_LATITUDE, 6));
  setText("gpsLongitude", fmtNumber(t.GPS_LONGITUDE, 6));
  setText("gpsSats", t.GPS_SATS);

  setText("cmdEcho", t.CMD_ECHO);
  setText("optionalData", t.OPTIONAL_DATA);
}

// Inicializa actualización automática al cargar la página.
export function initLeftPanelAutoUpdate() {
  window.addEventListener("DOMContentLoaded", () => updateLeftPanel());
}