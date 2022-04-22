"use strict"
const ObjectId = require("mongodb").ObjectID;
const fs = require("fs");
const { resourceLimits } = require("worker_threads");
const imageUrl = require('config').get('image').url


const buildjob = async (model, context) => {
    const { user, title, category, location, price, workers, firstName, lastName, email, country,
        userId, scopeOfWork, planOfAction, constructionDocumentation, company } = model;
    const log = context.logger.start(`services:jobs:build${model}`);
    const job = await new db.job({
        user: userId,
        title: title,
        category: category,   
        location: location,
        price: price,
        workers: workers,
        firstName: firstName,
        lastName: lastName,
        email: email,
        country: country,
        scopeOfWork: scopeOfWork,
        planOfAction: planOfAction,
        constructionDocumentation: constructionDocumentation,
        company: company,
        createdOn: new Date(),
        updateOn: new Date()
    }).save();
    log.end();
    return job;
};

const create = async (model, context) => {
    const log = context.logger.start("services:jobs:create");
    const job = await buildjob(model, context);
    log.end();
    return job;

};



// get job

const getJobs = async (id, context) => {
    const log = context.logger.start(`services:jobs:getJobs`);
    let job = await db.job.findById(id);
    log.end();
    job.constructionDocumentation = imageUrl + '/' + job.constructionDocumentation;
   
    return job;
};


// get all jobs

const getAllJobs = async (query, context) => {
    const log = context.logger.start(`services:jobs:getAllJobs`);
    let alljob = await db.job.find();
    log.end();
    return alljob;
};


//recent posts

const recentPosts = async (model, context) => {
    const log = context.logger.start("service:recent:posts");
    const recentPost = await db.job.find({}).sort({ createdOn: -1 });
    log.end();
    return recentPost;
}


// upload docs

const uploadDocs = async (files, body, context) => {
    const log = context.logger.start(`services:jobs:uploadDocs`);
    if (!files) {
        throw new Error("files not found");
    }
    let job = await db.job.findById(body.id);
    if (!job) {
        throw new Error("job not found");
    }
    if (job.constructionDocumentation != "" && job.constructionDocumentation !== undefined) {

        let picUrl = job.constructionDocumentation.replace(`${imageUrl}`, '');
        try {
            await fs.unlinkSync(`${picUrl}`)
            console.log('File unlinked!');
        } catch (err) {
            console.log(err)
        }
    }
    const image = files[0].filename
    job.constructionDocumentation = image;
    await job.save();
    log.end();
    //  job.constructionDocumentation = imageUrl + '/' + job.constructionDocumentation;

    return job;
};


// get popular jobs 


const getPopularJobs = async (model, context) => {
    const log = context.logger.start("service:popular:jobs");
    const popularJobs = await db.job.find({}).sort({ workers: -1 });
    log.end();
    return popularJobs
}



// set jobs
const setJObs = (model, job, context) => {
    const log = context.logger.start("services:jobs:set");
    if (model.title !== "string" && model.title !== undefined) {
        job.title = model.title;
    }

    if (model.category !== "string" && model.category !== undefined) {
        job.category = model.category;
    }

    if (model.location !== "string" && model.location !== undefined) {
        job.location = model.location;
    }


    if (model.price !== "string" && model.price !== undefined) {
        job.price = model.price;
    }

    if (model.workers !== "string" && model.workers !== undefined) {
        job.workers = model.workers;
    }


    if (model.firstName !== "string" && model.firstName !== undefined) {
        job.firstName = model.firstName;
    }

    if (model.lastName !== "string" && model.lastName !== undefined) {
        job.lastName = model.lastName;
    }


    if (model.email !== "string" && model.email !== undefined) {
        job.email = model.email;
    }

    if (model.country !== "string" && model.country !== undefined) {
        job.country = model.country;
    }


    if (model.scopeOfWork !== "string" && model.scopeOfWork !== undefined) {
        job.scopeOfWork = model.scopeOfWork;
    }

    if (model.planOfAction !== "string" && model.planOfAction !== undefined) {
        job.planOfAction = model.planOfAction;
    }


    if (model.constructionDocumentation !== "string" && model.constructionDocumentation !== undefined) {
        job.constructionDocumentation = model.constructionDocumentation;
    }

    if (model.company !== "string" && model.company !== undefined) {
        job.company = model.company;
    }

    log.end();
    job.save();
    return job;

};



// job update 

const update = async (id, model, context) => {
    const log = context.logger.start(`services:jobs:update`);
    let entity = await db.job.findById(id);
    if (!entity) {
        throw new Error("jobs not found");
    }
    const job = await setJObs(model, entity, context);
    log.end();
    return job
};


// job delete

const deleteJobs = async(id,context)=>{
    const log = context.logger.start(`services:jobs:deleteJobs`);
    
    if(!id){
        throw new Error('id is required');
    }
    
    let job = await db.job.deleteOne({_id:id})

    if(!job){
        throw new Error("job not found");
    }
    return 'job deleted successfully'
};







// const jobFilter = async (query, context) => {
//     const log = context.logger.start(`services:jobs:getAllJobs`);
//     let filter = await db.job.find({
        
//     });
//     log.end();
//     return alljob;
// };

















exports.create = create;
exports.getJobs = getJobs;
exports.getAllJobs = getAllJobs;
exports.recentPosts = recentPosts;
exports.uploadDocs = uploadDocs;
exports.getPopularJobs = getPopularJobs;
exports.update = update;
exports.deleteJobs = deleteJobs;
