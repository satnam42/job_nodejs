module.exports = [{
    url: "/create",
    post: {
        summary: "create",
        description: "create",
        parameters: [{
            in: "body",
            name: "body",
            description: "wishlist create",
            required: true,
            schema: {
                $ref: "#/definitions/wishlistCreate"
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
    url: "/wishlistByUserId/{id}",
    get: {
        summary: "wishlist By UserId",
        description: "wishlist By UserId",
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
]