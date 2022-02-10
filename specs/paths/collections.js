// module.exports = [{
//     url: "/create",
//     post: {
//         summary: "create",
//         description: "create",
//         parameters: [{
//             in: "body",
//             name: "body",
//             description: "Add Collection from there",
//             required: true,
//             schema: {
//                 $ref: "#/definitions/collectionCreate"
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
//     url: "/getCollections",
//     get: {
//         summary: "Get All the Collections from there",
//         description: "This api will return all the latest published Collections",
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
//     url: "/delete/{id}",
//     delete: {
//         summary: "delete collection",
//         description: "delete collection",
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
//                 description: "collection id",
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

// ];