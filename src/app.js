//nodemon src/app.js -e js,hbs ------ Enabling nodemon to read .js & .hbs files

const path = require('path') // Import Path module from Node.js
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') //Customizing directory to replace views directory
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup Handlebars (hbs) engine and views location
app.set('view engine', 'hbs') //Setting Template
app.set('views', viewsPath) //Point to customized directory
hbs.registerPartials(partialsPath) //Point to Partials directory

//Setup static directory to serve
app.use(express.static(publicDirectoryPath)) //Configures Express application

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Guilherme Nomelini'
    })    //Render Handlebars view
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Guilherme Nomelini'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Guilherme Nomelini'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {  //Destructuring and setting default parameter as {}
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
               return res.send ({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found.',
        title: 'Help',
        name: 'Guilherme Nomelini'
    })
})

app.get('*', (req, res) => { //Error Page needs to come last
    res.render('404', {
        errorMessage: 'Page not found.',
        title: 'Weather',
        name: 'Guilherme Nomelini'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
// app.com
// app.com/help
// app.com/about