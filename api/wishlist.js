const service = require("../services/wishlist");
const response = require("../exchange/response");


const create = async (req, res) => {
    const log = req.context.logger.start(`api:wishlist:create`);
    try {
        const wishlist = await service.create(req.body, req.context);
        const message = "category Created Successfully";
        log.end();
        return response.success(res, message, wishlist);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const wishlistByUserId = async (req, res) => {
    const log = req.context.logger.start(`api:wishlist:wishlistByUserId`);
    try {
        const list = await service.wishlistByUserId(req.params.id, req.context);
        const message = "wishlist fetched successfully";
        log.end();
        return response.success(res, message, list);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.create = create;
exports.wishlistByUserId = wishlistByUserId;