const jwt = require('jsonwebtoken')
const express = require('express')
const dotenv = require('dotenv')
const upload = require('../middlewares/imageUpload')
const User = require('../models/user')
const router = express.Router();
dotenv.config()

const accessTokenSecret = 'youraccesstokensecret'


router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body
        const u = await User.findOne({ email: email, password: password }, {})
        console.log(u.image)
        if (u) {
            const accessToken = jwt.sign({ id: u.id, email: u.email, image: u.image }, accessTokenSecret, { expiresIn: '24hr' });
            return res.json({
                message: 'User Logged in Successfully',
                data: accessToken
            });
        }
    } catch (err) {
        return res.json({
            message: "User Not Found !!",
            err: err
        })
    }
});


router.post('/admin/login', (req, res) => {
    const { username, password } = req.body
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        const accessToken = jwt.sign({ username: username, isAdmin: true }, accessTokenSecret, { expiresIn: '24hr' });
        return res.json({
            message: 'Admin Logged in Successfully',
            data: accessToken
        });
    } else {
        return res.json({
            message: 'Username or Password not correct !!',
            err: err
        });
    }
});


router.post('/signup', (req, res) => {
    upload(req, res, async(err) => {
        try {
            if (err) {
                res.sendStatus(404)
                console.log("hello")
            } else {
                if (req.file == undefined) {
                    console.log("hi")
                    return res.sendStatus(400)
                } else {
                    const image = req.file.filename
                    console.log(image)
                    const { firstName, lastName, email, password } = req.body
                    console.log(req.body)
                    const user = new User({ firstName, lastName, email, password, image })
                    await user.save()
                    const accessToken = jwt.sign({ id: user.id, email: user.email, image: user.image }, accessTokenSecret, { expiresIn: '24hr' });
                    return res.json({
                        message: 'User Created Successfully',
                        data: accessToken
                    });
                }
            }
        } catch (err) {
            return res.json({
                message: 'Failed, try again !!',
                err: err
            });
        }
    })
})

module.exports = router;