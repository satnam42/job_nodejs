"use strict"
const ObjectId = require("mongodb").ObjectID;
const fs = require("fs");


const buildJobApply = async (model, context) => {
    const { firstName, lastName, email, status, country, describe, resume, jobId, userId } = model;
    const log = context.logger.start(`services:jobsApply:build${model}`);
    const jobApply = await new db.jobApply({
        user: userId,
        job: jobId,
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
    return jobApply;
};

const create = async (model, context) => {
    const log = context.logger.start("services:jobsApply:create");
    const jobApply = await buildJobApply(model, context);
    log.end();
    return jobApply;

};


const getAllJobsApply = async (query, context) => {
    const log = context.logger.start(`services:jobsApply:getAllJobApply`);
    let applyJobs = await db.jobApply.find().populate("user").populate("job");
    log.end();
    return applyJobs;
};





exports.create = create;
exports.getAllJobsApply = getAllJobsApply;
