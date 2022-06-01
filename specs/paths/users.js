module.exports = [//{
    //     url: "/updateUserStatus/{id}",
    //     put: {
    //         summary: "Update User Status",
    //         description: "Update User",
    //         parameters: [{
    //             in: "path",
    //             type: "string",
    //             name: "id",
    //             description: "User id",
    //             required: true
    //         },
    // {
    //     in: "body",
    //             name: "body",
    //             description: "Model of User",
    //             required: true,
    //             schema: {
    //                 $ref: "#/definitions/UserStatusUpdate"
    //             }
    //         }
    //         ],
    //         responses: {
    //             default: {
    //                 description: "Unexpected error",
    //                 schema: {
    //                     $ref: "#/definitions/Error"
    //                 }
    //             }
    //         }
    //     }
    // // }, 
    // {
    //     url: "/assignRole",
    //     put: {
    //         summary: "Assign Role to User",
    //         description: "Update User",
    //         parameters: [{
    //             in: "body",
    //             name: "body",
    //             description: "Model of User",
    //             required: true,
    //             schema: {
    //                 $ref: "#/definitions/assignRole"
    //             }
    //         }
    //         ],
    //         responses: {
    //             default: {
    //                 description: "Unexpected error",
    //                 schema: {
    //                     $ref: "#/definitions/Error"
    //                 }
    //             }
    //         }
    //     }
    // },
    {
        url: "/register",
        post: {
            summary: "create",
            description: "create",
            parameters: [{
                in: "body",
                name: "body",
                description: "Model of user creation",
                required: true,
                schema: {
                    $ref: "#/definitions/userCreate"
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
        url: "/login",
        post: {
            summary: "login",
            description: "login",
            parameters: [{
                in: "body",
                name: "body",
                description: "Model of user login",
                required: true,
                schema: {
                    $ref: "#/definitions/login"
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
        url: "/changePassword/{id}",
        put: {
            summary: "Change Password",
            description: "reset Password",
            parameters: [{
                in: "header",
                name: "x-access-token",
                description: "token to access api",
                required: false,
                type: "string"
            },
            {
                in: "path",
                name: "id",
                description: "user id",
                required: true,
                type: "string"
            },

            {
                in: "body",
                name: "body",
                description: "Model of changePassword user",
                required: true,
                schema: {
                    $ref: "#/definitions/resetPassword"
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
        url: "/otpVerifyAndChangePassword",
        post: {
            summary: "Verify otp and change Password",
            description: "erify otp and change Password",
            parameters: [{
                in: "header",
                name: "x-access-token",
                description: "token to access api",
                required: true,
                type: "string"
            },
            {
                in: "body",
                name: "body",
                description: "Model of verifyOtp",
                required: true,
                schema: {
                    $ref: "#/definitions/verifyOtp"
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
        url: "/newPassword",
        put: {
            summary: "Set New Password",
            description: "Set new Password",
            parameters: [{
                in: "header",
                name: "x-access-token",
                description: "token to access api",
                required: true,
                type: "string"
            },

            {
                in: "body",
                name: "body",
                description: "Model of newPassword",
                required: true,
                schema: {
                    $ref: "#/definitions/newPassword"
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
        url: "/forgotPassword",
        post: {
            summary: "forgotPassword",
            description: "forgotPassword",
            parameters: [{
                in: "body",
                name: "body",
                description: "Model of forgotPassword",
                required: true,
                schema: {
                    $ref: "#/definitions/forgotPassword"
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
    // {
    //     url: "/getUsers",
    //     get: {
    //         summary: "getUsers",
    //         description: "Just hit the api without pass any param",
    //         parameters: [
    //             {
    //                 in: "header",
    //                 name: "x-access-token",
    //                 description: "token to access api",
    //                 required: true,
    //                 type: "string"
    //             }, {
    //                 in: 'query',
    //                 type: "integer",
    //                 name: 'pageNo',
    //                 description: 'pageNo',
    //                 required: true,
    //             }, {
    //                 in: 'query',
    //                 type: "integer",
    //                 name: 'pageSize',
    //                 description: 'pageSize',
    //                 required: true,
    //             }
    //         ],
    //         responses: {
    //             default: {
    //                 description: "Unexpected error",
    //                 schema: {
    //                     $ref: "#/definitions/Error"
    //                 }
    //             }
    //         }
    //     }
    // },

    {
        url: "/getAllUsers",
        get: {
            summary: "getAllUsers",
            description: "Just hit the api without pass any param",
            parameters: [
                {
                    in: "header",
                    name: "x-access-token",
                    description: "token to access api",
                    required: true,
                    type: "string"
                },
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


    // {
    //     url: "/addAdmin",
    //     post: {
    //         summary: "addAdmin",
    //         description: "addAdmin",
    //         parameters: [{
    //             in: "body",
    //             name: "body",
    //             description: "admin model",
    //             required: true,
    //             schema: {
    //                 $ref: "#/definitions/adminCreate"
    //             }
    //         }, {
    //             in: "header",
    //             name: "x-access-token",
    //             description: "token to access api",
    //             required: true,
    //             type: "string"
    //         },],
    //         responses: {
    //             default: {
    //                 description: "Unexpected error",
    //                 schema: {
    //                     $ref: "#/definitions/Error"
    //                 }
    //             }
    //         }
    //     }
    // },

    // {
    //     url: "/getAdminUsers",
    //     get: {
    //         summary: "getAdminUsers",
    //         description: "Just hit the api without pass any param",
    //         parameters: [
    //             {
    //                 in: "header",
    //                 name: "x-access-token",
    //                 description: "token to access api",
    //                 required: true,
    //                 type: "string"
    // },
    // }, {
    //     in: 'query',
    //     type: "integer",
    //     name: 'pageNo',
    //     description: 'pageNo',
    //     required: true,
    // }, {
    //     in: 'query',
    //     type: "integer",
    //     name: 'pageSize',
    //     description: 'pageSize',
    //     required: true,
    // }
    //         ],
    //         responses: {
    //             default: {
    //                 description: "Unexpected error",
    //                 schema: {
    //                     $ref: "#/definitions/Error"
    //                 }
    //             }
    //         }
    //     }
    // },

    // {
    //     url: "/updateAdmin/{id}",
    //     put: {
    //         summary: "updateAdmin",
    //         description: "updateAdmin",
    //         parameters: [{
    //             in: "header",
    //             name: "x-access-token",
    //             description: "token to access api",
    //             required: true,
    //             type: "string"
    //         },
    //         {
    //             in: "path",
    //             type: "string",
    //             name: "id",
    //             description: "user id",
    //             required: true
    //         },
    //         {
    //             in: "body",
    //             name: "body",
    //             description: "Model of admin update",
    //             required: true,
    //             schema: {
    //                 $ref: "#/definitions/adminUpdate"
    //             }
    //         }
    //         ],
    //         responses: {
    //             default: {
    //                 description: "Unexpected error",
    //                 schema: {
    //                     $ref: "#/definitions/Error"
    //                 }
    //             }
    //         }
    //     }
    // },

    {
        url: "/search",
        get: {
            summary: "search",
            description: "search by title",
            parameters: [
                {
                    in: "header",
                    name: "x-access-token",
                    description: "token to access api",
                    required: true,
                    type: "string"
                }, {
                    in: 'query',
                    type: "string",
                    name: 'title',
                    description: 'title',
                    required: true,
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
        url: "/currentUser/{id}",
        get: {
            summary: "currentUser",
            description: "currentUser",
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
                    description: "user id",
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
    // {
    //     url: "/delete/{id}",
    //     delete: {
    //         summary: "delete",
    //         description: "delete",
    //         parameters: [
    //             {
    //                 in: "header",
    //                 name: "x-access-token",
    //                 description: "token to access api",
    //                 required: true,
    //                 type: "string"
    //             },
    //             {
    //                 in: "path",
    //                 type: "string",
    //                 name: "id",
    //                 description: "user id",
    //                 required: true
    //             },],
    //         responses: {
    //             default: {
    //                 description: "Unexpected error",
    //                 schema: {
    //                     $ref: "#/definitions/Error"
    //                 }
    //             }
    //         }
    //     }
    // },
    {
        url: "/recoverUser/{id}",
        put: {
            summary: "recover user",
            description: "recover user from delete",
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
                    description: "user id",
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
            summary: "update",
            description: "update",
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
                    description: "user id",
                    required: true
                },
                {
                    in: "body",
                    name: "body",
                    description: "Model of user login",
                    required: true,
                    schema: {
                        $ref: "#/definitions/updateUser"
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
        url: "/uploadImage",
        post: {
            summary: "uploadImage",
            description: "uploadImage",
            parameters: [{
                in: "formData",
                type: "string",
                name: "id",
                description: "User Id",
                required: true
            },
            {
                in: "formData",
                name: "file",
                type: "file",
                description: "The profile image to upload.",
                required: true
            },
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
        url: "/socialLogin",
        post: {
            summary: "Login user with socialLogin",
            description: "user login into system with socialLogin and get its token to access apis",
            parameters: [{
                in: "body",
                name: "body",
                description: "Model of login user with socialLogin",
                required: true,
                schema: {
                    $ref: "#/definitions/socialLogin"
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
];