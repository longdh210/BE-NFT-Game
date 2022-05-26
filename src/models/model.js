const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    address: { required: true, type: String },
    isMinted: { required: true, type: Boolean },
    matchInDay: { required: true, type: Number },
})

const missionSchema = new mongoose.Schema({
    missionName: { required: true, type: String },
    numMatches: { required: true, type: Number },
    reward: { required: true, type: Number },
})

const User = mongoose.model('Data', userSchema);
const Mission = mongoose.model('Mission', missionSchema);

module.exports = { User, Mission };