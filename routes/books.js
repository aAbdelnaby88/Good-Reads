var express = require('express');
var router = express.Router();
var Book = require('../models/book');

router.get('/', async (req, res) => {
    try {
        const books = Book.find().populate('reviews')
        res.json({
            message: "All books",
            data: books
        });
    } catch (err) {
        res.json({
            message: 'error',
            err: err
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const book = Book.findById(req.params.id).populate('reviews')
        res.json({
            message: "show book details",
            data: book
        });
    } catch (err) {
        res.json({
            message: 'error',
            err: err
        });
    }
});

router.post('/new', async (req, res) => {
    try {
        let book = await Book.create(req.body);
        res.json({
            message: "book added successfully",
            data: book
        });
    } catch (err) {
        res.json({
            message: 'error',
            err: err
        });
    }
});

router.patch('/edit/:id', async (req, res) => {
    try {
        let book = await Book.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json({
            message: "book updated successfully",
            data: book
        });
    } catch (err) {
        res.json({
            message: 'error',
            err: err
        });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        let book = await Book.findByIdAndDelete(req.params.id);
        res.json({
            message: "book deleted successfully"
        });
    } catch (err) {
        res.json({
            message: 'error',
            err: err
        });
    }
});

module.exports = router