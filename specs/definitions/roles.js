module.exports = [{
    name: "roleCreate",
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
            type: "string", default: 'Active'
        },
        // permissions: {
        //     type: 'array',
        //     items: {
        //         type: 'array',
        //         properties: {
        //             permissionId: { type: "string" }
        //         }
        //     }
        // }
    },
}
];