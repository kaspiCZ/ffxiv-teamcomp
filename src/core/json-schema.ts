import { jobs } from "./data"

const jobEnum = Object.values(jobs).flat()

export default {
  type: "array",
  items: {
    type: "object",
    properties: {
      name: {
        type: "string",
      },
      jobs: {
        type: "array",
        items: {
          type: "object",
          properties: {
            job: {
              type: "string",
              enum: jobEnum,
            },
            weight: {
              type: "number",
              multipleOf: 0.1,
              minimum: 0,
              maximum: 1,
            },
          },
        },
      },
      available: {
        type: "boolean",
      },
    },
  },
}
