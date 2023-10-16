const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const User = new Schema(
    {
        username: {type: String, required: true, trim: true, unique: true},
        firstName: {type: String, required: true},
    },
    { timestamps: true}
)

module.exports = mongoose.model('users', User)