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

module.exports = {
    getAllPosts,
    getPostById,
};