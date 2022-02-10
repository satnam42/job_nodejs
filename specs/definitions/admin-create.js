module.exports = [

    {
        name: "adminCreate",
        properties: {
            firstName: {
                type:"string"
            },
            email:{ 
                type: "string"
            },
            status: {
                type: "string",
                enum: ['active', 'inactive']
            },
            role: {
                type: "string",
                enum: ['admin', 'superAdmin']
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
];