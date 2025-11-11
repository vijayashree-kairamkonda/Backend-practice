import dotenv from "dotenv";
import path from "path";

const envFile = `.env.${process.env.NODE_ENV}`;
console.log("Loading environment variables from:", envFile);

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export const config = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT || 8000,
};
