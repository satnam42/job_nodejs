"use strict"
const ObjectId = require("mongodb").ObjectID;
const fs = require("fs");


const buildJobApply = async (model, context) => {
    const { firstName, lastName, email, country, describe, resume } = model;
    const log = context.logger.start(`services:jobsApply:build${model}`);
    const jobApply = await new db.jobApply({
        firstName: firstName,
        lastName: lastName,
        email: email,
        country: country,
        describe: describe,
        resume: resume,
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






exports.create = create;