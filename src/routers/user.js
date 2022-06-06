const express = require("express");
const { User } = require("../models/model");
const router = express.Router();

// Post method
router.post("/post", async (req, res) => {
    const data = new User({
        address: req.body.address,
        isMinted: "true",
        matchInDay: 0,
    });
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Get all method
router.get("/get", async (req, res) => {
    try {
        const data = await User.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get by address method
router.get("/check/:address", async (req, res) => {
    try {
        const data = await User.find({ address: req.params.address }).count();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get user data by address method
router.get("/get/:address", async (req, res) => {
    try {
        const data = await User.find({ address: req.params.address });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update by address method
router.patch("/update/:address", async (req, res) => {
    try {
        const query = { address: req.params.address };

        const data = await User.findOne(query);
        const update = { matchInDay: data.matchInDay + 1 };
        const options = { new: true };

        const result = await User.findOneAndUpdate(query, update, options);
        res.send(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
