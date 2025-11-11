import { validationResult, param, query, body } from "express-validator";

let posts = [
  {
    id: 1,
    title: "First Post",
  },
  {
    id: 2,
    title: "Second Post",
  },
  {
    id: 3,
    title: "Third Post",
  },
];

// Validation and sanitization middlewares
export const validateGetPosts = [
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer")
    .toInt(), 
];

export const validatePostId = [
  param("id")
    .exists()
    .withMessage("ID param is required")
    .isInt({ min: 1 })
    .withMessage("ID must be a positive integer")
    .toInt(),
];

export const validateCreatePost = [
  body("title")
    .exists()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .trim()
    .escape(),
];

export const validateUpdatePost = [
  param("id")
    .exists()
    .withMessage("ID param is required")
    .isInt({ min: 1 })
    .withMessage("ID must be a positive integer")
    .toInt(),
  body("title")
    .optional()
    .isString()
    .withMessage("Title must be a string")
    .trim()
    .escape(),
];

export const getPosts = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const limit = req.query.limit || posts.length;
  const limitedPosts = posts.slice(0, limit);
  res.status(200).json(limitedPosts);
};

export const getPostById = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const postId = req.params.id;
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    const err = new Error(`Post with id ${postId} not found`);
    err.status = 404;
    return next(err);
  }
  res.status(200).json(post);
};

export const createNewPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };
  posts.push(newPost);
  res.status(201).json(posts);
};

export const updatePostById = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const postId = req.params.id;
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    const err = new Error(`Post with id ${postId} not found`);
    err.status = 404;
    return next(err);
  }
  if (req.body.title) {
    post.title = req.body.title;
  }
  res.status(200).json(posts);
};

export const deletePostById = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const postId = req.params.id;
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    const err = new Error(`Post with id ${postId} not found`);
    err.status = 404;
    return next(err);
  }
  posts = posts.filter((p) => p.id !== postId);
  res.status(200).json(posts);
};
