"use strict";
const filePath = require("config").get("pdf").url

exports.toModel = entity => {
    const model = {
        firstName: entity.firstName,
        lastName: entity.lastName,
        email: entity.email,
        country: entity.country,
        describe: entity.describe,
        resume: entity.resume ? `${filePath}${entity.resume}` : "",
        status: entity.status,
        applyBy: entity.user,
        job: entity.job,
        postedBy: entity.postedBy,
        createdOn: entity.createdOn,
    };
    return model;
};


exports.toSearchModel = entities => {
    return entities.map(entity => {
        return exports.toModel(entity);
    });
    1
};