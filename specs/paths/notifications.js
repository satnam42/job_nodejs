module.exports = [{
    url: "/create",
    post: {
        summary: "create",
        description: "create",
        parameters: [{
            in: "body",
            name: "body",
            description: "Add Notification from there",
            required: true,
            schema: {
                $ref: "#/definitions/notiCreate"
            }
        }],
        responses: {
            default: {
                description: "Unexpected error",
                schema: {
                    $ref: "#/definitions/Error"
                }
            }
        }
    }
},

{
    url: "/fireNotifications",
    post: {
        summary: "notiFire",
        description: "notiFire",
        parameters: [{
            in: "body",
            name: "body",
            description: "Add Notification from there",
            required: true,
            schema: {
                $ref: "#/definitions/notiFire"
            }
        }],
        responses: {
            default: {
                description: "Unexpected error",
                schema: {
                    $ref: "#/definitions/Error"
                }
            }
        }
    }
},

{
    url: "/getNotifications",
    get: {
        summary: "Get All the Notifications from there",
        description: "This api will return all the latest published blogs",
        parameters: [
            {
                in: "header",
                name: "x-access-token",
                description: "token to access api",
                required: true,
                type: "string"
            }
        ],
        responses: {
            default: {
                description: "Unexpected error",
                schema: {
                    $ref: "#/definitions/Error"
                }
            }
        }
    }
},

{
    url: "/delete/{id}",
    delete: {
        summary: "delete Notification",
        description: "delete Notification",
        parameters: [
            {
                in: "header",
                name: "x-access-token",
                description: "token to access api",
                required: false,
                type: "string"
            },
            {
                in: "path",
                type: "string",
                name: "id",
                description: "Notification id",
                required: true
            },],
        responses: {
            default: {
                description: "Unexpected error",
                schema: {
                    $ref: "#/definitions/Error"
                }
            }
        }
    }
},

{
    url: "/update/{id}",
    put: {
        summary: "update notification",
        description: "update notification",
        parameters: [
            {
                in: "header",
                name: "x-access-token",
                description: "token to access api",
                required: false,
                type: "string"
            },
            {
                in: "path",
                type: "string",
                name: "id",
                description: "notification id",
                required: true
            },
            {
                in: "body",
                name: "body",
                description: "Model of update notification",
                required: true,
                schema: {
                    $ref: "#/definitions/updateNoti"
                }
            }
        ],
        responses: {
            default: {
                description: "Unexpected error",
                schema: {
                    $ref: "#/definitions/Error"
                }
            }
        }
    }
},

{
    url: "/myNotifications/{id}",
    get: {
        summary: "My Notification",
        description: "My Notification",
        parameters: [
            {
                in: "header",
                name: "x-access-token",
                description: "token to access api",
                required: false,
                type: "string"
            },
            {
                in: "path",
                type: "string",
                name: "id",
                description: "User id",
                required: true
            },],
        responses: {
            default: {
                description: "Unexpected error",
                schema: {
                    $ref: "#/definitions/Error"
                }
            }
        }
    }
},

{
    url: "/getAllNotifications",
    get: {
        summary: "Get All the Notifications from there",
        description: "This api will return all the latest published blogs",
        parameters: [
            {
                in: "header",
                name: "x-access-token",
                description: "token to access api",
                required: true,
                type: "string"
            }
        ],
        responses: {
            default: {
                description: "Unexpected error",
                schema: {
                    $ref: "#/definitions/Error"
                }
            }
        }
    }
},

];