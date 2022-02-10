"use strict";
const mongoose = require("mongoose");
const faq = mongoose.Schema({
    question: { type: String, required: true, trim: true, },
    answer: { type: String, required: true, trim: true, },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
});
mongoose.model("faq", faq);
module.exports = faq;