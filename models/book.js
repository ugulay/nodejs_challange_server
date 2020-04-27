const mongoose = require("mongoose");
const moment = require("moment");
const functions = require("../utils/utils");

var Schema = mongoose.Schema;

require("dotenv").config();

let reFormat = (str) => {
    return str;
}

let reFormatRead = (str) => {
    return moment(str).unix();
}

const BookScheme = new Schema({

    code: {
        type: String,
        required: true,
        default: functions.newTicket()
    },

    hotel: {
        type: Schema.Types.ObjectId,
        ref: 'hotels'
    },

    date_start: {
        type: Date,
        required: true,
        set: reFormat,
        get: reFormatRead
    },

    date_end: {
        type: Date,
        required: true,
        set: reFormat,
        get: reFormatRead
    },

    status: {
        type: Boolean,
        default: false
    },

    room: {
        type: String,
        required: true
    },

    persons: {
        type: Number,
        required: true
    },

    contact: {
        type: Object,
        required: true
    }

}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const model = mongoose.model("books", BookScheme);

module.exports = model;