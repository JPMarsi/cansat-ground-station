# fileHandler.js — "Function Reference"

Módulo que maneja la conversión de datos y almacenamiento en archivos.
Permite convertir datos entre **JSON, CSV y TXT** y gestionar archivos de **telemetría**.

---

# Variables Exportables

## `var_text_from_serial_to_json_telemetry`

Contiene la telemetría convertida desde el puerto serie a formato JSON.

**Uso esperado**

Se utiliza como buffer intermedio entre:

```
serialController.js -> fileHandler.js
```

---

## `var_text_from_csv_to_json_telemetry`

Contiene datos de telemetría leídos desde un CSV y convertidos a JSON.

**Uso esperado**

Permite volver a procesar datos guardados en archivos CSV.

---

# Gestión de rutas

## `file_path(path)`

Define el directorio donde se guardarán los archivos generados.

Si el directorio no existe, se crea automáticamente.

### Parámetros

| parámetro | tipo   | descripción                            |
| --------- | ------ | -------------------------------------- |
| path      | string | ruta donde se almacenarán los archivos |

### Ejemplo

```javascript
file_path("./data")
```

---

# Generación de timestamp

## `timestamp()`

Genera la hora basado en el reloj de la computadora.

Formato:

```
AAAA_MM_DD_HH_MM_SS
```

### Ejemplo

```
2026_03_16_22_15_05
```

El timestamp se usa para nombrar archivos de telemetría.

---

# Conversión de datos

## `data_getHandle_from_json_to_csv(data)`

Convierte un objeto JSON en una línea CSV.

Los valores del JSON se extraen en el orden en que aparecen y se separan por comas.

### Parámetros

| parámetro | tipo   | descripción                 |
| --------- | ------ | --------------------------- |
| data      | object | datos de telemetría en JSON |

### Retorna

```
string
```

### Ejemplo

JSON:

```json
{
 "TEAM_ID":1000,
 "ALTITUDE":120.5
}
```

CSV:

```
1000,120.5
```

---

## `data_get_from_json_to_txt(data, format)`

Convierte datos JSON en texto plano.

### Parámetros

| parámetro | tipo   | descripción       |
| --------- | ------ | ----------------- |
| data      | object | objeto JSON       |
| format    | string | formato de salida |

### Formatos

#### `var`

Formato:

```
VARIABLE = VALOR
```

Ejemplo:

```
ALTITUDE = 120.5
TEMP = 25.3
```

---

#### `cmd`

Formato:

```
COMANDO VALOR
```

Ejemplo:

```
SET ALTITUDE
SET MODE
```

---

#### `msg`

Formato:

```
TIPO MENSAJE
```

Ejemplo:

```
INFO Telemetry started
ERROR Sensor failure
```

---

# Archivos CSV

## `file_csv_create(name)`

Crea un archivo CSV vacío.

### Parámetros

| parámetro | tipo   | descripción        |
| --------- | ------ | ------------------ |
| name      | string | nombre del archivo |

### Retorna

```
ruta completa del archivo
```

---

# Archivos de telemetría

## `file_csv_create_telemetry(id,team)`

Crea un archivo CSV específico para telemetría.

Formato del nombre:

```
telemetry_teamNNNN_idXXXX_AAAA_MM_DD_HH_MM_SS.csv
```

### Parámetros

| parámetro | tipo   | descripción               |
| --------- | ------ | ------------------------- |
| id        | number | identificador del archivo |
| team      | number | identificador del equipo  |

### Ejemplo

```
telemetry_team0000_id0001_2026_03_16_22_10_05.csv
```

---

## `file_csv_writeHeader_telemetry(id, header)`

Escribe el **header** del CSV de telemetría.

### Parámetros

| parámetro | tipo   |
| --------- | ------ |
| id        | number |
| header    | string |

### Ejemplo

```
TEAM_ID,MISSION_TIME,PACKET_COUNT,ALTITUDE
```

---

## `file_csv_writeLine_telemetry(id, line)`

Agrega una línea de datos al archivo CSV de telemetría.

### Parámetros

| parámetro | tipo   |
| --------- | ------ |
| id        | number |
| line      | string |

### Ejemplo

```
1000,12:00:01,1,150.3
```

---

## `file_csv_readLine_telemetry(id,line)`

Lee una línea específica de un archivo CSV.

### Parámetros

| parámetro | tipo   | descripción               |
| --------- | ------ | ------------------------- |
| id        | number | identificador del archivo |
| line      | number | número de línea           |

### Notas

```
line 0 -> header (cabecera, nombre de las vars)
line 1 -> primer dato
```

### Retorna

```
string | null
```

---

# Flujo de uso

```
Serial -> [serialController] -> JSON -> [fileHandler] -> CSV

```

1. Se recibe telemetría desde el puerto serie.
2. Se convierte a JSON.
3. Se convierte a CSV (o cualquier tipo de archivo basado en texto).
4. Se escribe en el archivo.

Ejemplo:

```javascript
const json = serial_read_to_json_telemetry() // de serial a json

const csv = data_getHandle_from_json_to_csv(json) // de json a csv

file_csv_writeLine_telemetry(id) // guarda la linea
```

---

# Funciones futuras (no implementadas aun)

El módulo está para incluir:

### Txt - logs

```
file_txt_create
file_txt_create_log
file_txt_writeHeader_log
file_txt_writeLine_log
file_txt_readLine_log
```

### Markdown - resume

```
file_mkd_create
file_mkd_create_resume
file_mkd_writeHeader_resume
file_mkd_writeBody_resume
file_mkd_readLine_resume
```

Estas funciones son para:

* logs de sistema (los comandos enviados/recibidos)
* reportes (mensajes de errores, warnings, etc)
* resúmenes (si se quiere dar un vistazo general de forma "pretty")
