"use strict"
const ObjectId = require("mongodb").ObjectID;
const fs = require("fs");
const pdfUrl = require('config').get('pdf').url


const buildJobApply = async (model, context) => {
    const { firstName, lastName, email, status, country, describe, resume, jobId, userId, postedBy } = model;
    const log = context.logger.start(`services:Apply:build${model}`);
    const Apply = await new db.Apply({
        user: userId,
        job: jobId,
        postedBy: postedBy,
        firstName: firstName,
        lastName: lastName,
        email: email,
        country: country,
        describe: describe,
        resume: resume,
        status: status,
        createdOn: new Date(),
        updateOn: new Date()
    }).save();
    log.end();
    return Apply;
};

const create = async (model, context) => {
    const log = context.logger.start("services:Apply:create");

    let job = await db.job.findById(model.jobId);
    console.log(job);
    if (!job) throw new Error("job not found");

    let entity = await db.user.findById(model.userId);
    if (!entity) throw new Error("user not found")
    console.log(entity)

     model.postedBy = job.user

    let createdBy = await db.user.findById(model.postedBy);
    console.log(createdBy)
    if (!createdBy) throw new Error("employer not found")




    const Apply = await buildJobApply(model, context);
    log.end();
    return Apply;

};














// get single jobs apply
const getJobsApply = async (user, context) => {
    const log = context.logger.start(`services:Apply:getJobsApply`);
     let Apply = await db.Apply.find({user : user}).populate("job")
    log.end();
    return Apply;
};




const getAllJobsApply = async (query, context) => {
    const log = context.logger.start(`services:Apply:getAllJobApply`);
    let applyJobs = await db.Apply.find().populate("user").populate("job");
    log.end();
    return applyJobs;
};


const uploadDocs = async (id, files, context) => {
    // console.log(files[0]);
    const log = context.logger.start(`services:jobsApply:uploadDocs`);
    if (!files.length < 0) {
        throw new Error("files not found");
    }
    let Apply = await db.Apply.findById(id);
    if (!Apply) {
        throw new Error("Apply jobs not found");
    }
    if (Apply.resume != "" && Apply.resume !== undefined) {

        let picUrl = Apply.resume.replace(`${pdfUrl}`, '');
        try {
            await fs.unlinkSync(`${picUrl}`)
            console.log('File unlinked!');
        } catch (err) {
            console.log(err)
        }
    }
    const pdf = files[0].filename
    Apply.resume = pdf;
    await Apply.save();
    log.end();
    if (files[0].mimetype == "application/pdf") {
        Apply.resume = pdfUrl + '/' + Apply.resume;
    }
    // else {
    //     job.constructionDocumentation = imageUrl + '/' + job.constructionDocumentation;
    // }
    return Apply;
};









exports.create = create;
exports.getJobsApply = getJobsApply;
exports.getAllJobsApply = getAllJobsApply;
exports.uploadDocs = uploadDocs;

