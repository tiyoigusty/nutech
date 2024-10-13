const swaggerAutogen = require("swagger-autogen")({
  openapi: "3.0.0",
  autoHeaders: false,
});

const doc = {
  info: {
    title: "Nutech Test API Docs",
    description: "Welcome to Nutech Test API",
  },
  server: [{ url: "http://localhost:3000" }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    "@schemas": {
      RegisterDTO: {
        type: "object",
        properties: {
          firstname: { type: "string" },
          lastname: { type: "string" },
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 8 },
        },
        required: ["firstname", "lastname", "email", "password"],
      },
      LoginDTO: {
        type: "object",
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 8 },
        },
        required: ["email", "password"],
      },
      UserDTO: {
        type: "object",
        properties: {
          firstname: { type: "string" },
          lastname: { type: "string" },
        },
        required: ["firstname", "lastname"],
      },
      UserImageDTO: {
        type: "object",
        properties: {
          image: { type: "file" },
        },
        required: ["image"],
      },
      TopUpDTO: {
        type: "object",
        properties: {
          top_up_amount: { type: "number", min: 1 },
        },
        required: ["top_up_amount"],
      },
      PaymentDTO: {
        type: "object",
        properties: {
          service_code: { type: "string" },
        },
        required: ["service_code"],
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = ["./src/index.ts"];

swaggerAutogen(outputFile, routes, doc);
