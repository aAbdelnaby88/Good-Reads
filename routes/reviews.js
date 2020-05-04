// /categories/:id?page=1 GET  #anoyone
// CRUD operations..
// rate and review .. POST to add (userid, bookid, comment);
// get(by book id) .. will take a book id and return reviews or rates.

const express = require('express')
const app = express.Router();
var Review = require('../models/review');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Get all reviews
app.get('/', async (req, res) => {

    try {
        let review = await Review.find({});
        res.json({
            message: "Category list",
            data: review
        });
    } catch (err) {
        res.json({
            message: 'error',
            err: err,
        });
    }
})

// get a review with a given book id.
app.get('/:book', async (req, res) => {

    book = req.params.book
    try {
        let review = await Review.find({'book': book});
        res.json({
            message: "reviews list",
            data: review
        });
    } catch (err) {
        res.json({
            message: 'error',
            err: err,
        });
    }
})

// Add a new review
app.post('/new', async (req, res) => {
    try {
        let review = await Review.create(req.body);
        res.json({
            message: "review added successfully",
            data: review
        });
    } catch (err) {
        res.json({
            message: 'error',
            err: err
        });
    }
});

// Update a review with a given id
app.patch('/edit/:id', async (req, res) => {
    try {
        let review = await Review.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json({
            message: "review updated successfully",
            data: review
        });
    } catch (err) {
        res.json({
            message: 'error',
            err: err
        });
    }
});

// delete a review with a given id.
app.delete('/delete/:id', async (req, res) => {
    try {
        let review = await Review.findByIdAndDelete(req.params.id);
        res.json({
            message: "review deleted successfully"
        });
    } catch (err) {
        res.json({
            message: 'error',
            err: err
        });
    }
});


module.exports = app