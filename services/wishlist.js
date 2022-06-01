
const ObjectId = require("mongodb").ObjectID;
const fs = require("fs");



const build = async (model, context) => {
    const { userId, jobId, status } = model;
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
    let job = await db.job.findById(model.jobId);
    console.log(job);
    if (!job) throw new Error("job not found");

    let user = await db.user.findById(model.userId);
    if (!user) {
        throw new Error('user not found')
    }

    const wishlist = await build(model, context);
    log.end();
    return wishlist;

};


const wishlistByUserId = async (id, context) => {
    const log = context.logger.start(`services:wishlist:wishlistByUserId`);
    if (!id) {
        throw new Error('userId is required')
    }
    let wishlist = await db.wishlist.find({ userId: id }).populate("job");
    if (!wishlist) {
        throw new Error('wishlist not found')
    }
    log.end();
    return wishlist;
};


exports.create = create;
exports.wishlistByUserId = wishlistByUserId;

