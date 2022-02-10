module.exports = [{
    name: "updateUser",
    properties: {
        firstName: {
            type: "string",
        },
        lastName: {
            type: "string",
        },
        dob: {
            type: "string",
        },
        phoneNumber: {
            type: "string",
        },
        email: {
            type: "string",
        },
        status: {
            type: "string",
            default: "active",
            enum: ["active", "inactive"]
        },
        gender: {
            type: "string",
        },
        notes: {
            type: "string",
        },
        incomeRange: {
            type: "string",
        },
        address: {
            type: "string",
        },
        streetNo: {
            type: "string",
        },
        streetName: {
            type: "string",
        },
        city: {
            type: "string",
        },
        state: {
            type: "string",
        },
        country: {
            type: "string",
        },
        zipCode: {
            type: "string",
        },
        deviceToken: {
            type: "string",
        },
        // prefix: {
        //     type: "string",
        // },
    }
}];