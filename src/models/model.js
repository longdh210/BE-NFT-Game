const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    address: { required: true, type: String },
    isMinted: { required: true, type: Boolean }
})

module.exports = mongoose.model('Data', dataSchema);