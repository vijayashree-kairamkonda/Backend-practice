import express from "express";
import { config as CONFIG } from "./config/env.js";
import { connectDB } from "./config/db.js";

const app = express();

app.use(express.json());
console.log(process.env);

connectDB();

app.listen(CONFIG.port, () => {
  console.log(
    `Server running in ${CONFIG.nodeEnv} mode on port ${CONFIG.port}, http://localhost:${CONFIG.port}`
  );
});
