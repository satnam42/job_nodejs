// module.exports = [{
//     url: "/create",
//     post: {
//         summary: "create",
//         description: "create",
//         parameters: [{
//             in: "body",
//             name: "body",
//             description: "Add FAQ from there",
//             required: true,
//             schema: {
//                 $ref: "#/definitions/faqCreate"
//             }
//         }],
//         responses: {
//             default: {
//                 description: "Unexpected error",
//                 schema: {
//                     $ref: "#/definitions/Error"
//                 }
//             }
//         }
//     }
// },

// {
//     url: "/getFaqs",
//     get: {
//         summary: "Get All the faqs from there",
//         description: "This api will return all the latest published blogs",
//         parameters: [
//             {
//                 in: "header",
//                 name: "x-access-token",
//                 description: "token to access api",
//                 required: false,
//                 type: "string"
//             }
//         ],
//         responses: {
//             default: {
//                 description: "Unexpected error",
//                 schema: {
//                     $ref: "#/definitions/Error"
//                 }
//             }
//         }
//     }
// },

// {
//     url: "/getFaq/{id}",
//     get: {
//         summary: "getFaq",
//         description: "getFaq",
//         parameters: [
//             {
//                 in: "header",
//                 name: "x-access-token",
//                 description: "token to access api",
//                 required: false,
//                 type: "string"
//             },
//             {
//                 in: "path",
//                 type: "string",
//                 name: "id",
//                 description: "faq id",
//                 required: true
//             },],
//         responses: {
//             default: {
//                 description: "Unexpected error",
//                 schema: {
//                     $ref: "#/definitions/Error"
//                 }
//             }
//         }
//     }
// },

// {
//     url: "/delete/{id}",
//     delete: {
//         summary: "delete FAQ",
//         description: "delete FAQ",
//         parameters: [
//             {
//                 in: "header",
//                 name: "x-access-token",
//                 description: "token to access api",
//                 required: false,
//                 type: "string"
//             },
//             {
//                 in: "path",
//                 type: "string",
//                 name: "id",
//                 description: "faq id",
//                 required: true
//             },],
//         responses: {
//             default: {
//                 description: "Unexpected error",
//                 schema: {
//                     $ref: "#/definitions/Error"
//                 }
//             }
//         }
//     }
// },

// {
//     url: "/update/{id}",
//     put: {
//         summary: "update",
//         description: "update",
//         parameters: [
//             {
//                 in: "header",
//                 name: "x-access-token",
//                 description: "token to access api",
//                 required: false,
//                 type: "string"
//             },
//             {
//                 in: "path",
//                 type: "string",
//                 name: "id",
//                 description: "faq id",
//                 required: true
//             },
//             {
//                 in: "body",
//                 name: "body",
//                 description: "Model of user login",
//                 required: true,
//                 schema: {
//                     $ref: "#/definitions/updatefaq"
//                 }
//             }
//         ],
//         responses: {
//             default: {
//                 description: "Unexpected error",
//                 schema: {
//                     $ref: "#/definitions/Error"
//                 }
//             }
//         }
//     }
// }

// ];