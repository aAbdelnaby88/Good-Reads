const mongoose = require('mongoose')


const bookSchema = new mongoose.Schema({
    name: { type: String, required: [true, "can't be blank"], max: 40, unique: [true, 'Name must be unique'] },
    image: { type: String, required: [true, "can't be blank"] },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
})

const bookModel = mongoose.model('Book', bookSchema)

module.exports = bookModel