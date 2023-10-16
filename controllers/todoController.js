const Todo = require('../models/todo')

const getAllTodo = async (req, res) => {
    try {
        const tasks = await Todo.find()
        res.json(tasks)
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

const getOneTodo = async (req, res) => {
    try {
        const id = req.params.id
        const todo = await Todo.findById(id)
        todo? res.json(todo) : res.status(404).send('Task does not exist')
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

const createTodo = async (req, res) => {
    try {
        const todo = await new Todo(req.body)
        await todo.save()
        return res.status(201).json({
            todo
        })
    } catch (e) {
        return res.status(500).json({error: e.message})
    }
}

const updateTodo = async (req, res) => {
    try {
        let id = req.params.id
        let todo = await Todo.findByIdAndUpdate(id, req.body, {new: true})
        if (todo) {
            return res.status(200).json(todo)
        }
        throw new Error('Entry not found')
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

const deleteTodo = async (req, res) => {
    try {
        const id = req.params.id
        const deleted = await Todo.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send('Task deleted')
        }
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

module.exports = {
    getAllTodo,
    getOneTodo,
    createTodo,
    updateTodo,
    deleteTodo
}