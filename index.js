const express = require('express')
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
const authRouter = require('./routes/auth')
const authMWare = require('./middlewares/authMWare')
const app = express()
const authorRouter = require('./routes/authors');

app.use(express.json())
app.use(bodyparser.json())
app.use(express.static('./public'))
app.use(express.urlencoded({ extended: true }))
app.use('/authors',authorRouter)
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/api/', authRouter)
app.use(authMWare)


mongoose.connect('mongodb://localhost:27017/good-reads', { 'useCreateIndex': true, useNewUrlParser: true, useUnifiedTopology: true, 'useFindAndModify': false }, (err) => {
    if (!err) console.log("Mongod Connected...")
});

app.listen(5000, (err) => {
    if (!err) return console.log("welcome to good reads server")
    console.log(err)
})

