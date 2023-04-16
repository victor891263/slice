const mongoose = require('mongoose');
const shortId = require('shortid');

const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
    createdOn: {
        type: String,
        required: true,
        default: new Date().toString()
    }
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);