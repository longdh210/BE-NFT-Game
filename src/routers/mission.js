const express = require('express');
const { Mission } = require('../models/model');
const router = express.Router();

// Get all method
router.get('/get', async(req, res) => {
    try {
        const data = await Mission.find();
        res.json(data);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;