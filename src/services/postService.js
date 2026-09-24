const Post = require("../models/Post");

const getAllPosts = async () => {
    return await Post.find().sort({ createdAt: -1 });
};

const getPostById = async (postId) => {
    return await Post.findById(postId);
};

module.exports = {
    getAllPosts,
    getPostById,
};