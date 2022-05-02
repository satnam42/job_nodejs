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
                    $ref: "#/definitions/jobApply"
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

]