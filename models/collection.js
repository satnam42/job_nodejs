"use strict";
const mongoose = require("mongoose");
const collection = mongoose.Schema({
    name: { type: String, required: true, trim: true, },
    // reference: { type: String, required: true, trim: true, },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
});
mongoose.model("collection", collection);
module.exports = collection;