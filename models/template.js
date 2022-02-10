"use strict";
const mongoose = require("mongoose");
const template = mongoose.Schema({
    content: { type: String, required: true, trim: true, },
    imageurl: { type: String, trim: true, },
    audiourl: { type: String, trim: true, },
    videourl: { type: String, trim: true, },
    documenturl: { type: String, trim: true, },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
});
mongoose.model("template", template);
module.exports = template;