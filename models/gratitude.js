const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const Gratitude = new Schema(
    {
        date: {type: Date, required: true},
        entry: {type: String, required: true},
        userId: {type: Schema.Types.ObjectId, required: true}
    },
    { timestamps: true }
)

module.exports = mongoose.model('gratitudes', Gratitude)