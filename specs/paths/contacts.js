// module.exports = [{
//     url: "/create/upload",
//     post: {
//         summary: "create",
//         description: "create",
//         parameters: [
//              {
//                 in:"formData",
//                 type: "file",
//                 name: "excel",
//                 description: "Please upload file ",
//                 required: false
//             },
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
//     url: "/create/custom",
//     post: {
//         summary: "create",
//         description: "create",
//         parameters: [
           
//             {
//                 in: "body",
//                 name: "body",
//                 description: "Model of contact creation",
//                 required: false,
//                 schema: {
//                     $ref: "#/definitions/contactCreate"
//                 }
//             },
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
//                 description: "contact id",
//                 required: true
//             },{
//             in: "body",
//             name: "body",
//             description: "Model of contacts update",
//             required: true,
//             schema: {
//                 $ref: "#/definitions/contactUpdate"
//             }
//         }
        
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
//     url: "/get",
//     get: {
//         summary: "get contacts",
//         description: "get contacts",
//         parameters: [
//             {
//                 in: "header",
//                 name: "x-access-token",
//                 description: "token to access api",
//                 required: false,
//                 type: "string"
//             },
//             // {
//             //     in: "path",
//             //     type: "string",
//             //     name: "userId",
//             //     description: "user id",
//             //     required: true
//             // },
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
//         summary: "delete",
//         description: "delete",
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
//                 description: "contact id",
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
// ]