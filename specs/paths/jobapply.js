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
]