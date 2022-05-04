module.exports = [
    {
        url: "/create",
        post: {
            summary: "create",
            description: "create",
            parameters: [{
                in: "body",
                name: "body",
                description: "Model of job apply creation",
                required: true,
                schema: {
                    $ref: "#/definitions/Apply"
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
        },
    },

    {
        url: "/getJobsApply/{id}",
        get: {
            summary: "get job apply",
            description: "get job apply by id",
            parameters: [
                // {
                //     in: "header",
                //     name: "x-access-token",
                //     description: "token to access api",
                //     required: false,
                //     type: "string"
                // }
                {
                    in: "path",
                    type: "string",
                    name: "id",
                    description: "user id",
                    required: true
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
        url: "/getAllJobsApply",
        get: {
            summary: "getAllJobsApply",
            description: "Just hit the api without pass any param",
            parameters: [
                // {
                //     in: "header",
                //     name: "x-access-token",
                //     description: "token to access api",
                //     required: true,
                //     type: "string"
                // },
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
        url: "/uploadDocs/{id}",
        put: {
            summary: "uploadDocs",
            description: "uploadDocs",
            parameters: [
            {
                in: "formData",
                name: "file",
                type: "file",
                description: " upload docs",
                required: true
            },
            {
                in: "path",
                type: "string",
                name: "id",
                description: "apply job id",
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



]