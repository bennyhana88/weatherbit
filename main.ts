let pressure_at_sea_level_hPa = 1013.25  // Standard atmospheric pressure at sea level in hPa
let pressure_hPa = 0
let temp = 0
let alt = 0
let windDirection = ""
let rainInches = 0
let windSpeedMph = 0
let humidityPercent = 0
let pressurePsi = 0
let degrees = 0
let timestamp = 0
let rawpressure = 0

weatherbit.startWeatherMonitoring()
// Redirect serial output to USB
serial.redirectToUSB()
// Initialization test
serial.writeLine("Initialization successful")

basic.forever(function () {
    timestamp = input.runningTime()
    // Collect all sensor readings concurrently
    temp = weatherbit.temperature() / 100
    serial.writeLine("Temp raw: " + temp)
    degrees = Math.round((temp * (9 / 5) + 32) * 100) / 100
    serial.writeLine("Degrees: " + degrees)

    // Convert pressure reading from Pa to hPa
    pressure_hPa = Math.idiv(weatherbit.pressure(), 100)
    serial.writeLine("Pressure hPa: " + pressure_hPa)

    // Raw Pressure
    rawpressure = weatherbit.pressure()
    serial.writeLine("Raw Pressure: " + rawpressure)

    // Altitude calculation using pressure_hPa
    alt = 44330 * (1 - (pressure_hPa / pressure_at_sea_level_hPa) ** (1 / 5.255))
    // Convert to feet
    alt = Math.round(alt * 3.28084)
    serial.writeLine("Altitude: " + alt)

    // Convert hPa to PSI
    pressurePsi = Math.round(pressure_hPa * 0.014503773773022 * 100) / 100
    serial.writeLine("Pressure PSI: " + pressurePsi)

    humidityPercent = Math.round(weatherbit.humidity() / 1024)
    serial.writeLine("Humidity: " + humidityPercent)

    windSpeedMph = Math.round(weatherbit.windSpeed() * 0.621371 * 100) / 100
    serial.writeLine("Wind Speed: " + windSpeedMph)

    rainInches = Math.round(weatherbit.rain() * 0.0110236 * 100) / 100
    serial.writeLine("Rain inches: " + rainInches)

    windDirection = weatherbit.windDirection()
    serial.writeLine("Wind Direction: " + windDirection)

    // Serialize the readings in CSV format and send over serial
    serial.writeLine("" + (`${timestamp}, ${degrees}, ${pressurePsi}, ${humidityPercent}, ${windSpeedMph}, ${rainInches}, ${windDirection}, ${alt}, ${rawpressure}`))

    basic.pause(1000)
})
