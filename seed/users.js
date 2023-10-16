const db = require('../db')
const User = require('../models/user')

db.on('error', console.error.bind(console, 'MongoDB connection error'))

const main = async () => {
    const users = [
        {username: 'testerUser', firstName: 'Test'},
        {username: 'trialUser', firstName: 'Trial'}
    ]
    await User.insertMany(users)
    console.log('Created Users')
}

const run = async () => {
    await main()
    db.close()
}

run()