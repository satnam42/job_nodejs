module.exports = [
  {
    url: "/create",
    post: {
      summary: "create",
      description: "create",
      parameters: [
        {
          in: "body",
          name: "body",
          description: "Model of job creation",
          required: true,
          schema: {
            $ref: "#/definitions/jobcreate",
          },
        },
      ],
      responses: {
        default: {
          description: "Unexpected error",
          schema: {
            $ref: "#/definitions/Error",
          },
        },
      },
    },
  },
  {
    url: "/getJobs/{id}",
    get: {
      summary: "get job",
      description: "get job by id",
      parameters: [
        // {
        //     in: "header",
        //     name: "x-access-token",
        //     description: "token to access api",
        //     required: false,
        //     type: "string"
        // }
        {
          in: "path",
          type: "string",
          name: "id",
          description: "job id",
          required: true,
        },
      ],
      responses: {
        default: {
          description: "Unexpected error",
          schema: {
            $ref: "#/definitions/Error",
          },
        },
      },
    },
  },
  {
    url: "/getJobsByuserId/{id}",
    get: {
      summary: "get job",
      description: "get job by user id",
      parameters: [
        // {
        //     in: "header",
        //     name: "x-access-token",
        //     description: "token to access api",
        //     required: false,
        //     type: "string"
        // }
        {
          in: "path",
          type: "string",
          name: "id",
          description: "user id",
          required: true,
        },
      ],
      responses: {
        default: {
          description: "Unexpected error",
          schema: {
            $ref: "#/definitions/Error",
          },
        },
      },
    },
  },

  {
    url: "/getAllJobs",
    get: {
      summary: "get all job",
      description: "get all job ",
      parameters: [
        // {
        //                     in: "path",
        //                     type: "string",
        //                     name: "all jobs",
        //                     description: "all jobs",
        //                     required: true
        // }
      ],
      responses: {
        default: {
          description: "Unexpected error",
          schema: {
            $ref: "#/definitions/Error",
          },
        },
      },
    },
  },

  {
    url: "/recentPosts",
    get: {
      summary: "recent posts",
      description: "recent jobs",
      parameters: [
        // {
        //                     in: "path",
        //                     type: "string",
        //                     name: "all jobs",
        //                     description: "all jobs",
        //                     required: true
        // }
      ],
      responses: {
        default: {
          description: "Unexpected error",
          schema: {
            $ref: "#/definitions/Error",
          },
        },
      },
    },
  },

  {
    url: "/uploadDocs/{id}",
    put: {
      summary: "uploadDocs",
      description: "uploadDocs",
      parameters: [
        {
          in: "formData",
          name: "file",
          type: "file",
          description: " upload docs",
          required: true,
        },
        {
          in: "path",
          type: "string",
          name: "id",
          description: "job id",
          required: true,
        },
      ],
      responses: {
        default: {
          description: "Unexpected error",
          schema: {
            $ref: "#/definitions/Error",
          },
        },
      },
    },
  },

  {
    url: "/getpopularjobs",
    get: {
      summary: "popular Jobs",
      description: "popular Jobs",
      parameters: [
        // {
        //                     in: "path",
        //                     type: "string",
        //                     name: "all jobs",
        //                     description: "all jobs",
        //                     required: true
        // }
      ],
      responses: {
        default: {
          description: "Unexpected error",
          schema: {
            $ref: "#/definitions/Error",
          },
        },
      },
    },
  },

  {
    url: "/update/{id}",
    put: {
      summary: "update",
      description: "update",
      parameters: [
        // {
        //     in: "header",
        //     name: "x-access-token",
        //     description: "token to access api",
        //     required: false,
        //     type: "string"
        // },
        {
          in: "path",
          type: "string",
          name: "id",
          description: "job id",
          required: true,
        },
        {
          in: "body",
          name: "body",
          description: "Model of job ",
          required: true,
          schema: {
            $ref: "#/definitions/updatejob",
          },
        },
      ],
      responses: {
        default: {
          description: "Unexpected error",
          schema: {
            $ref: "#/definitions/Error",
          },
        },
      },
    },
  },

  {
    url: "/deleteJobs/{id}",
    delete: {
      summary: "delete job",
      description: "delete job",
      parameters: [
        // {
        //     in: "header",
        //     name: "x-access-token",
        //     description: "token to access api",
        //     required: false,
        //     type: "string"
        // },
        {
          in: "path",
          type: "string",
          name: "id",
          description: "job id",
          required: true,
        },
      ],
      responses: {
        default: {
          description: "Unexpected error",
          schema: {
            $ref: "#/definitions/Error",
          },
        },
      },
    },
  },
  {
    url: "/search",
    get: {
      summary: "search",
      description: "search by title",
      parameters: [
        {
          in: "query",
          type: "string",
          name: "title",
          description: "title",
          required: true,
        },
      ],
      responses: {
        default: {
          description: "Unexpected error",
          schema: {
            $ref: "#/definitions/Error",
          },
        },
      },
    },
  },
  {
    url: "/jobsFilter",
    post: {
      summary: "filter",
      description: "filter",
      parameters: [
        {
          in: "query",
          name: "categoryId",
          required: false,
        },
        {
          in: "query",
          name: "jobType",
          required: false,
        },
        {
          in: "query",
          name: "location",
          required: false,
        },
        {
          in: "query",
          name: "priceFrom",
          required: false,
        },
        {
          in: "query",
          name: "priceTo",
          required: false,
        },
      ],

      responses: {
        default: {
          description: "Unexpected error",
          schema: {
            $ref: "#/definitions/Error",
          },
        },
      },
    },
  },

  {
    url: "/getAllLocation",
    get: {
      summary: "get all location ",
      description: "get all location",
      parameters: [
        // {
        //                     in: "path",
        //                     type: "string",
        //                     name: "all jobs",
        //                     description: "all jobs",
        //                     required: true
        // }
      ],
      responses: {
        default: {
          description: "Unexpected error",
          schema: {
            $ref: "#/definitions/Error",
          },
        },
      },
    },
  },
];
