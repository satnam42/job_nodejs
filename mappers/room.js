'use strict'

exports.toModel = (entity) => {
    const model = {
        id: entity.id,
        name1: entity.name1,
        name2: entity.name2,
        members: entity.members,
        room: entity.room,
        lastActive: entity.lastActive,
        createdOn: entity.createdOn
    }
    return model
}

exports.toSearchModel = (entities) => {
    return entities.map((entity) => {
        return exports.toModel(entity)
    })
}
