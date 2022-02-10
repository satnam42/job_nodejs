module.exports = [
    {
        url: "/remove/",
        put: {
            summary: "remove",
            description: "removeImage",
            parameters: [
                {
                    in: "query",
                    type: "string",
                    name: "id",
                    required: true,
                },
                {
                    in: "query",
                    type: "string",
                    name: "imageId",
                    required: true,
                },
                {
                    in: "query",
                    type: "string",
                    name: "image",
                    required: true,
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
        url: "/uploadSingle",
        post: {
            summary: "uploadSingle file",
            description: "uploadSingle file",
            parameters: [{ in: "formData",
                    type: "string",
                    name: "id",
                    description: "User Id",
                    required: true
                },
                { in: "formData",
                    name: "file",
                    type: "file",
                    description: "The file to upload.",
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
        url: "/uploadMultiple",
        post: {
            summary: "uploadMultiple file",
            description: "uploadMultiple file",
            parameters: [{ in: "formData",
                    type: "string",
                    name: "id",
                    description: "User Id",
                    required: true
                },
                { in: "formData",
                    name: "file",
                    type: "file",
                    description: "The file to upload.",
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
        url: "/getFile/{id}",
        get: {
            summary: "getFile",
            description: "getFile",
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

]