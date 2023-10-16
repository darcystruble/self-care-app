const db = require('../db')
const Gratitude = require('../models/gratitude')

db.on('error', console.error.bind(console, 'MongoDB connection error'))

const main = async () => {
    const gratitudes = [
        {
            date: new Date("2023-10-03"),
            entry: 'I am thankful for the beautiful weather. Sometimes, there is joy in the little things even on sad days.',
            userId: '652d563b750183a1591c276e'
        },
        {
            date: new Date("2023-10-04"),
            entry: 'I am thankful for my family. They bring me lots of joy.',
            userId: '652d563b750183a1591c276e'
        },
    ]
    await Gratitude.insertMany(gratitudes)
    console.log('Created Gratitude')
}

const run = async () => {
    await main()
    db.close()
}

run()