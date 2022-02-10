// module.exports = [{
//     url: "/create",
//     post: {
//         summary: "create",
//         description: "create",
//         parameters: [{
//             in: "body",
//             name: "body",
//             description: "Add Template from there",
//             required: true,
//             schema: {
//                 $ref: "#/definitions/templateCreate"
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
//     url: "/getList",
//     get: {
//         summary: "Get All the Templates from there",
//         description: "This api will return all the latest Templates",
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
//                 description: "template id",
//                 required: true
//             },
//             {
//                 in: "body",
//                 name: "body",
//                 description: "Model of Template Update",
//                 required: true,
//                 schema: {
//                     $ref: "#/definitions/updateTemplate"
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
// },
// {
//     url: "/deleteTemplate/{id}",
//     delete: {
//         summary: "Delete",
//         description: "Delete template",
//         parameters: [
//             {
//                 in: "path",
//                 name: "id",
//                 description: "template id",
//                 required: true,
//                 type: "string"
//             },
//             // {
//             //     in: "header",
//             //     name: "x-access-token",
//             //     description: "token to access api",
//             //     required: true,
//             //     type: "string"
//             // }
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