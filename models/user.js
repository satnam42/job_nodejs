"use strict";
const mongoose = require("mongoose");
const user = mongoose.Schema({
    socialLinkId: { type: String, required: false, default: "" },
    platform: { type: String, required: false, default: "" },
    firstName: { type: String, required: true, default: "", },
    lastName: { type: String, required: false, default: "" },
    // prefix: { type: String, required: false },
    email: { type: String, required: true, trim: true, default: "" },
    phoneNumber: { type: String, required: false, trim: true, default: "" },
    password: { type: String, required: false, default: "" },
    dob: { type: String, required: false, trim: true, default: "" },
    gender: { type: String, required: false, default: "" },
    otp: { type: Number, required: false, trim: true, default: "" },
    notes: { type: String, required: false, trim: true, default: "" },
    incomeRange: { type: String, required: false, trim: true, default: "" },
    address: { type: String, required: false, trim: true, default: "" },
    streetNo: { type: String, required: false, trim: true, default: "" },
    streetName: { type: String, required: false, trim: true, default: "" },
    state: { type: String, required: false, trim: true, default: "" },
    city: { type: String, required: false, trim: true, default: "" },
    country: { type: String, required: false, trim: true, default: "" },
    zipCode: { type: String, required: false, trim: true, default: "" },
    token: { type: String, default: "" }, //access token
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive"]
    },
    image: { type: String, default: "" },
    /* correct method for saving coordinates in mongodb */
    // loc: {
    //     type: { type: String, default: "" },
    //     coordinates: [Number]
    // },
    socialLinkId: { type: String, default: "", required: false },
    platform: { type: String, default: "", required: false },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'role' },
    roleType: {
        type: String, trim: true,required:false,
        enum: {
            values: ["admin", "superAdmin", "client","accountant"],
            message: "You filled wrong role."
        }
    },
    deviceToken: { type: String, default: "" },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    },
    isSuperAdmin: {
        type: Boolean, default: false,
    },
    privileges: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'privilege',
    },

    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: "" },
    deletedAt: { type: Date, default: "" },
});
user.index({ "loc": "2dsphere" });
mongoose.model("user", user);
module.exports = user;