const mongoose = require("mongoose");

const AdvertisementSchema = new mongoose.Schema({
    addTitle: {
        type: String,
        required: true
    },
    image: {
        type: String,
        // required: true
    },
    link:{
        type: String,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('advertisements', AdvertisementSchema);