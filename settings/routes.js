"use strict";

const fs = require("fs");
const api = require("../api");
const specs = require("../specs");
const permit = require("../permit")
const validator = require("../validators");
const path = require("path");
const express = require("express");

const configure = (app, logger) => {
    const log = logger.start("settings:routes:configure");
    app.get("/specs", function (req, res) {
        fs.readFile("./public/specs.html", function (err, data) {
            if (err) {
                return res.json({
                    isSuccess: false,
                    error: err.toString()
                });
            }
            res.contentType("text/html");
            res.send(data);
        });
    });

    app.get("/api/specs", function (req, res) {
        res.contentType("application/json");
        res.send(specs.get());
    });

    ////react js project setup////
    const root = path.join(__dirname, '../../lmm_angular_web/', 'dist')

    app.use(express.static(root));

    app.get('/*', function (req, res, next) {
        if (!req.path.includes('api')) {

            res.sendFile('index.html', { root });
        } else next();
    });


    //job api's //

    app.post(
        "/api/jobs/create",
        permit.context.builder,
        api.jobs.create
    );


    app.get(
        '/api/jobs/getJobs/:id',
        permit.context.builder,
        api.jobs.getJobs
    );

    app.get(
        '/api/jobs/getAllJobs',
        permit.context.builder,
        api.jobs.getAllJobs
    );

    app.get(
        '/api/jobs/recentPosts',
        permit.context.builder,
        api.jobs.recentPosts
    );

    app.put(
        "/api/jobs/uploadDocs/:id",
        permit.context.builder,
        api.jobs.uploadDocs
    );

    app.get(
        "/api/jobs/getPopularJobs",
        permit.context.builder,
        api.jobs.getPopularJobs
    );

    app.put(
        "/api/jobs/update/:id",
        permit.context.builder,
        api.jobs.update
    );

    app.delete(
        "/api/jobs/deleteJobs/:id",
        permit.context.builder,
        api.jobs.deleteJobs
    );

    app.post(
        "/api/jobs/jobsFilter",
        permit.context.builder,
        api.jobs.jobsFilter
    );

    app.get(
        "/api/jobs/getAllLocation",
        permit.context.builder,
        api.jobs.getAllLocation
    );
    app.get(
        "/api/jobs/search",
        permit.context.builder,
        api.jobs.search
    );




    // category routes

    app.post(
        "/api/category/create",
        permit.context.builder,
        api.category.create
    );


    app.get(
        "/api/category/getCategory/:id",
        permit.context.builder,
        api.category.getCategory
    );

    app.get(
        "/api/category/getAllCategory",
        permit.context.builder,
        api.category.getAllCategory
    );


    // job apply routes


    app.post(
        "/api/Apply/create",
        permit.context.builder,
        api.apply.create
    );

    app.get(
        "/api/Apply/listByUserId/:id",
        permit.context.builder,
        api.apply.listByUserId
    );

    app.get(
        "/api/Apply/getAllJobsApply",
        permit.context.builder,
        api.apply.getAllJobsApply
    );


    app.put(
        "/api/Apply/uploadDocs/:id",
        permit.context.builder,
        api.apply.uploadDocs
    );


    // wishlist routes

    app.post(
        "/api/wishlist/create",
        permit.context.builder,
        api.wishlist.create
    );


    app.get(
        "/api/wishlist/wishlistByUserId/:id",
        permit.context.builder,
        api.wishlist.wishlistByUserId
    );



    //     //User End Routes

    app.post(
        "/api/users/register",
        permit.context.builder,
        validator.users.create,
        api.users.create
    );

    app.post(
        "/api/users/login",
        permit.context.builder,
        validator.users.login,
        api.users.login
    );

    app.get(
        "/api/users/currentUser/:id",
        permit.context.validateToken,
        api.users.currentUser
    );

    app.put(
        "/api/users/changePassword/:id",
        permit.context.validateToken,
        //permit.context.builder,
        api.users.changePassword,
        // validator.users.changePassword,
    );
    // app.get(
    //     "/api/users/search",
    //     permit.context.validateToken,
    //     api.users.search
    // );

    app.post(
        "/api/users/forgotPassword",
        permit.context.builder,
        api.users.forgotPassword
    );

    app.get(
        "/api/users/getUsers",
        permit.context.validateToken,
        api.users.getUsers
    );

    app.get(
        "/api/users/getAllUsers",
        permit.context.validateToken,
        api.users.getAllUsers
    );

    // app.get(
    //     "/api/users/getDeletedUsers",
    //     permit.context.validateToken,
    //     api.users.getDeletedUsers
    // );

    // app.get(
    //     "/api/users/getAdminUsers",
    //     permit.context.validateToken,
    //     api.users.getAdminUsers
    // );

    // app.post(
    //     "/api/users/addAdmin",
    //     permit.context.validateToken,
    //     api.users.create
    // );

    // app.delete(
    //     "/api/users/delete/:id",
    //     permit.context.validateToken,
    //     api.users.deleteUser
    // );

    app.put(
        "/api/users/recoverUser/:id",
        permit.context.validateToken,
        api.users.recoverUser
    );

    app.put(
        "/api/users/update/:id",
        permit.context.validateToken,
        validator.users.update,
        api.users.update
    );

    // app.put(
    //     "/api/users/updateAdmin/:id",
    //     permit.context.validateToken,
    //     api.users.updateAdmin
    // );

    app.post(
        "/api/users/otpVerifyAndChangePassword",
        permit.context.validateToken,
        api.users.otpVerifyAndChangePassword
    );

    app.put(
        "/api/users/newPassword",
        permit.context.validateToken,
        api.users.newPassword
    );

    app.post(
        '/api/users/uploadImage',
        permit.context.builder,
        api.users.uploadImage
    );

    // app.put(
    //     "/api/users/assignRole",
    //     permit.context.validateToken,
    //     api.users.assignRole,
    // );

    // app.put(
    //     "/api/users/updateUserStatus/:id",
    //     permit.context.validateToken,
    //     api.users.updateUserStatus,
    // );

    app.post(
        "/api/users/socialLogin",
        permit.context.builder,
        api.users.socialLogin,
    );

    //// images  ////

    // app.post(
    //     '/api/images/uploadSingle',
    //     permit.context.builder,
    //     validator.images.upload,
    //     api.images.uploadSingle
    // );

    // app.post(
    //     '/api/images/uploadMultiple',
    //     permit.context.builder,
    //     validator.images.upload,
    //     api.images.uploadMultiple
    // );

    // app.put(
    //     '/api/images/remove',
    //     permit.context.validateToken,
    //     api.images.remove
    // );

    // app.get(
    //     "/api/images/getFile/:id",
    //     permit.context.validateToken,
    //     api.images.getFile
    // );

    // /* collection */

    // app.post(
    //     '/api/collections/create',
    //     permit.context.builder,
    //     api.collections.create
    // );

    // app.get(
    //     "/api/collections/getCollections",
    //     permit.context.validateToken,
    //     api.collections.getCollections
    // );

    // app.delete(
    //     "/api/collections/delete/:id",
    //     permit.context.validateToken,
    //     api.collections.deleteCollection
    // );
    app.get('/api/messages/getOldChat', permit.context.builder, api.message.getOldChat)






    log.end();
};

exports.configure = configure;