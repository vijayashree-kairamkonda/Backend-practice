import express from "express";
import { config as CONFIG } from "./config/env.js";
import { connectDB } from "./config/db.js";
import customerRoutes from "./src/routes/customerRoutes.js";
import weatherRoutes from "./src/routes/weatherRoutes.js";
import githubRoutes from "./src/routes/githubRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log(process.env);

connectDB();

app.use("/api/customers", customerRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/github", githubRoutes);

app.listen(CONFIG.port, () => {
  console.log(
    `Server running in ${CONFIG.nodeEnv} mode on port ${CONFIG.port}, http://localhost:${CONFIG.port}`
  );
});
