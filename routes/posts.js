import express from "express";
import {
  getPosts,
  getPostById,
  createNewPost,
  updatePostById,
  deletePostById,
} from "../controllers/postsController.js";

const router = express.Router();

//get all posts with optional limit query parameter
router.get("/", getPosts);
//get a post by id
router.get("/:id", getPostById);

//create a new post
router.post("/", createNewPost);

//update a post by id
router.put("/:id", updatePostById);

//delete a post by id
router.delete("/:id", deletePostById);

export default router;
