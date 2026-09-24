const postService = require("../services/postService");

const getAllPosts = async (req, res, next) => {
    try {
        const posts = await postService.getAllPosts();

        res.status(200).json({
            success: true,
            data: posts,
        });
    } catch (error) {
        next(error);
    }
};

const getPostById = async (req, res, next) => {
    try {
        const post = await postService.getPostById(req.params.id);

        res.status(200).json({
            success: true,
            data: post,
        });
    } catch (error) {
        next(error);
    }
};

const createPost = async (req, res, next) => {
    try {
        const postData = {
            imageUrl: `/uploads/${req.file.filename}`,
            caption: req.body.caption,
        };

        console.log("Uploaded file:", req.file);
        console.log("Post data:", postData);

        const post = await postService.createPost(postData);

        res.status(201).json({
            success: true,
            data: post,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
};