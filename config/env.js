import dotenv from "dotenv";
import path from "path";
import fs from "fs";

const runtimeEnv = process.env.NODE_ENV || "development";

// Map development to existing filename `.env.dev` else use `.env.<env>`
const candidateFiles = [
  runtimeEnv === "development" ? ".env.dev" : `.env.${runtimeEnv}`,
  // Fallback to conventional name if user renames later
  `.env.${runtimeEnv}`,
];

let loadedPath;
for (const file of candidateFiles) {
  const full = path.resolve(process.cwd(), "config", file);
  if (fs.existsSync(full)) {
    dotenv.config({ path: full });
    loadedPath = full;
    break;
  }
}

console.log("Loaded environment file:", loadedPath || "<none found>");

export const config = {
  nodeEnv: process.env.NODE_ENV || runtimeEnv,
  port: process.env.PORT || 8000,
};

if (!process.env.MONGO_URI) {
  console.warn("Warning: MONGO_URI is not set. Check your env file.");
}
