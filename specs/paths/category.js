module.exports = [{
        url: "/create",
        post: {
            summary: "create",
            description: "create",
            parameters: [{
                in: "body",
                name: "body",
                description: "category create",
                required: true,
                schema: {
                    $ref: "#/definitions/categoryCreate"
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
        url: "/getCategory/{id}",
        get: {
            summary: "get category",
            description: "get category by id",
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
                                    description: "category id",
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
    url: "/getAllCategory",
    get: {
        summary: "get all category",
        description: "get all category ",
        parameters: [
            // {
            //                     in: "path",
            //                     type: "string",
            //                     name: "all jobs",
            //                     description: "all jobs",
            //                     required: true
            // }
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