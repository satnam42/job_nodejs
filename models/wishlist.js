"use strict"
const mongoose = require('mongoose');
const wishlist = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'job'
    },
    status: {
        type: Boolean,
        default:"",
        enum: [true, false]
    }


})
mongoose.model('wishlist', wishlist);
module.exports = wishlist;