temp = 0
weatherbit.start_weather_monitoring()

def on_forever():
    global temp
    temp = weatherbit.temperature() / 100
    basic.show_number(temp)
basic.forever(on_forever)
