"use strict";
const fs = require("fs");
const service = require("../services/jobs");
const response = require("../exchange/response");

//create job api
const create = async (req, res) => {
  const log = req.context.logger.start(`api:jobs:create`);
  try {
    const job = await service.create(req.body, req.context);
    const message = "job Created Successfully";
    log.end();
    return response.success(res, message, job);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

// get single job api

const getJobs = async (req, res) => {
  const log = req.context.logger.start(`api:jobs:getJobs`);
  try {
    const job = await service.getJobs(req.params.id, req.context);
    const message = "jobs Detail";
    log.end();
    return response.success(res, message, job);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

// get all jobs api

const getAllJobs = async (req, res) => {
  const log = req.context.logger.start(`api:jobs:getAllJobs`);
  try {
    const allJob = await service.getAllJobs(req.body, req.context);
    const message = "all jobs find";
    log.end();
    return response.success(res, message, allJob);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

// recentPosts

const recentPosts = async (req, res) => {
  const log = req.context.logger.start("api:recent:posts");
  try {
    const recentPost = await service.recentPosts(req.params.id, req.context);
    log.end();
    return response.data(res, recentPost);
  } catch (err) {
    log.end();
    return response.failure(res, err.message);
  }
};

const uploadDocs = async (req, res) => {
  const log = req.context.logger.start(`api:jobs:uploadDocs`);
  try {
    const job = await service.uploadDocs(req.params.id, req.files, req.context);
    const message = "files uploaded";
    log.end();
    return response.data(res, message, job);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

// get popular jobs api

const getPopularJobs = async (req, res) => {
  const log = req.context.logger.start("api:popular:jobs");
  try {
    const popularJobs = await service.getPopularJobs(
      req.params.id,
      req.context
    );
    log.end();
    return response.data(res, popularJobs);
  } catch (err) {
    log.end();
    return response.failure(res, err.message);
  }
};

//update jobs
const update = async (req, res) => {
  const log = req.context.logger.start(`api:jobs:update`);
  try {
    const job = await service.update(req.params.id, req.body, req.context);
    log.end();
    return response.data(res, job);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

//deleteUser
const deleteJobs = async (req, res) => {
  const log = req.context.logger.start(`api:jobs:deleteJobs`);
  try {
    const job = await service.deleteJobs(req.params.id, req.context);
    log.end();
    return response.data(res, job);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

const jobsFilter = async (req, res) => {
  const log = req.context.logger.start(`api:jobs:Filter`);
  try {
    const jobFilter = await service.jobsFilter(req.query, req.context);
    const message = "fetch filter data";
    log.end();
    return response.success(res, message, jobFilter);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

const search = async (req, res) => {
  const log = req.context.logger.start(`api:jobs:search:${req.query.title}`);
  try {
    const jobs = await service.search(req.query.title, req.context);
    log.end();
    return response.data(res, jobs);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

const getAllLocation = async (req, res) => {
  const log = req.context.logger.start(`api:jobs:getAllLocation`);
  try {
    const allLoc = await service.getAllLocation(req.body, req.context);
    const message = "all location find";
    log.end();
    return response.success(res, message, allLoc);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};
const getJobsByuserId = async (req, res) => {
  const log = req.context.logger.start(`api:jobs:getJobsByuserId`);
  try {
    const job = await service.getJobsByuserId(req.params.id, req.context);
    const message = "jobs By User ";
    log.end();
    return response.success(res, message, job);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

exports.create = create;
exports.getJobs = getJobs;
exports.getAllJobs = getAllJobs;
exports.recentPosts = recentPosts;
exports.uploadDocs = uploadDocs;
exports.getPopularJobs = getPopularJobs;
exports.update = update;
exports.deleteJobs = deleteJobs;
exports.jobsFilter = jobsFilter;
exports.getAllLocation = getAllLocation;
exports.search = search;
exports.getJobsByuserId = getJobsByuserId;
