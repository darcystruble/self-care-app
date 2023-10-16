const DayObject = require('../models/dayObject')

const getAllDays = async (req, res) => {
    try {
        const days = await DayObject.find()
        res.json(days)
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

const getOneDay = async (req, res) => {
    try {
        const id = req.params.id
        const day = await DayObject.findById(id)
        day? res.json(day) : res.status(404).send('User does not exist')
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

const createDay = async (req, res) => {
    try {
        const day = await new DayObject(req.body)
        await day.save()
        return res.status(201).json({
            day
        })
    } catch (e) {
        return res.status(500).json({error: e.message})
    }
}

const updateDay = async (req, res) => {
    try {
        let id = req.params.id
        let day = await DayObject.findByIdAndUpdate(id, req.body, {new: true})
        if (day) {
            return res.status(200).json(day)
        }
        throw new Error('Day not found')
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

const deleteDay = async (req, res) => {
    try {
        const id = req.params.id
        const deleted = await DayObject.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send('Day deleted')
        }
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

module.exports = {
    getAllDays,
    getOneDay,
    createDay,
    updateDay,
    deleteDay
}