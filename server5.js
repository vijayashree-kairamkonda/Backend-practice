import express from "express";
import { connectDB } from "./config/db.js";
import { config as CONFIG } from "./config/env.js";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./src/typeDefs/typeDefs.js";
import { resolvers } from "./src/resolvers/resolvers.js";

const app = express();

const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });
  connectDB();

  app.listen(CONFIG.port, () => {
    console.log(
      `Server running in ${CONFIG.nodeEnv} mode on port ${CONFIG.port} || http://localhost:${CONFIG.port}`
    );
  });
};

startServer();
