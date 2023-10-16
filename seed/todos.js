const db = require('../db')
const Todo = require('../models/todo')

db.on('error', console.error.bind(console, 'MongoDB connection error'))

const main = async () => {
    const todos = [
       { 
            date: new Date("2023-10-03"),
            text: 'Go on a walk.',
            isComplete: false,
            userId: '652d563b750183a1591c276e'
        },
        { 
            date: new Date("2023-10-04"),
            text: 'Drink more water.',
            isComplete: false,
            userId: '652d563b750183a1591c276e'
        }
    ]
    await Todo.insertMany(todos)
    console.log('Created list items')
}

const run = async () => {
    await main()
    db.close()
}

run()