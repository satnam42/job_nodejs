"use strict"
const fs = require('fs');
const service = require("../services/jobapply");
 const response = require("../exchange/response");


 //create job api
const create = async (req, res) => {
    const log = req.context.logger.start(`api:jobApply:create`);
    try {
        const jobApply = await service.create(req.body, req.context);
        const message = "job apply Successfully";
        log.end();
        return response.success(res, message ,jobApply);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};



const getAllJobsApply = async (req, res) => {
    const log = req.context.logger.start(`api:jobsApply:getAllJobApply`);
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












exports.create = create;
exports.getAllJobsApply = getAllJobsApply;

