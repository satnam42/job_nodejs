"use strict"
const mongoose = require('mongoose');
const jobApply = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'job' },
    firstName: { type: String, required: true, default: "", },
    lastName: { type: String, required: false, default: "", },
    email: { type: String, required: true, default: "", },
    country: { type: String, required: true, default: "", },
    describe: { type: String, required: false, trim: true, default: "", },
    resume: { type: String, required: false, default: "", },
    status: {
        type: String,
        default:"Yes",
        enum: ["Yes", "No"]
    },

    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
})
mongoose.model('jobApply', jobApply);
module.exports = jobApply;