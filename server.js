const express = require('express')
const db = require('./db')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const userController = require('./controllers/userController')
const dayController = require('./controllers/dayController')
const gratitudeController = require('./controllers/gratitudeController')

const PORT = process.env.PORT || 3001

const app = express()
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(cors())

// base route
app.get('/', (req, res) => res.send('Home'))

// users routes
app.get('/users', userController.getAllUsers)
app.get('/users/:id', userController.getOneUser)
app.post('/users', userController.createUser)
app.put('/users/:id', userController.updateUser)
app.delete('/users/:id', userController.deleteUser)

app.get('/days', dayController.getAllDays)
app.get('/days/:id', dayController.getOneDay)
app.post('/days', dayController.createDay)
app.put('/days/:id', dayController.updateDay)
app.delete('/days/:id', dayController.deleteDay)

app.get('/gratitude', gratitudeController.getAllGrats)
app.get('/gratitude/:id', gratitudeController.getOneGrat)
app.post('/gratitude', gratitudeController.createGrat)
app.put('/gratitude/:id', gratitudeController.updateGrat)
app.delete('/gratitude/:id', gratitudeController.deleteGrat)

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))