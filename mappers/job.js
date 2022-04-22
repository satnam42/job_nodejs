"use strict";
 const filePath = require("config").get("files").url

exports.toModel = entity => {

    const model = {
        title:entity.title,
        category:entity.category,
        location:entity.location,
        price:entity.price,
        firstName: entity.firstName,
        lastName: entity.lastName,

     };

  

    return model;

};


exports.toSearchModel = entities => {
    return entities.map(entity => {
        return exports.toModel(entity);
    });
    1
};