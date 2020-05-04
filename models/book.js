const mongoose = require('mongoose')


const bookSchema = new mongoose.Schema({
    name: { type: String, required: [true, "can't be blank"], unique: [true, 'Name must be unique'] },
    image: { type: String, required: [true, "can't be blank"] },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    rates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'review' }],
})

const bookModel = mongoose.model('Book', bookSchema)

module.exports = bookModel