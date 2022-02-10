const ObjectId = require("mongodb").ObjectID;

const setTemp = (model, tem, context) => {
    const log = context.logger.start("services:templates:set");

    if (model.imageurl !== "string" && model.imageurl !== undefined) {
        tem.imageurl = model.imageurl;
    }

    if (model.content !== "string" && model.content !== undefined) {
        tem.content = model.content;
    }
    if (model.audiourl !== "string" && model.audiourl !== undefined) {
        tem.audiourl = model.audiourl;
    }
    if (model.videourl !== "string" && model.videourl !== undefined) {
        tem.videourl = model.videourl;
    }
    if (model.documenturl !== "string" && model.documenturl !== undefined) {
        tem.documenturl = model.documenturl;
    }

    log.end();
    tem.save();
    return tem;

};
//create tem
const buildTemp = async (model, context) => {
    const { content, imageurl, audiourl, videourl, documenturl } = model;
    const log = context.logger.start(`services:templates:build${model}`);
    const col = await new db.template({
        content: content,
        imageurl: imageurl,
        audiourl: audiourl,
        videourl: videourl,
        documenturl: documenturl,
        createdOn: new Date(),
        updateOn: new Date()
    }).save();
    log.end();
    return col;
};

const create = async (model, context) => {
    const log = context.logger.start("services:templates:create");
    const tem = buildTemp(model, context);
    log.end();
    return tem;

};

// getList
const getList = async (query, context) => {
    const log = context.logger.start(`services:templates:getList`);
    let allTemp = await db.template.find();
    allTemp.count = await db.template.find().count();
    log.end();
    return allTemp;
};

const update = async (id, model, context) => {
    const log = context.logger.start(`services:templates:update`);
    let entity = await db.template.findById(id);
    if (!entity) {
        throw new Error("Template not found");
    }
    const tem = await setTemp(model, entity, context);
    log.end();
    return tem
};

//delete template
const deleteTemplate = async (id, context) => {
    const log = context.logger.start(`services:templates:deleteTemplate:${id}`);
    if (!id) {
        throw new Error("template id is required");
    }
    await db.template.deleteOne({ _id: id });
    log.end();
    return 'Template Deleted Successfully'
};

exports.create = create;
exports.getList = getList;
exports.update = update;
exports.deleteTemplate = deleteTemplate;