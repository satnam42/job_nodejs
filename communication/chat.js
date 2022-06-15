var socketio = require('socket.io');
var mongoose = require('mongoose');
var events = require('events');
var moment = require('moment');
var _ = require('lodash');
var eventEmitter = new events.EventEmitter();
console.log('connected')
require('../models/rooms.js');
var roomModel = mongoose.model('Room');
require('../models/chats.js');
var chatModel = mongoose.model('Chat');
// const service = require('../services/push-notification')
module.exports.sockets = function (http) {
  io = socketio.listen(http);
  var ioChat = io
  var userStack = {};
  var oldChats, sendUserStack, setRoom;
  var userSocket = {};
  let userList = []
  let userSocketList = []
  ioChat.on('connection', function (socket) {
    console.log("socketio chat connected.");
    //function to get user name
    socket.on('set-user-data', function (username) {
      if (username == undefined || username == "") {
        socket.emit('oops', {
          event: 'username is  required',
          data: 'username is  required'
        });
      }
      console.log(username + "  logged In");
      //storing variable.
      socket.username = username;
      userSocket[socket.username] = socket.id;
      userSocketList.push({
        username: socket.username,
        status: 'online',
      })
      //getting all users list
      eventEmitter.emit('get-all-users');
      //sending all users list. and setting if online or offline.
      sendUserStack = function () {
        for (const socketUser of userSocketList) {
          for (let index = 0; index < userList.length; index++) {
            if (userList[index].username == socketUser.username) {
              userList[index].status = "online"
            }
          }
        }
        // for (i in userSocket) {
        //   for (j in userStack) {
        //     if (j == i) {
        //       userStack[j] = "Online";
        //     }
        //   }
        // }

        //for popping connection message.
        ioChat.emit('onlineStack', userList);
      } //end of sendUserStack function.

    }); //end of set-user-data event.

    //setting room.
    socket.on('set-room', function (room) {
      //leaving room.
      socket.leave(socket.room);
      //getting room data.
      eventEmitter.emit('get-room-data', room);
      //setting room and join.
      setRoom = function (roomId) {
        socket.room = roomId;
        console.log("roomId : " + socket.room);
        socket.join(socket.room);
        ioChat.to(userSocket[socket.username]).emit('set-room', socket.room);
      };

    }); //end of set-room event.
    //emits event to read old-chats-init from database.
    socket.on('old-chats-init', function (data) {
      console.log("read-chat:", data)
      db.chats.find({})
        .where('room').equals(data.room)
        .sort('-createdOn')
        .skip(data.msgCount)
        .lean()
        .limit(5)
        .exec(function (err, result) {
          if (err) {
            console.log("Error : " + err);
          } else {
            //calling function which emits event to client to show chats.
            oldChats(result, data.username, data.room);
          }
        });
    });

    //emits event to read old chats from database.
    socket.on('old-chats', function (data) {
      eventEmitter.emit('read-chat', data);
    });

    //sending old chats to client.
    oldChats = function (result, username, room) {
      ioChat.to(userSocket[username]).emit('old-chats', {
        result: result,
        room: room
      });
    }
    //showing msg on typing.
    socket.on('typing', function () {
      socket.to(socket.room).broadcast.emit('typing', " typing...");
    });

    //for showing chats.
    socket.on('chat-msg', function (data) {
      //emits event to save chat to database.
      eventEmitter.emit('save-chat', {
        msgFrom: socket.username,
        msgTo: data.msgTo,
        msg: data.msg,
        room: socket.room,
        date: data.date
      });

      // let response = service.pushNotification(data.msgTo, socket.username, data.msg)

      console.log('Push Notification response', response)

      let msgDate = moment.utc(data.date).format()

      ioChat.to(socket.room).emit('chat-msg', {
        msgFrom: socket.username,
        msg: data.msg,
        date: msgDate
      });

      for (user in userStack) {

        if (user == socket.username) {
          delete userStack[user]
        }

      }

      let addUser = socket.username

      const updateStack = { [addUser]: 'Online', ...userStack }

      userStack = updateStack;

      ioChat.emit('onlineStack', userStack);

    });

    //for popping disconnection message.
    socket.on('disconnect', function () {

      console.log(socket.username + "  logged out");
      socket.broadcast.emit('broadcast', { description: socket.username + ' Logged out' });

      console.log("chat disconnected.");

      for (let index = 0; index < userList.length; index++) {
        if (userList[index].username == socket.username) {
          userList[index].status = "offline"
        }
      }
      _.unset(userSocket, socket.username);
      userStack[socket.username] = "Offline";

      ioChat.emit('onlineStack', userList);
    }); //end of disconnect event.

  }); //end of io.on(connection).
  //end of socket.io code for chat feature.

  //database operations are kept outside of socket.io code.
  //saving chats to database.
  eventEmitter.on('save-chat', function (data) {
    console.log("save-chat:", data)
    // var today = Date.now();
    try {
      var newChat = new chatModel({
        msgFrom: data.msgFrom,
        msgTo: data.msgTo,
        msg: data.msg,
        room: data.room,
        createdOn: data.date
      });
    }
    catch (err) {
      console.log(err)
    }
    newChat.save(function (err, result) {
      if (err) {
        console.log("Error : " + err);
      } else if (result == undefined || result == null || result == "") {
        console.log("Chat Is Not Saved.");
      } else {
        console.log("Chat Saved", result);
      }
    });
  });

  eventEmitter.on('read-chat', function (data) {
    console.log("read-chat:", data)
    db.chats.find({})
      .where('room').equals(data.room)
      .sort('-createdOn')
      .skip(data.msgCount)
      .lean()
      .limit(5)
      .exec(function (err, result) {
        if (err) {
          console.log("Error : " + err);
        } else {
          //calling function which emits event to client to show chats.
          oldChats(result, data.username, data.room);
        }
      });
  })

  //end of saving chat.

  //listening for get-all-users event. creating list of all users.
  eventEmitter.on('get-all-users', async function () {
    console.log("get-all-users")
    db.users.find({})
      .select('username')
      .exec(async function (err, result) {
        if (err) {
          console.log("Error : " + err);
        } else {
          userStack = {}
          //console.log(result);
          for (var i = 0; i < result.length; i++) {
            userStack = {}
            userStack.username = result[i].username
            userStack.status = "Offline"
            console.log('before list', userList)
            let isExist = await userList.some((value) => {
              console.log('value.username', value.username)
              console.log('result[i].username', result[i].username)
              return value.username == result[i].username
            })
            if (!isExist) {
              userList.push(userStack)
            }
            console.log('after list', userList)
            // userStack[result[i].username] = "Offline";
          }
          //console.log("stack "+Object.keys(userStack));
          sendUserStack();
        }
      });
  }); //end of get-all-users event.

  //listening get-room-data event.
  eventEmitter.on('get-room-data', function (room) {
    console.log("get-room-data:", room)
    db.rooms.find({
      $or: [{
        name1: room.name1
      }, {
        name1: room.name2
      }, {
        name2: room.name1
      }, {
        name2: room.name2
      }]
    }, function (err, result) {
      if (err) {
        console.log("Error : " + err);
      } else {
        if (result == "" || result == undefined || result == null) {
          var today = Date.now();
          newRoom = new roomModel({
            name1: room.name1,
            name2: room.name2,
            lastActive: today,
            createdOn: today
          });

          newRoom.save(function (err, newResult) {

            if (err) {
              console.log("Error : " + err);
            } else if (newResult == "" || newResult == undefined || newResult == null) {
              console.log("Some Error Occured During Room Creation.");
            } else {
              setRoom(newResult._id); //calling setRoom function.
            }
          }); //end of saving room.
        } else {
          var jresult = JSON.parse(JSON.stringify(result));
          setRoom(jresult[0]._id); //calling setRoom function.
        }
      } //end of else.
    }); //end of find room.
  })//end of get-room-data listener.
  //end of database operations for chat feature.

};
