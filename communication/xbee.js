const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

// configura el puerto
const port = new SerialPort({
  path: '/dev/ttyUSB0', // en Linux/Mac '/dev/ttyUSB0'
  baudRate: 115200,
});

// configura el parser (separadas por \n)
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

// evento: cuando el puerto se abre
port.on('open', () => {
  console.log('Conexión serial establecida.');
});

// evento: recibir datos parseados
parser.on('data', (data) => {
  console.log(`Dato recibido: ${data}`);
});

// errores
port.on('error', (err) => {
  console.error('Error en el puerto serial: ', err.message);
});


