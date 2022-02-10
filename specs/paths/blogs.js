// module.exports = [{
//     url: "/create",
//     post: {
//         summary: "create",
//         description: "create",
//         parameters: [{
//             in: "body",
//             name: "body",
//             description: "Add Blog from there",
//             required: true,
//             schema: {
//                 $ref: "#/definitions/blogCreate"
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
//     url: "/getBlogs",
//     get: {
//         summary: "Get All the blogs from there",
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
//     url: "/publishedBlogs",
//     get: {
//         summary: "Get All the published blogs from there",
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
//     url: "/getBlog/{id}",
//     get: {
//         summary: "getBlog",
//         description: "getBlog",
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
//                 description: "blog id",
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
//         summary: "delete blog",
//         description: "delete blog",
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
//                 description: "blog id",
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
//                 description: "blog id",
//                 required: true
//             },
//             {
//                 in: "body",
//                 name: "body",
//                 description: "Model of user login",
//                 required: true,
//                 schema: {
//                     $ref: "#/definitions/updateblog"
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
//     url: "/blogStatus/{id}",
//     put: {
//         summary: "Update Permission",
//         description: "Update Permission",
//         parameters: [{ in: "path",
//                 type: "string",
//                 name: "id",
//                 description: "Permission id",
//                 required: true
//             },
//             { in: "body",
//                 name: "body",
//                 description: "Model of Blog Status Update",
//                 required: true,
//                 schema: {
//                     $ref: "#/definitions/blogStatusUpdate"
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

// ];