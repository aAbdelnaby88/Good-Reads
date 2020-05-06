// /categories/:id?page=1 GET  #anoyone
// CRUD operations..
// rate and review .. POST to add (userid, bookid, comment);
// get(by book id) .. will take a book id and return reviews or rates.

const express = require('express')
const app = express.Router();
var Review = require('../models/review');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
const authUser = require('../middlewares/authMWare')
var User = require('../models/user');

// Get all reviews
app.get('/', async(req, res) => {

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
app.get('/:book', async(req, res) => {

    book = req.params.book
    try {
        let review = await Review.find({ 'book': book }).populate('user').populate('book');
        res.json({
            message: "reviews list",
            data: review
        });
    } catch (err) {
        return res.status(403).send({ message: "something went wrong !!" })
    }
})

// Add a new review
app.post('/:book', authUser, async(req, res) => {
    const u = User.findById(req.user.id)
    if (!u) {
        return res.status(401).send({ message: "login first" })
    }
    console.log(req.params.book, req.user.id, req.body)
    try {
        const review = Review.create({ content: req.body.content, user: req.user.id, book: req.params.book });
        res.json({
            message: "review added successfully",
            data: review
        });
    } catch (err) {
        return res.status(403).send({ message: "something went wrong !!" })
    }
});

// Update a review with a given id
app.patch('/:id', async(req, res) => {
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
app.delete('/:id', async(req, res) => {
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