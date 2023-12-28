// DEPENDENCIES
const express = require('express')
const app = express()
const { Sequelize } = require('sequelize')


// CONFIGURATION / MIDDLEWARE
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))



// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API'
    })
})

// CONTROLLERS 
const bandsController = require('./controllers/bands_controller')
console.log(bandsController)
app.use('/bands', bandsController)

const eventsController = require('./controllers/events_controller')
console.log(eventsController)
app.use('/events', eventsController)

const stagesController = require('./controllers/stages_controller')
console.log(stagesController)
app.use('/stages', stagesController)




// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`🎸 Rockin' on port: ${process.env.PORT}`)
})