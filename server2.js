import { createServer } from "http";

const PORT = process.env.PORT;
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "David" },
];

//logger middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

//JSON Middleware
const jsonMiddleware = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
};

//Route handler for /api/users
const getUsersHandler = (req, res) => {
  res.write(JSON.stringify(users));
  res.end();
};

//Route handler for /api/users/:id
const getUserByIdHandler = (req, res) => {
  const userId = parseInt(req.url.split("/").pop(), 10);
  const user = users.find((u) => u.id === userId);
  if (user) {
    res.write(JSON.stringify(user));
  } else {
    res.statusCode = 404;
    res.write(JSON.stringify({ error: "User Not Found" }));
  }
  res.end();
};

//Not found handler
const notFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.write(JSON.stringify({ error: "Not Found" }));
  res.end();
};

//handler for POST /api/users
const createUserHandler = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const newUser = JSON.parse(body);
    newUser.id = users.length + 1;
    users.push(newUser);
    res.statusCode = 201;
    res.write(JSON.stringify(newUser));
    res.end();
  });
};

const server = createServer((req, res) => {
  logger(req, res, () => {
    jsonMiddleware(req, res, () => {
      if (req.method === "GET") {
        if (req.url === "/api/users") {
          getUsersHandler(req, res);
        } else if (req.url.match(/^\/api\/users\/([0-9]+)$/)) {
          getUserByIdHandler(req, res);
        } else {
          notFoundHandler(req, res);
        }
      } else if (req.method === "POST" && req.url === "/api/users") {
        createUserHandler(req, res);
      } else {
        notFoundHandler(req, res);
      }
    });
  });
});
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
