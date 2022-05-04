"use strict"
const fs = require('fs');
const service = require("../services/apply");
 const response = require("../exchange/response");


 //create job api
const create = async (req, res) => {
    const log = req.context.logger.start(`api:Apply:create`);
    try {
        const Apply = await service.create(req.body, req.context);
        const message = "job apply Successfully";
        log.end();
        return response.success(res, message ,Apply);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


// get single jobs apply api
const getJobsApply = async (req, res) => {
    const log = req.context.logger.start(`api:Apply:getJobApply`);
    try {
        const getjobsApply = await service.getJobsApply(req.params.id, req.context);
        const message = "find single job apply";
        log.end();
        return response.success(res, message, getjobsApply);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


// 
const getAllJobsApply = async (req, res) => {
    const log = req.context.logger.start(`api:Apply:getAllJobApply`);
    try {
        const applyJobs = await service.getAllJobsApply(req.body, req.context);
        const message = "find all jobs apply";
        log.end();
        return response.success(res, message, applyJobs);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


const uploadDocs = async (req, res) => {
    const log = req.context.logger.start(`api:jobsApply:uploadDocs`);
    try {
        const Apply = await service.uploadDocs(req.params.id, req.files, req.context);
        const message = "files uploaded";
        log.end();
        return response.data(res, message, Apply);

    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};











exports.create = create;
exports.getJobsApply = getJobsApply;
exports.getAllJobsApply = getAllJobsApply;
exports.uploadDocs = uploadDocs;



