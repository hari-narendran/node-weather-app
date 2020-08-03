const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3dcc191c65317827b59a672f53465c13&query='+ lat +',' + long + '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        }else if(body.error) {
            callback(body.error.info, undefined)
        }
        else {
                const temp = body.current.temperature
                const precip = body.current.precip
                const desc = body.current.weather_descriptions[0]
                const feelsLike = body.current.feelslike

                callback(undefined, desc + '. Its currently ' + temp + ' degrees out and feels like '+ feelsLike+ '. ' + precip + '% chance of rain.')
                /* callback(undefined, {
                    temp : body.current.temperature,
                    precip : body.current.precip,
                    desc : body.current.weather_descriptions[0]
                }) */
        }
    })
}

module.exports = forecast