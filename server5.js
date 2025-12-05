import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { connectDB } from "./config/db.js";
import { config as CONFIG } from "./config/env.js";
import { typeDefs } from "./src/typeDefs/typeDefs.js";
import { resolvers } from "./src/resolvers/resolvers.js";
import redis from "./config/redis.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://studio.apollographql.com"],
    credentials: true,
  })
);

app.use(express.json());

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    context: () => ({ redis }),
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: false,
  });

  connectDB();

  app.listen(CONFIG.port, () => {
    console.log(`Server running at http://localhost:${CONFIG.port}/graphql`);
  });
};

startServer();
