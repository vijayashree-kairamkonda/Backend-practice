import express from "express";
import { config as CONFIG } from "./config/env.js";
console.log(CONFIG);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(CONFIG.port, () => {
  console.log(
    `✅ Server running in ${CONFIG.nodeEnv} mode on port ${CONFIG.port}, http://localhost:${CONFIG.port}`
  );
});

const users = [
  {
    id: 1,
    name: "Emma",
  },
  {
    id: 2,
    name: "John",
  },
  {
    id: 3,
    name: "Alice",
  },
];

app.get("/users", (req, res, err) => {
  res.json({
    data: users,
  });
  if (users.length === 0) {
    err.status = 404;
    err.message = "No users found";
    return next(err);
  }
  res.end();
});

app.post("/users", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  const newUser = {
    id: users.length + 1,
    name,
  };
  users.push(newUser);
  res.json({ message: "User added successfully", user: newUser });
});

app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ user });
  res.end();
});

app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  user.name = name;
  res.json({ message: "User updated successfully" });
  res.end();
});

app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }
  users.filter((u) => u.id !== id);
  res.json({ message: "User deleted successfully" });
  res.end();
});
