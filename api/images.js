"use strict";
const service = require("../services/images");
const response = require("../exchange/response");

const uploadSingle = async (req, res) => {
    const log = req.context.logger.start(`api:images:uploadSingle`);
    try {
        const url = await service.uploadSingle(req.files, req.body, req.context);
        log.end();
        return response.data(res, url);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


const uploadMultiple = async (req, res) => {
    const log = req.context.logger.start(`api:images:uploadMultiple`);
    try {
        const url = await service.uploadMultiple(req.files, req.body, req.context);
        log.end();
        return response.data(res, url);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const remove = async (req, res) => {
    const log = req.context.logger.start(`api:images:remove`);
    try {
        const data = await service.remove(req.query, req.context);
        log.end();
        return response.data(res, data);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const getFile = async (req, res) => {
    const log = req.context.logger.start(`api:images:getFile`);
    try {
        const user = await service.getFile(req.params.id, req.body, req.context);
        const message = "Current File";
        log.end();
        return response.success(res, message,user);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


exports.uploadSingle = uploadSingle;
exports.uploadMultiple = uploadMultiple;
exports.remove = remove;
exports.getFile = getFile;

