"use strict";
const mongoose = require("mongoose");
const about = mongoose.Schema({
    about: { type: String, required: true, trim: true, },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
});
mongoose.model("about", about);
module.exports = about;