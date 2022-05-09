const express = require('express');
const Model = require('../models/model');
const router = express.Router();

// Post method 
router.post('/post', async (req, res) => {
    const data = new Model({
        address: req.body.address,
        isMinted: "true",
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

// Get all method 
router.get('/check/:address', async (req, res) => {
    try {
        const data = await Model.find({ "address" : req.params.address}).count();      
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;