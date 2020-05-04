// /categories/:id?page=1 GET  #anoyone
// CRUD operations..
// rate and review .. POST to add (userid, bookid, comment);
// get(by book id) .. will take a book id and return reviews or rates.

const express = require('express')
const app = express.Router();
var Category = require('../models/category');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Get all categories
app.get('/', async (req, res) => {

    try {
        let category = await Category.find({});
        res.json({
            message: "Category list",
            data: category
        });
    } catch (err) {
        res.json({
            message: 'error',
            err: err,
        });
    }
})

// get a category with an id
app.get('/:id', async (req, res) => {

    categoryId = req.params.id
    try {
        let category = await Category.findById(categoryId);
        res.json({
            message: "Category list",
            data: category
        });
    } catch (err) {
        res.json({
            message: 'error',
            err: err,
            id: categoryId
        });
    }
})

// Add a new category
app.post('/new', async (req, res) => {
    try {

        let category = await Category.create(req.params.body);
        res.json({
            message: "Category added successfully",
            data: category
        });
    } catch (err) {
        res.json({
            message: 'error',
            err: err
        });
    }
});

// Update a categoty with a given id
app.patch('/edit/:id', async (req, res) => {
    try {
        let category = await Category.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json({
            message: "category updated successfully",
            data: category
        });
    } catch (err) {
        res.json({
            message: 'error',
            err: err
        });
    }
});

// delete a category with a given id.
app.delete('/delete/:id', async (req, res) => {
    try {
        let category = await Category.findByIdAndDelete(req.params.id);
        res.json({
            message: "category deleted successfully"
        });
    } catch (err) {
        res.json({
            message: 'error',
            err: err
        });
    }
});


module.exports = app