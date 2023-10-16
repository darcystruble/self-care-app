const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const Todo = new Schema(
    {
     text: {type: String, required: true},
     isComplete: {type: Boolean, default: false, required: true},
     userId: {type: Schema.Types.ObjectId, ref: 'user'}
    },
    { timestamps: true }
)

module.exports = mongoose.model('todos', Todo)