module.exports = [{
    name: "permissionCreate",
    properties: {
        name: {
            type: "string"
        },
        description: {
            type: "string"
        },
        status: {
            type: "string", default: 'Active'
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
];