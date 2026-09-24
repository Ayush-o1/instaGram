const Post = require("../models/Post");

const getAllPosts = async () => {
    return await Post.find().sort({ createdAt: -1 });
};

const getPostById = async (postId) => {
    return await Post.findById(postId);
};

const createPost = async (postData) => {
    return await Post.create(postData);
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
};