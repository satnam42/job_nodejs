module.exports = [{
    name: "permissionUpdate",
    properties: {
        name: {
            type: "string"
        },
        description: {
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
];