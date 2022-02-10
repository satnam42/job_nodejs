"use strict";
const service = require("../services/blogs");
const response = require("../exchange/response");
// const blogMapper = require("../mappers/blog");

//register api
const create = async (req, res) => {
    const log = req.context.logger.start(`api:blogs:create`);
    try {
        const blog = await service.create(req.body, req.context);
        const message = "Blog Created Successfully";
        log.end();
        return response.success(res, message ,blog);
        // return response.success(res, message, userMapper.toModel(user));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const setAboutUs = async (req, res) => {
    const log = req.context.logger.start(`api:blogs:setAboutUs`);
    try {
        const blog = await service.setAboutUs(req.body, req.context);
        const message = "About us updated Successfully";
        log.end();
        return response.success(res, message ,blog);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

//login api  
const login = async (req, res) => {
    const log = req.context.logger.start("api:users:login");
    try {
        const user = await service.login(req.body, req.context);
        log.end();
        return response.authorized(res, userMapper.toModel(user), user.token);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

// current user
const getBlog = async (req, res) => {
    const log = req.context.logger.start(`api:blogs:getBlog`);
    try {
        const blog = await service.getBlog(req.params.id, req.body, req.context);
        const message = "Blog Detail";
        log.end();
        return response.success(res, message, blog);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

// change password
const changePassword = async (req, res) => {
    const log = req.context.logger.start("api:users:changePassword");
    try {
        const message = await service.changePassword(req.params.id, req.body, req.context);
        log.end();
        return response.success(res, message);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

//getUsers
const getBlogs = async (req, res) => {  
    const log = req.context.logger.start(`api:blogs:getBlogs`);
    try {
        const blogs = await service.getBlogs(req.body, req.context);
        const message = "Blogs Fetched Successfully";
        log.end();
        return response.success(res, message, blogs);
        // return response.success(res, message, userMapper.toSearchModel(user));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const publishedBlogs = async (req, res) => {  
    const log = req.context.logger.start(`api:blogs:publishedBlogs`);
    try {
        const blogs = await service.publishedBlogs(req.body, req.context);
        const message = "Blogs Fetched Successfully";
        log.end();
        return response.success(res, message, blogs);
        // return response.success(res, message, userMapper.toSearchModel(user));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

//deleteUser
const deleteBlog = async (req, res) => {
    const log = req.context.logger.start(`api:blogs:deleteBlog`);
    try {
        const blog = await service.deleteBlog(req.params.id, req.context);
        log.end();
        return response.data(res, blog);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
//update blog
const update = async (req, res) => {
    const log = req.context.logger.start(`api:blogs:update`);
    try {
        const blog = await service.update(req.params.id, req.body, req.context);
        log.end();
        return response.data(res, blog);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const blogStatus = async (req, res) => {
    const log = req.context.logger.start(`api:blogs:blogStatus`);
    try {
        const blog = await service.blogStatus(req.params.id, req.body, req.context);
        log.end();
        return response.data(res, blog);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const search = async (req, res) => {
    const log = req.context.logger.start(`api:users:search:${req.query.name}`);
    try {
        const users = await service.search(req.query.name, req.context);
        log.end();
        return response.data(res, users);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


exports.create = create;
exports.getBlog = getBlog;
exports.getBlogs = getBlogs;
exports.deleteBlog = deleteBlog;
exports.update = update;
exports.blogStatus = blogStatus;
exports.setAboutUs = setAboutUs;
exports.publishedBlogs = publishedBlogs;
