"use strict";
const mongoose = require('mongoose');

const job = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    title: { type: String, required: true, trim: true, default: "", },
    category: { type: String, required: true, default: "", },
    // location : { type: "Point", coordinates: [longitude, latitude] },
    location: {
        type: String, required: true, default: "",
    },

    priceFrom:{ type: Number, required: true, default: 0, },
    priceTo:{ type: Number, required: true, default: 0, },
    // price: {
    //     from: { type: Number, required: true, default: 0, },
    //     to: { type: Number, required: true, default: 0, },
    // },
    workers: { type: Number, required: true, default: 0, },
    jobType: { type: String, required: true, default: "", },
    firstName: { type: String, required: true, default: "", },
    lastName: { type: String, required: false, trim: true, default: "" },
    email: { type: String, required: true, default: "", },
    country: { type: String, required: true, default: "" },
    scopeOfWork: { type: String, required: false, trim: true, default: "" },
    planOfAction: { type: String, required: false, trim: true, default: "" },
    constructionDocumentation: { type: String, required: false, default: "" },

    company: {
        emailId: { type: String, required: true, trim: true, default: "" },
        phoneNumber: { type: String, required: true, trim: true, default: "" },
        address: { type: String, required: false, trim: true, default: "" },
    },

    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
})

mongoose.model('job', job);
module.exports = job;