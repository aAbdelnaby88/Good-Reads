const express = require('express')
const mongoose = require('mongoose');
const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost:27017/good-reads', { useNewUrlParser: true, useUnifiedTopology: true, 'useFindAndModify': false }, (err) => {
    if (!err) console.log("Mongod Connected...")
});

app.listen(5000, (err) => {
    if (!err) console.log("welcome to good reads server")
    console.log(err)
})