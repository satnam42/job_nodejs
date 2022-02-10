module.exports = [{
    url: "/createPermissions",
    post: {
        summary: "Create Permissions",
        description: "Create Permissions",
        parameters: [
            {
                in: "body",
                name: "body",
                description: "Model of role creation",
                required: true,
                schema: {
                    $ref: "#/definitions/permissionCreate"
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
    url: "/getAllPermissions",
    get: {
        summary: "getAllPermissions",
        description: "Permissions list",
        parameters: [{
            in: "header",
            name: "x-access-token",
            description: "token to access api",
            required: true,
            type: "string"
        }, {
            in: 'query',
            type: "integer",
            name: 'pageNo',
            description: 'pageNo',
            required: true,
        }, {
            in: 'query',
            type: "integer",
            name: 'pageSize',
            description: 'pageSize',
            required: true,
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
    url: "/create",
    post: {
        summary: "create",
        description: "create",
        parameters: [
            {
                in: "body",
                name: "body",
                description: "Model of role creation",
                required: true,
                schema: {
                    $ref: "#/definitions/roleCreate"
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
    url: "/getAll",
    get: {
        summary: "getAll",
        description: "role list",
        parameters: [{
            in: "header",
            name: "x-access-token",
            description: "token to access api",
            required: true,
            type: "string"
        }, {
            in: 'query',
            type: "integer",
            name: 'pageNo',
            description: 'pageNo',
            required: true,
        }, {
            in: 'query',
            type: "integer",
            name: 'pageSize',
            description: 'pageSize',
            required: true,
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
    url: "/deleteRole/{id}",
    delete: {
        summary: "delete",
        description: "delete",
        parameters: [
            {
                in: "header",
                name: "x-access-token",
                description: "token to access api",
                required: true,
                type: "string"
            },
            {
                in: "path",
                type: "string",
                name: "id",
                description: "role id",
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
    url: "/deletePermission/{id}",
    delete: {
        summary: "delete",
        description: "delete",
        parameters: [
            {
                in: "header",
                name: "x-access-token",
                description: "token to access api",
                required: true,
                type: "string"
            },
            {
                in: "path",
                type: "string",
                name: "id",
                description: "Permission id",
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
    url: "/updateRole/{id}",
    put: {
        summary: "Update Role",
        description: "Update Role",
        parameters: [{ in: "path",
                type: "string",
                name: "id",
                description: "role id",
                required: true
            },
            { in: "body",
                name: "body",
                description: "Model of Role",
                required: true,
                schema: {
                    $ref: "#/definitions/roleUpdate"
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
    url: "/updatePermission/{id}",
    put: {
        summary: "Update Permission",
        description: "Update Permission",
        parameters: [{ in: "path",
                type: "string",
                name: "id",
                description: "Permission id",
                required: true
            },
            { in: "body",
                name: "body",
                description: "Model of Permission Update",
                required: true,
                schema: {
                    $ref: "#/definitions/permissionUpdate"
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
    url: "/updateRoleStatus/{id}",
    put: {
        summary: "Update Role Status",
        description: "Update Role",
        parameters: [{ in: "path",
                type: "string",
                name: "id",
                description: "role id",
                required: true
            },
            { in: "body",
                name: "body",
                description: "Model of Role",
                required: true,
                schema: {
                    $ref: "#/definitions/roleStatusUpdate"
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
    url: "/updatePermissionStatus/{id}",
    put: {
        summary: "Update Permission Status",
        description: "Update Permission Status",
        parameters: [{ in: "path",
                type: "string",
                name: "id",
                description: "Permission id",
                required: true
            },
            { in: "body",
                name: "body",
                description: "Model of Role",
                required: true,
                schema: {
                    $ref: "#/definitions/permissionStatusUpdate"
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
    url: '/searchRole',
    post: {
        summary: 'Search Role',
        description: 'Search Role',
        parameters: [{
                in: "header",
                name: "x-access-token",
                description: "token to access api",
                required: false,
                type: "string"
            },
            { in: 'body',
            name: 'body',
            description: 'Model of search',
            required: true,
            schema: {
                $ref: '#/definitions/searchRole'
            }
        }],
        responses: {
            default: {
                description: 'Unexpected error',
                schema: {
                    $ref: '#/definitions/Error'
                }
            }
        }
    }
},
];