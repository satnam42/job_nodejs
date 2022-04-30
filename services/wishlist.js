
const ObjectId = require("mongodb").ObjectID;
const fs = require("fs");



const build = async (model, context) => {
    const { userId ,jobId,status } = model;
    const log = context.logger.start(`services:wishlist:build${model}`);
    const wishlist = await new db.wishlist({
        userId: userId,
        jobId: jobId,
        status: status
       
    }).save();
    log.end();
    return wishlist;
};

const create = async (model, context) => {
    const log = context.logger.start("services:wishlist:create");
    const wishlist = await build(model, context);
    log.end();
    return wishlist;

};



exports.create = create;