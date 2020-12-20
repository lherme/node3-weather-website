const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=6d5cd6001ed026b20da4cff67de35662&units=metric'
    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.message) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,
                `${body.weather[0].main}. It is currently ${body.main.temp}°C and it feels like ${body.main.feels_like}°C.`)
        }
    })
}

module.exports = forecast