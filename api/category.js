// const fs = require('fs');
const service = require("../services/category");
const response = require("../exchange/response");

const create = async (req, res) => {
    const log = req.context.logger.start(`api:category:create`);
    try {
        const category = await service.create(req.body, req.context);
        const message = "category Created Successfully";
        log.end();
        return response.success(res, message ,category);
        // return response.success(res, message, userMapper.toModel(user));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


const getAllCategory = async (req, res) => {
    const log = req.context.logger.start(`api:category:getAllCategory`);
    try {
        const AllCategory = await service.getAllCategory(req.body, req.context);
        const message = "all categories find";
        log.end();
        return response.success(res, message, AllCategory);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};





exports.create = create;
exports.getAllCategory = getAllCategory;