//#region EXPRESS with node js
import cors from "cors";
import express from "express";
const app = express();
const port = process.env.PORT || 8000;
import posts from "./routes/posts.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import notFoundHandler from "./middleware/notFound.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}/`)
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/posts", posts);
app.use(logger);
app.use(errorHandler);
app.use(notFoundHandler);

// app.get("/", (req, res) => {
// res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// app.get("/about", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "about.html"));
// });

// -------------------------------------------------------------------------------------------------------------------------------------------------------------

// #region NODE JS

// import http from "http";
// import fs from "fs/promises";
// import path from "path";
// import url from "url";

// const PORT = process.env.PORT;
// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const server = http.createServer(async (req, res) => {
//   //   res.statusCode = 200;
//   //   res.setHeader('Content-Type', 'text/html');
//   //   res.writeHead(500, { "Content-Type": "application/json" });
//   //   res.end(JSON.stringify({ error: "500 Internal Server Error" }));

//   try {
//     if (req.method === "GET") {
//       let filePath = "";
//       if (req.url === "/") {
//         filePath = path.join(__dirname, "public", "index.html");
//       } else if (req.url === "/about") {
//         filePath = path.join(__dirname, "public", "about.html");
//       } else {
//         throw new Error("404 Not Found");
//       }
//       const data = await fs.readFile(filePath);
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.write(data);
//       res.end();
//     }
//   } catch (err) {
//     res.writeHead(500, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ error: "500 Internal Server Error" }));
//   }
// });

// server.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}/`);
// });
