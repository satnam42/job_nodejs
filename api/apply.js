"use strict";
const fs = require("fs");
const service = require("../services/apply");
const response = require("../exchange/response");
const mapper = require("../mappers/apply");

//create job api
const create = async (req, res) => {
  const log = req.context.logger.start(`api:Apply:create`);
  try {
    const Apply = await service.create(req.body, req.context);
    const message = "job apply Successfully";
    log.end();
    return response.success(res, message, Apply);
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
    return response.success(res, message, mapper.toSearchModel(applyJobs));
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};
const listByUserId = async (req, res) => {
  const log = req.context.logger.start(`api:Apply:listByUserId`);
  try {
    const applyJobs = await service.listByUserId(req.params.id, req.context);
    const message = "find all jobs apply";
    log.end();
    return response.success(res, message, mapper.toSearchModel(applyJobs));
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

const listByJobId = async (req, res) => {
  const log = req.context.logger.start(`api:Apply:listByUserId`);
  try {
    const applyUsers = await service.listByJobId(req.params.id, req.context);
    const message = "find all jobs apply";
    log.end();
    return response.success(res, message, mapper.toSearchModel(applyUsers));
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

const listByapplyJobIdAnduserId = async (req, res) => {
  const log = req.context.logger.start(`api:Apply:listByapplyJobIdAnduserId`);
  try {
    const applyUsers = await service.listByapplyJobIdAnduserId(
      req.params.applyId,
      req.params.userId,
      req.context
    );
    const message = "find all jobs apply";
    log.end();
    return response.success(res, message, applyUsers);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};
const uploadDocs = async (req, res) => {
  const log = req.context.logger.start(`api:jobsApply:uploadDocs`);
  try {
    const Apply = await service.uploadDocs(
      req.params.id,
      req.files,
      req.context
    );
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
exports.getAllJobsApply = getAllJobsApply;
exports.uploadDocs = uploadDocs;
exports.listByUserId = listByUserId;
exports.listByJobId = listByJobId;
exports.listByapplyJobIdAnduserId = listByapplyJobIdAnduserId;
