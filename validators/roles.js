"use strict";
const response = require("../exchange/response");

const create = (req, res, next) => {
    const log = req.context.logger.start("validators:role:create");
    if (!req.body) {
        log.end();
        return response.failure(res, "body is equired");
    }
    if (!req.body.roleType) {
        log.end();
        return response.failure(res, "type is required, for admin = Admin,for client = Client ");
    }
    log.end();
    return next();
};


exports.create = create;
