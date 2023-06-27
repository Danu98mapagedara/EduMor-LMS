const mongoose = require("mongoose");

const SuperAdminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('SuperAdmin', SuperAdminSchema);