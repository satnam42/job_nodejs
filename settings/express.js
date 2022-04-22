"use strict";
const path = require("path");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
var multer = require('multer');


// const destination = (req, file, cb) => {
//   switch (file.mimetype) {
//        case 'image/jpeg':
//             cb(null, './images/');
//             break;
//        case 'image/png':
//             cb(null, './images/');
//             break;
//        case 'application/pdf':
//             cb(null, './whitePaper/');
//             break;
//        default:
//             cb('invalid file');
//             break;
//   }
// }


// image uplaod location //
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //todo if file already exists, remove image on save destination
    // if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
    //   cb(null, true)
    // }



    cb(null, path.join(__dirname, '../', `assets/${file.mimetype == "application/pdf" ? "files" : "images"}`));
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname.replace(/ /g, ''));
  }

});

const configure = async (app, logger) => {
  const log = logger.start("settings:express:configure");
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(cors());
  app.use(multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 50 } }).any());;

  app.use(
    bodyParser.urlencoded({
      extended: true,
      limit: "50mb", parameterLimit: 50000
    })
  );

  app.use(
    bodyParser({
      limit: "50mb",
      keepExtensions: true
    })
  );

  const root = path.normalize(__dirname + "./../");
  app.use(express.static(path.join(root, "public")));
  log.end();

};

exports.configure = configure;
