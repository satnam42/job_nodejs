"use strict";
const service = require("../services/collections");
const response = require("../exchange/response");

// create cols
const create = async (req, res) => {
    const log = req.context.logger.start(`api:collections:create`);
    try {
        const col = await service.create(req.body, req.context);
        const message = "Collection Created Successfully";
        log.end();
        return response.success(res, message, col);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

//getUsers
const getCollections = async (req, res) => {  
    const log = req.context.logger.start(`api:collections:getCollections`);
    try {
        const cols = await service.getCollections(req.body, req.context);
        const message = "Collections Fetched Successfully";
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
    const log = req.context.logger.start(`api:collections:update`);
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

//delete 
const deleteCollection = async (req, res) => {
    const log = req.context.logger.start(`api:collections:deleteCollection`);
    try {
        const blog = await service.deleteCollection(req.params.id, req.context);
        log.end();
        return response.data(res, blog);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};



exports.create = create;
exports.getCollections = getCollections;
exports.update = update;
exports.deleteCollection = deleteCollection;