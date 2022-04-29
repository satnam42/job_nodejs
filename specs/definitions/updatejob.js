module.exports = [{
    name: "updatejob",
    properties: {
        title: { type: "string" },
        category: { type: "string" },
        priceFrom: { type: "number" },
        priceTo: { type: "number" },
        location: { type: "string" },
        workers: { type: "number" },
        jobType: { type: "string" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        email: { type: "string" },
        country: { type: "string" },
        scopeOfWork: { type: "string" },

        planOfAction: { type: "string" },
        constructionDocumentation: { type: "string" },
        company: {
            properties: {
                emailId: { type: 'string' },
                phoneNumber: { type: 'string' },
                address: { type: 'string' },
            },
        }
    },
}];