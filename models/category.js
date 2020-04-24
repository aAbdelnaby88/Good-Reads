const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema({
    name: { type: String, required: [true, "can't be blank"], max: 20, unique: [true, 'Name must be unique'] }
})

const categoryModel = mongoose.model('Category', categorySchema)

module.exports = categoryModel