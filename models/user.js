const mongoose = require("mongoose");
const functions = require("../utils/utils");

require("dotenv").config();

const UserScheme = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        trim: true,
        set: functions.setPassword
    },

    status: {
        type: Number,
        default: false
    },

    role: {
        type: String,
        default: 'user'
    }

}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const model = mongoose.model("users", UserScheme);

module.exports = model;