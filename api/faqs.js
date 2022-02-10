"use strict";
const service = require("../services/faqs");
const response = require("../exchange/response");

// create faqs
const create = async (req, res) => {
    const log = req.context.logger.start(`api:faqs:create`);
    try {
        const faq = await service.create(req.body, req.context);
        const message = "Faq Created Successfully";
        log.end();
        return response.success(res, message, faq);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


// Faqs Detail
const getFaq = async (req, res) => {
    const log = req.context.logger.start(`api:faqs:getFaq`);
    try {
        const faq = await service.getFaq(req.params.id, req.body, req.context);
        const message = "Faqs Detail";
        log.end();
        return response.success(res, message, faq);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


//getUsers
const getFaqs = async (req, res) => {  
    const log = req.context.logger.start(`api:faqs:getFaqs`);
    try {
        const faqs = await service.getFaqs(req.body, req.context);
        const message = "Faqs Fetched Successfully";
        log.end();
        return response.success(res, message, faqs);
        // return response.success(res, message, userMapper.toSearchModel(user));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

//deleteUser
const deleteFaq = async (req, res) => {
    const log = req.context.logger.start(`api:faqs:deleteFaq`);
    try {
        const faq = await service.deleteFaq(req.params.id, req.context);
        log.end();
        return response.data(res, faq);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
//update faq
const update = async (req, res) => {
    const log = req.context.logger.start(`api:faqs:update`);
    try {
        const faq = await service.update(req.params.id, req.body, req.context);
        log.end();
        return response.data(res, faq);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};



exports.create = create;
exports.getFaq = getFaq;
exports.getFaqs = getFaqs;
exports.deleteFaq = deleteFaq;
exports.update = update;
