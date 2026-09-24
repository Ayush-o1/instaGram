const express = require("express");

const postController = require("../controllers/postController");
const upload = require("../middleware/upload");

const router = express.Router();

router.get("/", postController.getAllPosts);

router.get("/:id", postController.getPostById);

router.post("/",upload.single("image"),postController.createPost);

module.exports = router;