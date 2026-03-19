// config.js
// Objeto central de configuración de la aplicación.

export const Telemetry = {
  TEAM_ID: 0,
  MISSION_TIME: "00:00:00",
  PACKET_COUNT: 0,
  MODE: "",
  STATE: "",

  ALTITUDE: 0,
  TEMPERATURE: 0,
  PRESSURE: 0,
  VOLTAGE: 0,
  CURRENT: 0,

  GYRO_R: 0,
  GYRO_P: 0,
  GYRO_Y: 0,

  ACCEL_R: 0,
  ACCEL_P: 0,
  ACCEL_Y: 0,

  GPS_TIME: "00:00:00",
  GPS_ALTITUDE: 0,
  GPS_LATITUDE: 0,
  GPS_LONGITUDE: 0,
  GPS_SATS: 0,

  CMD_ECHO: "",
  OPTIONAL_DATA: "",
};

//Orden oficial de campos para CSV/parseo
export const TelemetryFields = [
  "TEAM_ID",
  "MISSION_TIME",
  "PACKET_COUNT",
  "MODE",
  "STATE",
  "ALTITUDE",
  "TEMPERATURE",
  "PRESSURE",
  "VOLTAGE",
  "CURRENT",
  "GYRO_R",
  "GYRO_P",
  "GYRO_Y",
  "ACCEL_R",
  "ACCEL_P",
  "ACCEL_Y",
  "GPS_TIME",
  "GPS_ALTITUDE",
  "GPS_LATITUDE",
  "GPS_LONGITUDE",
  "GPS_SATS",
  "CMD_ECHO",
  "OPTIONAL_DATA",
];