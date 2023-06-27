const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    emailVerificationToken: {
        type: String,
        default: "",
    },
    verified: {
        type: Boolean,
        default: false
    },
    phonenumber: {
        type: String,
        default:""
    },
    birthday: {
        type: Date,
        default: null
    },
    street: {
        type: String,
        default:""
    },
    city: {
        type: String,
        default:""
    },
    province: {
        type: String,
        default:""
    },
    isPremiumMember:{
        type:Boolean,
        default:false,
    },
    userRole:{
        type: String,
    }

}, { timestamps: true });

module.exports = mongoose.model('Users', UserSchema);