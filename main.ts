let pressurePa = 0
let temp = 0
let timestamp = 0
let degrees = 0
let pressurePsi = 0
let humidityPercent = 0
let windSpeedMph = 0
let rainInches = 0
let windDirection = ""
let alt = 0

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

    pressurePa = weatherbit.pressure()
    serial.writeLine("Pressure Pa: " + pressurePa)
    pressurePsi = Math.round(pressurePa * 0.00014503773779 * 100) / 100
    serial.writeLine("Pressure PSI: " + pressurePsi)

    humidityPercent = Math.round(weatherbit.humidity() / 1024)
    serial.writeLine("Humidity: " + humidityPercent)

    windSpeedMph = Math.round(weatherbit.windSpeed() * 0.621371 * 100) / 100
    serial.writeLine("Wind Speed: " + windSpeedMph)

    rainInches = Math.round(weatherbit.rain() * 0.0110236 * 100) / 100
    serial.writeLine("Rain inches: " + rainInches)

    windDirection = weatherbit.windDirection()
    serial.writeLine("Wind Direction: " + windDirection)

    // Altitude calculation
    let pressure_at_sea_level = 101325; // Replace this with the current sea level pressure for your location if known
    alt = 44330 * (1 - Math.pow((pressurePa / pressure_at_sea_level), (1 / 5.255)));
    alt = Math.round(alt * 3.28084); // Convert to feet
    serial.writeLine("Altitude: " + alt)

    // Serialize the readings in CSV format and send over serial
    serial.writeLine(`${timestamp}, ${degrees}, ${pressurePsi}, ${humidityPercent}, ${windSpeedMph}, ${rainInches}, ${windDirection}, ${alt}`)
    basic.pause(1000) // 1 seconds
})