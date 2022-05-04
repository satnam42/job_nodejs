
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
   let job = await db.job.findById(model.jobId);
   console.log(job);
   if (!job) throw new Error("job not found");

   let user = await db.user.findById(model.userId);
   if(!user){
       throw new Error('user not found')
   }
   
    const wishlist = await build(model, context);
    log.end();
    return wishlist;

};


const favourite = async (id, context) => {
    const log = context.logger.start(`services:jobs:getJobs`);
    let wishlist = await db.wishlist.findById(id);  
    if(!wishlist){
        throw new Error('wishlist not found')
    }
    log.end();
    return wishlist;
};









exports.create = create;
exports.favourite = favourite;

