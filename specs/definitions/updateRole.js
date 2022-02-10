module.exports = [{
    name: "roleUpdate",
    properties: {
        name: {
            type: "string"
        },
        description: {
            type: "string"
        },
        roleType: {
            type: "string"
        },
        status: {
            type: "string", default: 'active'
        },
        permissions: {
            type: 'array',
            items: {
                type: 'array',
                properties: {
                    permissionId: { type: "string" }
                }
            }
        }
    },
}
];