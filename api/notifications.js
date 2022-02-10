"use strict";
const service = require("../services/notifications");
const response = require("../exchange/response");

// create notification
const create = async (req, res) => {
    const log = req.context.logger.start(`api:notifications:create`);
    try {
        const notification = await service.create(req.body, req.context);
        const message = "Notification Created Successfully";
        log.end();
        return response.success(res, message, notification);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const fireNotifications = async (req, res) => {
    const log = req.context.logger.start(`api:notifications:fireNotifications`);
    try {
        const notification = await service.fireNotifications(req.body, req.context);
        const message = "Notification Sent Successfully";
        log.end();
        return response.success(res, message, notification);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


//getUsers
const getNotifications = async (req, res) => {  
    const log = req.context.logger.start(`api:notifications:getNotifications`);
    try {
        const notifications = await service.getNotifications(req.body, req.context);
        const message = "Notification Fetched Successfully";
        log.end();
        return response.success(res, message, notifications);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

//deleteUser
const deleteNotification = async (req, res) => {
    const log = req.context.logger.start(`api:notifications:deleteNotification`);
    try {
        const faq = await service.deleteNotification(req.params.id, req.context);
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
    const log = req.context.logger.start(`api:notifications:update`);
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

const getAllNotifications = async (req, res) => {  
    const log = req.context.logger.start(`api:notifications:getAllNotifications`);
    try {
        const notifications = await service.getAllNotifications(req.body, req.context);
        const message = "Notification Fetched Successfully";
        log.end();
        return response.success(res, message, notifications);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const myNotifications = async (req, res) => {  
    const log = req.context.logger.start(`api:notifications:myNotifications`);
    try {
        const notifications = await service.myNotifications(req.params.id,req.body, req.context);
        const message = "Notification Fetched Successfully";
        log.end();
        return response.success(res, message, notifications);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};



exports.create = create;
exports.update = update;
exports.getNotifications = getNotifications;
exports.deleteNotification = deleteNotification;
exports.fireNotifications = fireNotifications;
exports.getAllNotifications = getAllNotifications;
exports.myNotifications = myNotifications;
