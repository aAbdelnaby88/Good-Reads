const express = require('express')
const User = require('../models/user')
const Todo = require('../models/todo')
const authUser = require('../middlewares/authMWare')
const router = express.Router()

router.get('/', authUser, async(req, res) => {
    const u = User.findById(req.user.id)
    if (!u) return res.status(401).send({ message: "Login First" })
    try {
        const list = await Todo.find({}).populate('book')
        return res.json({
            message: "your todo list",
            data: list
        })
    } catch (error) {
        return res.status(403).send({ message: error })
    }
})

router.post('/:book', authUser, async(req, res) => {
    const u = User.findById(req.user.id)
    if (!u) return res.status(401).send({ message: "Login First" })
    try {
        const book = await Todo.create({ shelve: "read", user: req.user.id, book: req.params.book })
        return res.json({
            message: "book added successfully",
            data: book
        })
    } catch (error) {
        return res.status(403).send({ message: error })
    }
})

router.patch('/:book', authUser, async(req, res) => {
    const u = User.findById(req.user.id)
    if (!u) return res.status(401).send({ message: "Login First" })
    try {
        const book = await Todo.findOneAndUpdate({ book: req.params.book }, req.body, { new: true })
        return res.json({
            message: "shelve updated successfully",
            data: book
        })
    } catch (error) {
        return res.status(403).send({ message: error })
    }
})

module.exports = router