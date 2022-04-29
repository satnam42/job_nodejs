"use strict"
const mongoose = require('mongoose');
const jobApply = mongoose.Schema({
    firstName: { type: String, required: true, default: "", },
    lastName: { type: String, required: false, default: "", },
    email: { type: String, required: true, default: "", },
    country: { type: String, required: true, default: "", },
    describe: { type: String, required: false, trim: true, default: "", },
    resume: { type: String, required: false, default: "", },


    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
})
mongoose.model('jobApply', jobApply);
module.exports = jobApply;