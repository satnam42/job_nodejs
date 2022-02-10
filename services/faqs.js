const encrypt = require("../permit/crypto.js");
const auth = require("../permit/auth");
const imageUrl = require('config').get('image').url
var nodemailer = require('nodemailer')
const crypto = require("crypto");
const url = require('config').get('image').url
const service = require('../services/push-Notification')
const ObjectId = require("mongodb").ObjectID;


const setFaq = (model, faq, context) => {
    const log = context.logger.start("services:faqs:set");
    if (model.question !== "string" && model.question !== undefined) {
        faq.question = model.question;
    }

    if (model.answer !== "string" && model.answer !== undefined) {
        faq.answer = model.answer;
    }

    log.end();
    faq.save();
    return faq;

};
//create faq

const buildfaq = async (model, context) => {
    const { question, answer } = model;
    const log = context.logger.start(`services:faqs:build${model}`);
    // const newotp = otpGenerator.generate(4, { digits:true, upperCase: false, specialChars: false });
    const blog = await new db.faq({
        question:question,
        answer: answer,
        createdOn: new Date(),
        updateOn: new Date()
    }).save();
    log.end();
    return blog;
};

const create = async (model, context) => {
    const log = context.logger.start("services:faqs:create");
    const blog = buildfaq(model, context);
    log.end();
    return blog;

};

// getBlogs
const getFaqs = async (query, context) => {
    const log = context.logger.start(`services:faqs:getFaqs`);
    let allFaq = await db.faq.find();
    allFaq.count = await db.faq.find().count();
    log.end();
    return allFaq;
};

const getFaq = async (id, model, context) => {
    const log = context.logger.start(`services:faqs:getFaq`);
    let faq = await db.faq.findById(id);
    log.end();
    return faq;
};


const deleteFaq = async (id, context) => {
    const log = context.logger.start(`services:faqs:deleteFaq`);

    if (!id) {
        throw new Error("id is requried");
    }

    let blog = await db.faq.deleteOne({ _id: id });

    if (!blog) {
        throw new Error("faq not found");
    }

    return 'Faq Deleted Successfully'
};

const update = async (id, model, context) => {
    const log = context.logger.start(`services:blogs:update`);
    let entity = await db.faq.findById(id);
    if (!entity) {
        throw new Error("Faq not found");
    }
    const faq = await setFaq(model, entity, context);
    log.end();
    return faq
};

// const sendMail = async (email, message, subject) => {
//     var smtpTrans = nodemailer.createTransport({
//         service: 'Gmail',
//         auth: {
//             user: `emmieandrewwork@gmail.com`,
//             pass: `lhbxxjikhpslyxvu`
//         }
//     });
//     // email send to registered email
//     var mailOptions = {
//         from: 'Vezo360',
//         to: email,
//         subject: subject,
//         html: message
//     };

//     let mailSent = await smtpTrans.sendMail(mailOptions)
//     if (mailSent) {

//         console.log("Message sent: %s", mailSent.messageId);
//         console.log("Preview URL: %s", nodemailer.getTestMessageUrl(mailSent));
//         return true
//     } else {
//         throw new Error("Unable to send email try after sometime");
//     }
// }

exports.create = create;
exports.getFaq = getFaq;
exports.getFaqs = getFaqs;
exports.deleteFaq = deleteFaq;
exports.update = update;