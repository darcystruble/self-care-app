const Gratitude = require('../models/gratitude')

const getAllGrats = async (req, res) => {
    try {
        const gratitudes = await Gratitude.find()
        res.json(gratitudes)
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

const getOneGrat = async (req, res) => {
    try {
        const id = req.params.id
        const gratitude = await Gratitude.findById(id)
        gratitude? res.json(gratitude) : res.status(404).send('Entry does not exist')
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

const createGrat = async (req, res) => {
    try {
        const gratitude = await new Gratitude(req.body)
        await gratitude.save()
        return res.status(201).json({
            gratitude
        })
    } catch (e) {
        return res.status(500).json({error: e.message})
    }
}

const updateGrat = async (req, res) => {
    try {
        let id = req.params.id
        let gratitude = await Gratitude.findByIdAndUpdate(id, req.body, {new: true})
        if (gratitude) {
            return res.status(200).json(gratitude)
        }
        throw new Error('Entry not found')
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

const deleteGrat = async (req, res) => {
    try {
        const id = req.params.id
        const deleted = await Gratitude.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send('Entry deleted')
        }
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

module.exports = {
    getAllGrats,
    getOneGrat,
    createGrat,
    updateGrat,
    deleteGrat
}