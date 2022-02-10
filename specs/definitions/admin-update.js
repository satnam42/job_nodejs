module.exports = [
    {
        name: "adminUpdate",
        properties: {
            firstName: {
                type: "string"
            },
            lastName: {
                type: "string"
            },
            status: {
                type: "string",
                enum: ['active', 'inactive']
            },
            role: {
                type: "string",
                enum: ['admin', 'superAdmin', 'accountant']
            },
            password: {
                type: "string"
            },
            nav: {
                type: 'array',
                items: {
                    properties: {
                        name: { type: 'string' },
                        path: { type: 'string' },
                    },
                },
            },
            permissions: {
                properties: {
                    read: { type: "boolean", default: "false" },
                    write: { type: "boolean", default: "false" },
                    publish: { type: "boolean", default: "false" },
                },
            }
        },
    }
]