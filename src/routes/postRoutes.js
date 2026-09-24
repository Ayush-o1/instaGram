const express = require("express");

const postController = require("../controllers/postController");

const router = express.Router();

router.get("/", postController.getAllPosts);

router.get("/:id", postController.getPostById);

module.exports = router;