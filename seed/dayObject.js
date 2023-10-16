const db = require('../db')
const DayObject = require('../models/dayObject')

db.on('error', console.error.bind(console, 'MongoDB connection error'))

const main = async () => {
    const dayObjects = [
       { 
            date: new Date("2023-10-03"),
            dayMood: 'sad',
            user: '652d563b750183a1591c276e'
        }
    ]
    await DayObject.insertMany(dayObjects)
    console.log('Created Days')
}

const run = async () => {
    await main()
    db.close()
}

run()