const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const DayObject = new Schema(
    {
        date: {type: Date, required: true},
        dayMood: {type: String},
        user: {type: Schema.Types.ObjectId, ref: 'users'}
    },
    { timestamps: true }
)

module.exports = mongoose.model('dayOjects', DayObject)