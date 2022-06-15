'use strict'





const getOldChat = async (query, context) => {
    const log = context.logger.start('services:users:getOldChat')

    let pageNo = Number(query.pageNo) || 1
    let pageSize = Number(query.pageSize) || 10

    let skipCount = pageSize * (pageNo - 1)

    const chat = await db.chats.find({ room: query.room_id }).sort({ createdOn: -1 }).skip(skipCount).limit(pageSize)

    chat.count = await db.chats.find({ room: query.room_id }).count()

    // let skipCount = parseInt(query.skip_messages);
    // let chat = await db.chats.find({ room: query.room_id }).sort('-createdOn').skip(skipCount).lean()
    //     .limit(5)

    console.log("getOldChat : " + chat)
    log.end()
    return chat
}

exports.getOldChat = getOldChat

