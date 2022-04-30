"use strict"

const ObjectId = require("mongodb").ObjectID;
const fs = require('fs');



// build category

const buildCategory = async (model, context) => {
    const { category } = model;
    const log = context.logger.start(`services:category:build${model}`);
    const jobCategory = await new db.category({
        category: category,
        createdOn: new Date(),
        updateOn: new Date()
    }).save();
    log.end();
    return jobCategory;
};

const create = async (model, context) => {
    const log = context.logger.start("services:category:create");
    const category = buildCategory(model, context);
    log.end();
    return category;

};

// get category by id

const getCategory = async (id, context) => {
    const log = context.logger.start(`services:category:getCategory`);
    let category = await db.category.findById(id)
    log.end();

    return category;
};





// getAllCategory

const getAllCategory = async (query, context) => {
    const log = context.logger.start(`services:category:getAllCategory`);
    let AllCategory = await db.category.find({});
    log.end();
    return AllCategory;
};



















exports.create = create;
exports.getAllCategory = getAllCategory;
exports.getCategory = getCategory;
