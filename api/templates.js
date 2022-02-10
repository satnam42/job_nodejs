"use strict";
const service = require("../services/templates");
const response = require("../exchange/response");

// create template
const create = async (req, res) => {
    const log = req.context.logger.start(`api:templates:create`);
    try {
        const col = await service.create(req.body, req.context);
        const message = "Template Generated Successfully";
        log.end();
        return response.success(res, message, col);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

//getUsers
const getList = async (req, res) => {
    const log = req.context.logger.start(`api:templates:getCollections`);
    try {
        const cols = await service.getList(req.body, req.context);
        const message = "Templates Fetched Successfully";
        log.end();
        return response.success(res, message, cols);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

//update cols
const update = async (req, res) => {
    const log = req.context.logger.start(`api:templates:update`);
    try {
        const cols = await service.update(req.params.id, req.body, req.context);
        log.end();
        return response.data(res, cols);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

//delete template
const deleteTemplate = async (req, res) => {
    const log = req.context.logger.start(`api:templates:deleteTemplate:${req.params.id}`);
    try {
        const template = await service.deleteTemplate(req.params.id, req.context);
        log.end();
        return response.data(res, template);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.create = create;
exports.getList = getList;
exports.update = update;
exports.deleteTemplate = deleteTemplate;