const fs = require("fs");
const path = require("path");

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
        if (!req.file){
            return res.status(400).json({
                success:false,
                message:"Image is required",
            });
        }
        if (!req.body.caption || req.body.caption.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Caption is required",
    });
}
        const postData = {
            imageUrl: `/uploads/${req.file.filename}`,
            caption: req.body.caption,
        };

        const post = await postService.createPost(postData);

        res.status(201).json({
            success: true,
            data: post,
        });
    } catch (error) {
        next(error);
    }
};

const deletePost = async (req, res, next) => {
    try {
        const deletedPost = await postService.deletePost(req.params.id);

        if (!deletedPost) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        const imagePath = path.join(
            __dirname,
            "../../",
            deletedPost.imageUrl
        );

        fs.unlink(imagePath, (error) => {
            if (error) {
                console.error("Failed to delete image:", error.message);
            }
        });

        res.status(200).json({
            success: true,
            message: "Post deleted successfully",
            data: deletedPost,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    deletePost,
};