"use strict";

const express = require("express");
const appConfig = require("config").get("app");
const logger = require("@open-age/logger")("server");
const Http = require("http");
// const Https = require("https");
const fs = require('fs');
const port = process.env.PORT || appConfig.port || 9090;
var admin = require("firebase-admin");
const path = require('path');
const bcrypt = require("bcrypt");
// var serviceAccount = require("./"); //dummy for now
var serviceAccount = require("./firebase-lmm.json");
// const roleService = require("./services/roles");


const app = express();

var bodyParser = require('body-parser');

var server = Http.createServer(app);



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// const options = {
//   // cert: fs.readFileSync('/etc/letsencrypt/live/lmm.lmdev.com.au/fullchain.pem'),
//   // key: fs.readFileSync('/etc/letsencrypt/live/lmm.lmdev.com.au/privkey.pem')
//   cert: fs.readFileSync('/etc/letsencrypt/live/lmmweb.cradle.services/fullchain.pem'),
//   key: fs.readFileSync('/etc/letsencrypt/live/lmmweb.cradle.services/privkey.pem')
// };
// var server = Https.createServer(options, app);

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const boot = () => {
  const log = logger.start("app:boot");
  log.info(`environment:  ${process.env.NODE_ENV}`);
  log.info("starting server");
  server.listen(port, () => {
    log.info(`listening on 
    
         : ${port}`);
    log.end();
  });
  // let body = {
  //   type:'user'
  // }
  //  roleService.create(body,{logger});
};

const init = async () => {
  await require("./settings/database").configure(logger);
  await require("./settings/express").configure(app, logger);
  await require("./settings/routes").configure(app, logger);
  boot();
};

// const create = async () => {
//   let body = {
//     type:'user'
//   }
//   await roleService.create(body,{logger});
// }

// create();
init();
