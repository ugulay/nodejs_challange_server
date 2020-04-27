const mongoose = require("mongoose");

var Schema = mongoose.Schema;

require("dotenv").config();

const HotelScheme = new Schema({

    title: {
        type: String,
        required: true,
        alias: 'name'
    },

    description: {
        type: String
    },

    location: {
        type: String,
        required: true
    },

    books: {
        type: Schema.Types.ObjectId,
        ref: 'books'
    }

}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

HotelScheme.statics.findByName = function(title) {
    return this.find({ title: new RegExp(title, 'i') });
};

const model = mongoose.model("hotels", HotelScheme);

module.exports = model;