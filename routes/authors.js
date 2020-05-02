var express = require('express');
var router = express.Router();
var Author = require('../models/author');



router.get('/', async(req, res) => {
    try {
        let authors= await Author.find({}).populate('author');
        res.json({
            message: "Authors list",
            data : authors
        });
    } catch (err) {
        res.json({
            message: 'error',
            err: err
        });
    }
    });
    

router.post('/', async(req, res)=>{
    try {
     let author=await Author.create(req.body);
     res.json({
         message: "author added successfully",
         data : author
     });
    } catch (err) {
     res.json({
         message: 'error',
         err: err
     });
    }
 });

 router.get('/:id', async(req, res) => {
    try {
     let author= await Author.findOne({_id: req.params.id}).populate('author');
     res.json({
         message: "authors details",
         data : author
     });
    } catch (err) {
     res.json({
         message: 'error',
         err: err
     });
    }
 });


 router.patch('/:id',async (req, res)=>{
    try {
        let author=await Author.findByIdAndUpdate(req.params.id,{$set: req.body }, { new: true });
        res.json({
            message: "author updated successfully",
            data : author
        });
    } catch (err) {
        res.json({
            message: 'error',
            err: err
        });
    }
});







 module.exports = router;