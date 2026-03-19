//Hecho con Ia, pertenece al sistema de prueba
import { Telemetry } from "./configTest.js";
import { updateLeftPanel } from "./updatePanel.js";

let telemetryRows = [];
let currentIndex = 0;
let timerId = null;

async function loadTelemetryFile(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`No se pudo cargar ${path}`);
  }

  const text = await response.text();

  const lines = text
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0);

  telemetryRows = lines.map((line, index) => {
    try {
      return JSON.parse(line);
    } catch (error) {
      console.error(`Error parseando la línea ${index + 1}:`, line);
      return null;
    }
  }).filter(Boolean);

  console.log(`[main] Filas cargadas: ${telemetryRows.length}`);
}

function applyTelemetryRow(row) {
  Object.assign(Telemetry, row);
  updateLeftPanel(Telemetry);
  console.log("[main] Telemetry actualizada:", Telemetry);
}

function startPlayback() {
  if (telemetryRows.length === 0) {
    console.warn("[main] No hay filas para reproducir");
    return;
  }

  if (timerId) {
    clearInterval(timerId);
  }

  currentIndex = 0;

  applyTelemetryRow(telemetryRows[currentIndex]);
  currentIndex++;

  timerId = setInterval(() => {
    if (currentIndex >= telemetryRows.length) {
  currentIndex = 0;
  }

    applyTelemetryRow(telemetryRows[currentIndex]);
    currentIndex++;
  }, 1000);
}

async function init() {
  try {
    updateLeftPanel(Telemetry); // pinta valores iniciales
    await loadTelemetryFile("./telemetry.txt");
    startPlayback();
  } catch (error) {
    console.error("[main] Error al inicializar:", error);
  }
}

init();