"use strict";
const service = require("../services/contacts");
const response = require("../exchange/response");

const create = async (req, res) => {
    const log = req.context.logger.start("api:contacts:create");
    try {
        const createContacts = await service.create(req, res);
        const message = "Contact Saved";
        log.end();
        return response.success(res, message, createContacts)
    } catch (err) {
        log.end();
        return response.failure(res, err.message)
    }
}
const customCreate = async (req, res) => {
    const log = req.context.logger.start('api:contacts:customCreate');
    try {
        const created = await service.customCreate(req.body, req.context);
        const message = "Contacts Saved";
        log.end();
        return response.success(res, message, created)
    } catch (err) {
        log.error(err.message);
        return response.failure(res, err.message)
    }
}
const getContacts = async (req, res) => {
    const log = req.context.logger.start("api:contacts:get");
    try {
        const getContacts = await service.getContacts(req.params.id, req.context)
        log.end();
        return response.data(res, getContacts);
    } catch (err) {
        log.end();
        return response.failure(res, err.message)
    }
}
const update = async (req, res) => {
    const log = req.context.logger.start("api:contacts:update");
    try {
        const updated = await service.update(req.params.id, req.body, req.context);
        console.log(req.body)
        log.end();
        return response.data(res, updated)
    } catch (err) {
        log.end();
        return response.failure(res, err.message)
    }
}
const remove = async (req, res) => {
    const log = req.context.logger.start("api:contacts:remove");
    try {
        const removeContacts = await service.remove(req.params.id, req.context);
        log.end();
        return response.data(res, removeContacts)
    } catch (err) {
        log.end();
        return response.failure(res, err.message)
    }
}
exports.create = create;
exports.getContacts = getContacts;
exports.update = update;
exports.remove = remove;
exports.customCreate = customCreate;