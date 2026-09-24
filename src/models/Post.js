const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        imageUrl : {
            type : String,
            required: true,
        },
        caption : {
            type: String,
            required: true,
            trim:true,
        },
    },
    {
        timeStamps : true,
    }
);

const Post = mongoose.model("Post ",postSchema);

module.exports = Post;