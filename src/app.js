const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { dirname } = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { env } = require('process')

//define paths for Express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views') 
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

const port = process.env.PORT || 3000

app.set('view engine','hbs') // use handlebar as view engine
app.set('views', viewsPath) // set the path to custom view folder
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath)) // set static directory to serve

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Harry'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Harry'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Harry',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address is required'
        })
    }
    geocode(req.query.address, (error, { lat, long, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(lat, long, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Harry',
        errorMessage: 'Help article not found'
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'search term is required'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Harry',
        errorMessage: 'Page not found!'
    })
})

app.listen(port, () =>{
    console.log('Server running on PORT: '+port)
})