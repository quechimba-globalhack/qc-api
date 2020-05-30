import "reflect-metadata";

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import depthLimit from "graphql-depth-limit";
import compression from "compression";
import cors from "cors";

import { generateSchema } from "./generateSchema";

const startServer = async () => {
  const app = express();
  const generatedSchema = await generateSchema();

  const server = new ApolloServer({
    schema: generatedSchema,
    validationRules: [depthLimit(7)],
  });
  app.use("*", cors());
  app.use(compression());
  server.applyMiddleware({ app, path: "/graphql" });
  const httpServer = createServer(app);
  httpServer.listen({ port: 5000 }, (): void =>
    console.log(`\n🚀   GraphQL is now running on http://localhost:👆🏾/graphql`)
  );
};

startServer()
  .then(() => console.log("Server initialized"))
  .catch((err) => console.error("💩 Server crashed", err));