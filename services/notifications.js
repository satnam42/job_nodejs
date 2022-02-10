const service = require('../services/push-Notification')
const ObjectId = require("mongodb").ObjectID;


const setNotification = (model, noti, context) => {
    const log = context.logger.start("services:notifications:set");

    if (model.content !== "string" && model.content !== undefined) {
        noti.content = model.content;
    }

    log.end();
    noti.save();
    return noti;

};
//create faq

const buildNotification = async (model, context) => {
    const { content } = model;
    const log = context.logger.start(`services:notifications:build${model}`);
    const noti = await new db.notification({
        content: content,
        createdOn: new Date(),
        updateOn: new Date()
    }).save();
    log.end();
    return noti;
};

const fireNotification = async (model, context) => {
    const { type, content, user, notificationID } = model;
    const log = context.logger.start(`services:notifications:build${model}`);
    if (type == 1) {
        const query = {};
        query.email = model.user;
        let users = await db.user.findOne(query)
        const msg = content
        let response = service.pushNotification(users.deviceToken, users.firstName, msg);
        console.log(users.token)
        /* save noti */
        const noti = await new db.usernotification({
            user: users.id,
            notification: notificationID,
            createdOn: new Date()
        }).save();
        log.end();
        return response;
    } else if (type == 2) {
        let allDeviceTokens = await db.user.find({ isDeleted: { $eq: false }, deviceToken: { $ne: '' } })
        const msg = content
        allDeviceTokens.forEach(token => {
            let response = service.pushNotification(token.deviceToken, token.firstName, msg)
            /* save noti */
            const noti = new db.usernotification({
                user: token.id,
                notification: notificationID,
                createdOn: new Date()
            }).save();
            log.end();
            return response;
        });
    }

}

const create = async (model, context) => {
    const log = context.logger.start("services:notifications:create");
    const noti = buildNotification(model, context);
    log.end();
    return noti;

};

const fireNotifications = async (model, context) => {
    const log = context.logger.start("services:notifications:fireNotifications");
    const noti = fireNotification(model, context);
    log.end();
    return noti;

};

// getBlogs
const getNotifications = async (query, context) => {
    const log = context.logger.start(`services:notifications:getFaqs`);
    let allNoti = await db.notification.find();
    allNoti.count = await db.notification.find().count();
    log.end();
    return allNoti;
};


const deleteNotification = async (id, context) => {
    const log = context.logger.start(`services:notifications:deleteNotification`);

    if (!id) {
        throw new Error("id is requried");
    }

    let noti = await db.notification.deleteOne({ _id: id });

    if (!noti) {
        throw new Error("Notification not found");
    }

    return 'Notification Deleted Successfully'
};

const update = async (id, model, context) => {
    const log = context.logger.start(`services:notifications:update`);
    let entity = await db.notification.findById(id);
    if (!entity) {
        throw new Error("Notification not found");
    }
    const faq = await setNotification(model, entity, context);
    log.end();
    return faq
};

const getAllNotifications = async (query, context) => {
    const log = context.logger.start(`services:notifications:getAllNotifications`);
    let allNoti = await db.usernotification.find().populate({
        path: 'notification',
        model: 'notification'
    }).populate({
        path: 'user',
        model: 'user'
    })
    log.end();
    return allNoti;
};

const myNotifications = async (id, model, context) => {
    const log = context.logger.start(`services:users:myNotifications`);
    if (!id) {
        throw new Error("User id is required");
    }
    const query = {};
    query.user = id;
    query.status = 'sent';
    let user = await db.usernotification.find(query).populate({
        path: 'notification',
        model: 'notification'
    })
    if (!user) {
        throw new Error("user not found");
    }
    log.end();
    return user;
};


exports.create = create;
exports.getNotifications = getNotifications;
exports.deleteNotification = deleteNotification;
exports.update = update;
exports.fireNotifications = fireNotifications;
exports.getAllNotifications = getAllNotifications;
exports.myNotifications = myNotifications;