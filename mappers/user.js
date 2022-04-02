"use strict";

const user = require('../models/user');
// const imageUrl = require('config').get('image').url


exports.toModel = entity => {

    const model = {
        userName:entity.userName,
        email:entity.email,
        companyName:entity.companyName,
        roleType:entity.roleType,
       // password:entity.password
    //     id: entity._id,
    //     firstName: entity.firstName,
    //     lastName: entity.lastName,
    //     // fullName: entity.fullName,
    //     dob: entity.dob,
    //     gender: entity.gender,
    //     loc: entity.loc,
       phoneNumber: entity.phoneNumber,
    //     notes: entity.notes,
    //     address: entity.address,
    //     superAdmin:entity.superAdmin,
    //     streetNo: entity.streetNo,
    //     streetName: entity.streetName,
    //     incomeRange: entity.incomeRange,
    //     role: entity.role,
    //     roleType: entity.roleType,
    //     status: entity.status,
    //     email: entity.email,
    //     state: entity.state,
    //     city: entity.city,
    //     nav:entity.nav, 
    //     permissions: entity.permissions,
    //     country: entity.country,
    //     zipCode: entity.zipCode,
    //     token: entity.token,
    //     privileges: entity.privileges,
        // deviceToken: entity.deviceToken,
    //     isDeleted: entity.isDeleted,
    //     deletedAt: entity.deletedAt,
         image: entity.image ? entity.image : ""
     };

    if (entity.image && entity.image.gallery && entity.image.gallery.length > 0) {
        for (let index = 0; index < entity.image.gallery.length; index++) {
            entity.image.gallery[index].image = `${imageUrl}${entity.image.gallery[index].image}`;
        }
        model.gallery = entity.image.gallery
    }

    return model;

};


exports.toSearchModel = entities => {
    return entities.map(entity => {
        return exports.toModel(entity);
    });
    1
};