import Github from "../models/GithubLog.js";
import { getUser } from "../services/GithubService.js";

export const getUserByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const githubUser = await getUser(username);
    await Github.create(githubUser);
    res.status(201).json(githubUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
