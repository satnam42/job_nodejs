const mongoose = require('mongoose');

const contact = new mongoose.Schema({
    name: { type: String,  default: "" },
    email: { type: String,  default: ""},
    department: { type: String ,default: ""},
    createdOn: { type: Date,  default: Date.now },
    updatedOn: { type: Date,  default: Date.now }
})
mongoose.model("contact", contact);
module.exports = contact;