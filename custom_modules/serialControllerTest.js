// prueba del serialController

const {
  serial_init,
  serial_detect,
  serial_read_to_json_telemetry,
  serial_write_from_cmd_telemetry,
} = require("./serialController"); // lo importa

async function run_test() {
  let count = 0;

  // iniciar puerto
  const parser = serial_init("/dev/ttyACM0", 115200); // en windows es COM
  console.log("Connected to /dev/ttyACM0 at 115200");

  // activar telemetria
  serial_write_from_cmd_telemetry(true, 1000);
  console.log("Telemetry ON");

  parser.on("data", (line) => {
    if (count >= 10) return;

    const type = serial_detect(line);

    if (type === "telemetry") {
      const json = serial_read_to_json_telemetry();

      console.log("TELEMETRY JSON:");
      console.log(json);

      count++; // 10 rondas de telemetria

      if (count === 10) {
        // apagar telemetria
        serial_write_from_cmd_telemetry(false);

        console.log("Telemetry OFF");

        setTimeout(() => {
          process.exit(0);
        }, 5000);
        console.log("Timeout 5sec");
      }
    }
  });
}

run_test();
