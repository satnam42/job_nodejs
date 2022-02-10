const encrypt = require("../permit/crypto.js");
const auth = require("../permit/auth");
const imageUrl = require('config').get('image').url
var nodemailer = require('nodemailer')
const crypto = require("crypto");
const url = require('config').get('image').url
const service = require('../services/push-Notification')
var otpGenerator = require('otp-generator')
const ObjectId = require("mongodb").ObjectID;


const setBlog = (model, blog, context) => {
    const log = context.logger.start("services:blogs:set");
    if (model.title !== "string" && model.title !== undefined) {
        blog.title = model.title;
    }

    if (model.content !== "string" && model.content !== undefined) {
        blog.content = model.content;
    }

    if (model.category !== "string" && model.category !== undefined) {
        blog.category = model.category;
    }

    if (model.isPublished !== "string" && model.isPublished !== undefined) {
        blog.isPublished = model.isPublished;
    }

    log.end();
    blog.save();
    return blog;

};
//create blog

const buildblog = async (model, context) => {
    const { title, content, user, image } = model;
    const log = context.logger.start(`services:blogs:build${model}`);
    // const newotp = otpGenerator.generate(4, { digits:true, upperCase: false, specialChars: false });
    const blog = await new db.blog({
        user:user,
        title: title,
        content: content,
        // image: image,
        createdOn: new Date(),
        updateOn: new Date()
    }).save();
    log.end();
    return blog;
};

const create = async (model, context) => {
    const log = context.logger.start("services:blogs:create");
    const blog = buildblog(model, context);
    log.end();
    return blog;
};

const setAboutUs = async (model, context) => {
    const log = context.logger.start("services:blogs:setAboutUs");
    const aboutus = buildAboutUs(model, context);
    log.end();
    return aboutus;
};

// getBlogs
const getBlogs = async (query, context) => {
    const log = context.logger.start(`services:blogs:getBlogs`);
    let allBlogs = await db.blog.aggregate([
        {
          $lookup:
            {
              from: "images",
              localField: "_id",
              foreignField: "id",
              as: "blog_files"
            }
       }
     ])
    allBlogs.count = await db.blog.find().count();
    log.end();
    return allBlogs;
};

const publishedBlogs = async (query, context) => {
    const log = context.logger.start(`services:blogs:getBlogs`);
    let allBlogs = await db.blog.aggregate([
        {
            "$match": { "isPublished": "Yes" } 
        },
        {
          $lookup:
            {
              from: "images",
              localField: "_id",
              foreignField: "id",
              as: "blog_files"
            }
       }
     ])
    allBlogs.count = await db.blog.find().count();
    log.end();
    return allBlogs;
};

const getBlog = async (id, model, context) => {
    const log = context.logger.start(`services:blogs:getBlog`);
    let getBlog = await db.blog.aggregate([
        {
            "$match": { "_id": ObjectId(id) } 
        },
        // { $inc: { "blogs.views": 1 } },
        {
            "$lookup": { 
                from: "images",
                localField: "_id",
                foreignField: "id",
                as: "blog_files"
            } 
        }
    ])
    log.end();
    return getBlog;
};


const deleteBlog = async (id, context) => {
    const log = context.logger.start(`services:blogs:deleteBlog`);

    if (!id) {
        throw new Error("id is requried");
    }

    let blog = await db.blog.deleteOne({ _id: id });

    if (!blog) {
        throw new Error("blog not found");
    }

    return 'Blog Deleted Successfully'
};

const update = async (id, model, context) => {
    const log = context.logger.start(`services:blogs:update`);
    let entity = await db.blog.findById(id);
    if (!entity) {
        throw new Error("Blog not found");
    }
    const blog = await setBlog(model, entity, context);
    log.end();
    return blog
};

const search = async (name, context) => {
    const log = context.logger.start(`services:blogs:search`);
    if (!name) {
        throw new Error("name is required");
    }
    const users = await db.user.find({ firstName: { "$regex": '.*' + name + '.*', "$options": 'i' } }
    ).limit(5);

    return users
};

const blogStatus = async (id, model, context) => {
    const log = context.logger.start(`services:blogs:update`);
    let entity = await db.blog.findById(id);
    if (!entity) {
        throw new Error("Blog not found");
    }
    const blog = await setBlog(model, entity, context);
    log.end();
    return blog
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
exports.search = search;
exports.getBlog = getBlog;
exports.getBlogs = getBlogs;
exports.deleteBlog = deleteBlog;
exports.update = update;
exports.blogStatus = blogStatus;
exports.setAboutUs = setAboutUs;
exports.publishedBlogs = publishedBlogs;