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

const deletePost = async (postId) => {
    return await Post.findByIdAndDelete(postId);
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    deletePost,
};