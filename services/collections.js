const ObjectId = require("mongodb").ObjectID;

const setCol = (model, col, context) => {
    const log = context.logger.start("services:collections:set");
    
    if (model.name !== "string" && model.name !== undefined) {
        col.name = model.name;
    }

    log.end();
    col.save();
    return col;

};
//create Col
const buildCol = async (model, context) => {
    const { name } = model;
    const log = context.logger.start(`services:collections:build${model}`);
    const col = await new db.collection({
        name:name,
        createdOn: new Date(),
        updateOn: new Date()
    }).save();
    log.end();
    return col;
};

const create = async (model, context) => {
    const log = context.logger.start("services:collections:create");
    const col = buildCol(model, context);
    log.end();
    return col;

};

// getBlogs
const getCollections = async (query, context) => {
    const log = context.logger.start(`services:collections:getCollections`);
    let allCollection = await db.collection.find();
    allCollection.count = await db.collection.find().count();
    log.end();
    return allCollection;
};

const update = async (id, model, context) => {
    const log = context.logger.start(`services:collections:update`);
    let entity = await db.collection.findById(id);
    if (!entity) {
        throw new Error("Collection not found");
    }
    const col = await setCol(model, entity, context);
    log.end();
    return col
};

/* Delete Collection RK*/
const deleteCollection = async (id, context) => {
    const log = context.logger.start(`services:collections:deleteCollection`);

    if (!id) {
        throw new Error("id is requried");
    }

    let collection = await db.collection.deleteOne({ _id: id });

    if (!collection) {
        throw new Error("Collection not found");
    }

    return 'Collection Deleted Successfully'
};


exports.create = create;
exports.getCollections = getCollections;
exports.update = update;
exports.deleteCollection = deleteCollection;