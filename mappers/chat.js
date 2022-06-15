'use strict'

exports.toModel = (entity) => {
    const model = {
        id: entity._id,
        fromMsg: entity.msgFrom,
        toMsg: entity.msgTo,
        msg: entity.msg,
        room: entity.room,
        createdOn: entity.createdOn,
    }
    return model
}

exports.toSearchModel = (entities) => {
    return entities.map((entity) => {
        return exports.toModel(entity)
    })
}
