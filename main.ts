let timestamp = 0;
let temp = 0;
let degrees = 0;
let meters = 0;
let pressure_hPa = 0;
let pressureInHg = 0;
let rawpressure = 0;
let alt = 0;
let pressurePsi = 0;
let humidityPercent = 0;
let windSpeedMph = 0;
let windDirection = "";
let previousRain = 0;
let rainInches = 0;
let currentRain = 0;

const pressure_at_sea_level_hPa = 1013.25;

weatherbit.startWeatherMonitoring();
serial.redirectToUSB();

function calculateData() {
    timestamp = input.runningTime();
    temp = Math.round(weatherbit.temperature() / 100 * 10000) / 10000;
    degrees = Math.round((temp * (9 / 5) + 32) * 10000) / 10000;
    pressure_hPa = Math.idiv(weatherbit.pressure(), 700);
    pressureInHg = Math.round(pressure_hPa * 0.0295301 * 10000) / 10000;
    rawpressure = Math.round(weatherbit.pressure() * 10000) / 10000;
    alt = Math.round((alt + 5400) * 10000) / 10000;
    pressurePsi = Math.round(pressure_hPa * 0.014503773773022 * 10000) / 10000;
    humidityPercent = Math.round(weatherbit.humidity() / 1024 * 10000) / 10000;
    windSpeedMph = Math.round(weatherbit.windSpeed() * 0.621371 * 10000) / 10000;

    // Handle the rain counter reset
    currentRain = weatherbit.rain();
    if (currentRain > previousRain) {
        rainInches = Math.round((currentRain - previousRain) * 0.0110236 * 10000) / 1000;
    } else {
        rainInches = 0;
    }
    previousRain = currentRain;

    windDirection = weatherbit.windDirection();
}

function createJSONData() {
    return `{
        "Timestamp": ${timestamp},
        "Temperature (F)": ${degrees},
        "Pressure (PSI)": ${pressurePsi},
        "Humidity (%)": ${humidityPercent},
        "Wind Speed (MPH)": ${windSpeedMph},
        "Rain (inches)": ${rainInches},
        "Wind Direction": "${windDirection}",
        "Altitude": ${alt},
        "Raw Pressure": ${rawpressure},
        "Pressure (inHg)": ${pressureInHg}
    }`;
}

basic.forever(function () {
    calculateData();
    serial.writeLine(createJSONData());  // Directly passing the created JSON string
    basic.pause(2000);
});