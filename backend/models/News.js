const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
    news: {
        type: String,
        required: true
    },
    link: {
        type: String,
        
    }

}, { timestamps: true });

module.exports = mongoose.model('news', NewsSchema);