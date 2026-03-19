# Simulacion la telemetría por USB serial
# Raspberry pi pico RP2040
# Micropython

import sys
import time
import select
import random

TEAM_ID = 1000

telemetry_enabled = False
packet_count = 0


def mission_time():
    t = time.localtime()
    return "%02d:%02d:%02d" % (t[3], t[4], t[5])


def generate_telemetry():

    global packet_count

    packet_count += 1

    altitude = round(random.uniform(0, 1000), 1)
    temperature = round(random.uniform(10, 35), 1)
    pressure = round(random.uniform(95, 105), 1)
    voltage = round(random.uniform(3.7, 4.2), 1)
    current = round(random.uniform(0.1, 1.0), 2)

    gyro_r = round(random.uniform(-5, 5), 2)
    gyro_p = round(random.uniform(-5, 5), 2)
    gyro_y = round(random.uniform(-5, 5), 2)

    accel_r = round(random.uniform(-2, 2), 2)
    accel_p = round(random.uniform(-2, 2), 2)
    accel_y = round(random.uniform(-2, 2), 2)

    gps_time = mission_time()
    gps_altitude = round(altitude + random.uniform(-5, 5), 1)
    gps_lat = -33.0 + random.uniform(-0.01, 0.01)
    gps_lon = -66.0 + random.uniform(-0.01, 0.01)
    gps_sats = random.randint(5, 12)

    cmd_echo = "NONE"

    line = (
        f"{TEAM_ID},"
        f"{mission_time()},"
        f"{packet_count},"
        f"F,"
        f"ASCENT,"
        f"{altitude},"
        f"{temperature},"
        f"{pressure},"
        f"{voltage},"
        f"{current},"
        f"{gyro_r},"
        f"{gyro_p},"
        f"{gyro_y},"
        f"{accel_r},"
        f"{accel_p},"
        f"{accel_y},"
        f"{gps_time},"
        f"{gps_altitude},"
        f"{gps_lat},"
        f"{gps_lon},"
        f"{gps_sats},"
        f"{cmd_echo},,"
        f"telemetry"
    )

    return line


def check_serial():

    global telemetry_enabled

    if select.select([sys.stdin], [], [], 0)[0]:
        cmd = sys.stdin.readline().strip()

        if "CX,ON" in cmd:
            telemetry_enabled = True

        if "CX,OFF" in cmd:
            telemetry_enabled = False


while True:

    check_serial()

    if telemetry_enabled:
        print(generate_telemetry())

    time.sleep(1.0)
