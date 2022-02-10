"use strict";
const service = require("../services/roles");
const response = require("../exchange/response");


const adminlogin = async (req, res) => {
    const log = req.context.logger.start("api:users:adminlogin");
    try {
        const user = await service.adminlogin(req.body, req.context);
        log.end();
        return response.authorized(res,user, user.token);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const create = async (req, res) => {
    const log = req.context.logger.start(`api:roles:create`);
    try {
        const role = await service.create(req.body, req.context);
        const message = "role created Successfully";
        log.end();
        return response.success(res, message, role);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const createPermissions = async (req, res) => {
    const log = req.context.logger.start(`api:roles:createPermissions`);
    try {
        const role = await service.createPermissions(req.body, req.context);
        const message = "Permission created Successfully";
        log.end();
        return response.success(res, message, role);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const getRoles = async (req, res) => {
    const log = req.context.logger.start(`api:roles:getRoles`);
    try {
        const roles = await service.getRoles(req.body, req.context);
        const message = "Roles fetched successfully"
        log.end();
        return response.page(message,res, roles, Number(req.query.pageNo) || 1, Number(req.query.pageSize) || 10, roles.count)
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const getAllPermissions = async (req, res) => {
    const log = req.context.logger.start(`api:roles:getAllPermissions`);
    try {
        const roles = await service.getAllPermissions(req.body, req.context);
        let message = "list Fetched succesfully "
        log.end();
        return response.page(message,res, roles, Number(req.query.pageNo) || 1, Number(req.query.pageSize) || 10, roles.count)
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const deleteRole = async (req, res) => {
    const log = req.context.logger.start(`api:roles:deleteRole`);
    try {
        const role = await service.deleteRole(req.params.id, req.context);
        log.end();
        return response.data(res, role);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const deletePermission = async (req, res) => {
    const log = req.context.logger.start(`api:roles:deletePermission`);
    try {
        const role = await service.deletePermission(req.params.id, req.context);
        log.end();
        return response.data(res, role);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const updateRole = async(req, res) => {
    const log = req.context.logger.start("api:roles:updateRole");
    try {
        const message = await service.updateRole(req.params.id, req.body, req.context);
        log.end();
        return response.success(res, message);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const updatePermission = async(req, res) => {
    const log = req.context.logger.start("api:roles:updatePermission");
    try {
        const message = await service.updatePermission(req.params.id, req.body, req.context);
        log.end();
        return response.success(res, message);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const updateRoleStatus = async(req, res) => {
    const log = req.context.logger.start("api:roles:updateRoleStatus");
    try {
        const message = await service.updateRoleStatus(req.params.id, req.body, req.context);
        log.end();
        return response.success(res, message);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);  
    }
};

const updatePermissionStatus = async(req, res) => {
    const log = req.context.logger.start("api:roles:updatePermissionStatus");
    try {
        const message = await service.updatePermissionStatus(req.params.id, req.body, req.context);
        log.end();
        return response.success(res, message);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);  
    }
};

const searchRole = async(req, res) => {
    const log = req.context.logger.start(`api:roles:search`);
    try {
        const products = await service.searchRole(req.body, req.context);
        const message = "data fetched Successfully";
        log.end();
        return response.success(res, message, products);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.create = create;
exports.createPermissions = createPermissions;
exports.getAllPermissions = getAllPermissions;
exports.getRoles = getRoles;
exports.updateRole = updateRole;
exports.updatePermission = updatePermission;
exports.deleteRole = deleteRole;
exports.deletePermission = deletePermission;
exports.searchRole = searchRole;
exports.adminlogin = adminlogin;
exports.updateRoleStatus = updateRoleStatus;
exports.updatePermissionStatus = updatePermissionStatus;