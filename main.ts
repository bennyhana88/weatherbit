let pressure_hPa = 0
let temp = 0
let rawpressure = 0
let timestamp = 0
let degrees = 0
let pressurePsi = 0
let humidityPercent = 0
let windSpeedMph = 0
let rainInches = 0
let windDirection = ""
let alt = 0
let meters = 0
let pressureInHg = 0
let pressure_at_sea_level_hPa = 1013.25
weatherbit.startWeatherMonitoring()
serial.redirectToUSB()
serial.writeLine("Initialization successful")
basic.forever(function () {
    timestamp = input.runningTime()
    temp = weatherbit.temperature() / 100
    temp = Math.round(temp * 10000) / 10000
    serial.writeLine("Temp raw: " + temp)
    degrees = Math.round((temp * (9 / 5) + 32) * 10000) / 10000
    serial.writeLine("Degrees: " + degrees)
    meters = Math.round(weatherbit.altitude() * 10000) / 10000
    serial.writeLine("Meters: " + meters)
    pressure_hPa = Math.idiv(Math.idiv(weatherbit.pressure(), 100), 7)
    serial.writeLine("Pressure hPa: " + pressure_hPa)
    pressureInHg = Math.round(pressure_hPa * 0.0295301 * 10000) / 10000
    serial.writeLine("Pressure inHg: " + pressureInHg)
    rawpressure = Math.round(weatherbit.pressure() * 10000) / 10000
    serial.writeLine("Raw Pressure: " + rawpressure)
    alt = 44330 * 3.28084 * (1 - (pressure_hPa / pressure_at_sea_level_hPa) ** (1 / 5.255))
    alt = Math.round(alt * 10000) / 10000
    alt = alt + 5280
    serial.writeLine("Altitude: " + alt)
    pressurePsi = Math.round(pressure_hPa * 0.014503773773022 * 10000) / 10000
    serial.writeLine("Pressure PSI: " + pressurePsi)
    humidityPercent = Math.round(weatherbit.humidity() / 1024 * 10000) / 10000
    serial.writeLine("Humidity: " + humidityPercent)
    windSpeedMph = Math.round(weatherbit.windSpeed() * 0.621371 * 10000) / 10000
    serial.writeLine("Wind Speed: " + windSpeedMph)
    rainInches = Math.round(weatherbit.rain() * 0.0110236 * 10000) / 1000
    serial.writeLine("Rain inches: " + rainInches)
    windDirection = weatherbit.windDirection()
    serial.writeLine("Wind Direction: " + windDirection)
    serial.writeLine("" + (`${timestamp}, ${degrees}, ${pressurePsi}, ${humidityPercent}, ${windSpeedMph}, ${rainInches}, ${windDirection}, ${alt}, ${meters}, ${rawpressure}, ${pressureInHg}`))
    basic.pause(1000)
})
