"use strict";
const mongoose = require("mongoose");
const blog = mongoose.Schema({
    title: { type: String, required: true, trim: true, },
    content: { type: String, required: true, trim: true, },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        refPath: 'user'
    },
    isVerified: {
        type: String, default: "No",
        enum: ["Yes", "No"]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        refPath: 'category'
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'image',
    },
    views: { type: Number, default: 0 },
    isPublished: {
        type: String, default: "No",
        enum: ["Yes", "No"]
    },
    /* correct method for saving coordinates in mongodb */
    // loc: {
    //     type: { type: String, default: "Point" , required: true,},
    //     coordinates: [Number]
    // },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
});
// user.index({ "loc": "2dsphere" });
mongoose.model("blog", blog);
module.exports = blog;