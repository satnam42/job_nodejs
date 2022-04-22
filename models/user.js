"use strict";
const mongoose = require("mongoose");
const user = mongoose.Schema({
    userName: { type: String, required: true, default: "", },
    email: { type: String, required: true, trim: true, default: "" },
    companyName: { type: String, required: false, default: "" },
    password : {type:String, required:false, trim:true, default:""},
    phoneNumber: { type: String, required: false, trim: true, default: "" },
    // role: { type: mongoose.Schema.Types.ObjectId, ref: 'role' },
    image: { type: String, default: "" },
    roleType: {
        type: String, trim: true,required:false ,
        default:"employee",
        enum: {
            values: ["employer", "employee"],
            message: "You filled wrong role."
        },
   socialLinkId: { type: String, default: "", required: false },
   platform: { type: String, default: "", required: false },
   token: { type: String, default: "" },
//    deviceToken: { type: String, default: "" },

    },

});
// user.index({ "loc": "2dsphere" });
mongoose.model("user", user);
module.exports = user;