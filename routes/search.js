// /search?q=book-name GET #anyone

const express = require('express')
const app = express.Router();
var bodyParser = require('body-parser');
var Book = require('../models/book');
app.use(bodyParser.json());

app.get('/:q', async (req, res) => {

    // Object of the user to sign up.
    search_object = req.params.q
    const found_by_name = await Book.find({'name': search_object})
    const found_by_author = await Book.find({'author': search_object})
    const found_by_category = await Book.find({'category': search_object})
    if (found_by_name) {
        obj_name = {
            message: 'found by name',
            data: found_by_name
        }
        res.send(obj_name) 
    } else if (found_by_author) {
        obj_author = {
            message: 'found by author',
            data: found_by_author
        }
        res.send(obj_author)

    } else if (found_by_category) {
        obj_category = {
            message: 'found by category',
            data: found_by_category
        }
        res.send(obj_category)
    }
})

module.exports = app