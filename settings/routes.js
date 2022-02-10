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

    //role api's //

    app.post(
        "/api/roles/adminlogin",
        permit.context.validateToken,
        // validator.users.adminlogin,
        api.roles.adminlogin
    );

    app.post(
        "/api/roles/create",
        permit.context.builder,
        // validator.roles.create,
        api.roles.create
    );

    app.post(
        "/api/roles/createPermissions",
        permit.context.builder,
        // validator.roles.create,
        api.roles.createPermissions
    );

    app.get(
        "/api/roles/getAll",
        permit.context.validateToken,
        api.roles.getRoles
    );

    app.get(
        "/api/roles/getAllPermissions",
        permit.context.validateToken,
        api.roles.getAllPermissions
    );

    app.put(
        "/api/roles/updateRole/:id",
        permit.context.validateToken,
        api.roles.updateRole,
    );

    app.put(
        "/api/roles/updatePermission/:id",
        permit.context.validateToken,
        api.roles.updatePermission,
    );

    app.delete(
        "/api/roles/deleteRole/:id",
        permit.context.validateToken,
        api.roles.deleteRole
    );

    app.delete(
        "/api/roles/deletePermission/:id",
        permit.context.validateToken,
        api.roles.deletePermission
    );

    app.post(
        "/api/roles/searchRole",
        permit.context.validateToken,
        api.roles.searchRole
    );

    app.put(
        "/api/roles/updateRoleStatus/:id",
        permit.context.validateToken,
        api.roles.updateRoleStatus,
    );

    app.put(
        "/api/roles/updatePermissionStatus/:id",
        permit.context.validateToken,
        api.roles.updatePermissionStatus,
    );

    //User End Routes

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
    app.get(
        "/api/users/search",
        permit.context.validateToken,
        api.users.search
    );

    app.post(
        "/api/users/forgotPassword",
        permit.context.validateToken,
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

    app.get(
        "/api/users/getDeletedUsers",
        permit.context.validateToken,
        api.users.getDeletedUsers
    );

    app.get(
        "/api/users/getAdminUsers",
        permit.context.validateToken,
        api.users.getAdminUsers
    );

    app.post(
        "/api/users/addAdmin",
        permit.context.validateToken,
        api.users.create
    );

    app.delete(
        "/api/users/delete/:id",
        permit.context.validateToken,
        api.users.deleteUser
    );

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

    app.put(
        "/api/users/updateAdmin/:id",
        permit.context.validateToken,
        api.users.updateAdmin
    );

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

    app.put(
        "/api/users/assignRole",
        permit.context.validateToken,
        api.users.assignRole,
    );

    app.put(
        "/api/users/updateUserStatus/:id",
        permit.context.validateToken,
        api.users.updateUserStatus,
    );

    app.post(
        "/api/users/socialLogin",
        permit.context.validateToken,
        api.users.socialLogin,
    );

    //// images  ////

    app.post(
        '/api/images/uploadSingle',
        permit.context.builder,
        validator.images.upload,
        api.images.uploadSingle
    );

    app.post(
        '/api/images/uploadMultiple',
        permit.context.builder,
        validator.images.upload,
        api.images.uploadMultiple
    );

    app.put(
        '/api/images/remove',
        permit.context.validateToken,
        api.images.remove
    );

    app.get(
        "/api/images/getFile/:id",
        permit.context.validateToken,
        api.images.getFile
    );

    /* collection */

    app.post(
        '/api/collections/create',
        permit.context.builder,
        api.collections.create
    );

    app.get(
        "/api/collections/getCollections",
        permit.context.validateToken,
        api.collections.getCollections
    );

    app.delete(
        "/api/collections/delete/:id",
        permit.context.validateToken,
        api.collections.deleteCollection
    );

    /* Blogs */

    app.post(
        '/api/blogs/create',
        permit.context.builder,
        api.blogs.create
    );

    app.get(
        "/api/blogs/getBlogs",
        permit.context.validateToken,
        api.blogs.getBlogs
    );

    app.get(
        "/api/blogs/publishedBlogs",
        permit.context.builder,
        api.blogs.publishedBlogs
    );

    app.get(
        "/api/blogs/getBlog/:id",
        permit.context.validateToken,
        api.blogs.getBlog
    );

    app.delete(
        "/api/blogs/delete/:id",
        permit.context.validateToken,
        api.blogs.deleteBlog
    );

    app.put(
        "/api/blogs/update/:id",
        permit.context.validateToken,
        api.blogs.update
    );

    app.post(
        '/api/blogs/setAboutUs',
        permit.context.builder,
        api.blogs.setAboutUs
    );

    app.put(
        "/api/blogs/blogStatus/:id",
        permit.context.validateToken,
        api.blogs.blogStatus
    );

    /* FAQS */

    app.post(
        '/api/faqs/create',
        permit.context.builder,
        api.faqs.create
    );

    app.get(
        "/api/faqs/getFaqs",
        permit.context.builder,
        api.faqs.getFaqs
    );

    app.get(
        "/api/faqs/getFaq/:id",
        permit.context.builder,
        api.faqs.getFaq
    );

    app.delete(
        "/api/faqs/delete/:id",
        permit.context.builder,
        api.faqs.deleteFaq
    );

    app.put(
        "/api/faqs/update/:id",
        permit.context.builder,
        api.faqs.update
    );


    /* Notifications */

    app.post(
        '/api/notifications/create',
        permit.context.builder,
        api.notifications.create
    );

    app.get(
        "/api/notifications/getNotifications",
        permit.context.validateToken,
        api.notifications.getNotifications
    );

    app.delete(
        "/api/notifications/delete/:id",
        permit.context.builder,
        api.notifications.deleteNotification
    );

    app.put(
        "/api/notifications/update/:id",
        permit.context.builder,
        api.notifications.update
    );

    app.post(
        '/api/notifications/fireNotifications',
        permit.context.builder,
        api.notifications.fireNotifications
    );

    app.get(
        "/api/notifications/getAllNotifications",
        permit.context.validateToken,
        api.notifications.getAllNotifications
    );

    app.get(
        "/api/notifications/myNotifications/:id",
        permit.context.validateToken,
        api.notifications.myNotifications
    );

    /* templates */

    /* collection */

    // app.post(
    //     '/api/templates/create',
    //     permit.context.builder,
    //     api.templates.create
    // );

    // app.put(
    //     "/api/templates/update/:id",
    //     permit.context.builder,
    //     api.templates.update
    // );

    // app.get(
    //     "/api/templates/getList",
    //     permit.context.builder,
    //     api.templates.getList
    // );

    // app.delete(
    //     "/api/templates/deleteTemplate/:id",
    //     permit.context.builder,
    //     // permit.context.requiresToken,
    //     api.templates.deleteTemplate
    // );

    ///contacts
    // app.post("/api/contacts/create/upload",
    //     permit.context.builder,
    //     api.contacts.create
    // )
    // app.post("/api/contacts/create/custom",
    //     permit.context.builder,
    //     api.contacts.customCreate
    // )
    // app.get("/api/contacts/get",
    //     permit.context.builder,
    //     api.contacts.getContacts
    // )
    // app.put("/api/contacts/update/:id",
    //     permit.context.builder,
    //     api.contacts.update
    // )
    // app.delete("/api/contacts/delete/:id",
    //     permit.context.builder,
    //     api.contacts.remove
    // )

    log.end();
};

exports.configure = configure;