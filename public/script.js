// =========================
// DOM Elements
// =========================

const postForm = document.getElementById("postForm");

const imageInput = document.getElementById("image");

const captionInput = document.getElementById("caption");

const postsContainer = document.getElementById("postsContainer");

const message = document.getElementById("message");

const uploadButton = document.getElementById("uploadButton");

const API_URL = "/api/posts";


// =========================
// Load Posts
// =========================

const loadPosts = async () => {
    try {
        postsContainer.innerHTML = "<p>Loading posts...</p>";

        const response = await fetch(API_URL);

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to load posts");
        }

        const posts = result.data;

        postsContainer.innerHTML = "";

        if (posts.length === 0) {
            postsContainer.innerHTML = `
                <div class="empty-message">
                    No posts yet. Create the first post!
                </div>
            `;

            return;
        }

        posts.forEach((post) => {
            createPostCard(post);
        });

    } catch (error) {
        console.error("Failed to load posts:", error);

        postsContainer.innerHTML = `
            <div class="empty-message">
                Failed to load posts.
            </div>
        `;
    }
};


// =========================
// Create Post Card
// =========================

const createPostCard = (post) => {

    const postCard = document.createElement("article");

    postCard.className = "post-card";

    postCard.innerHTML = `
        <img
            src="${post.imageUrl}"
            alt="Post image"
            class="post-image"
        >

        <div class="post-content">

            <p class="post-caption">
                ${escapeHTML(post.caption)}
            </p>

            <p class="post-date">
                ${formatDate(post.createdAt)}
            </p>

            <button
                class="delete-button"
                data-id="${post._id}"
            >
                Delete
            </button>

        </div>
    `;

    const deleteButton = postCard.querySelector(".delete-button");

    deleteButton.addEventListener("click", () => {
        deletePost(post._id);
    });

    postsContainer.appendChild(postCard);
};


// =========================
// Upload Post
// =========================

postForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const image = imageInput.files[0];

    const caption = captionInput.value.trim();


    // Frontend validation

    if (!image) {
        showMessage("Please select an image.");

        return;
    }

    if (!caption) {
        showMessage("Please enter a caption.");

        return;
    }

    if (caption.length > 500) {
        showMessage("Caption cannot exceed 500 characters.");

        return;
    }


    try {

        uploadButton.disabled = true;

        uploadButton.textContent = "Uploading...";

        showMessage("");


        // Create multipart/form-data

        const formData = new FormData();

        formData.append("image", image);

        formData.append("caption", caption);


        // Send request to backend

        const response = await fetch(API_URL, {
            method: "POST",
            body: formData,
        });


        const result = await response.json();


        if (!response.ok) {
            throw new Error(result.message || "Failed to upload post");
        }


        // Reset form

        postForm.reset();


        showMessage("Post uploaded successfully!");


        // Reload feed

        await loadPosts();


    } catch (error) {

        console.error("Failed to upload post:", error);

        showMessage(error.message);

    } finally {

        uploadButton.disabled = false;

        uploadButton.textContent = "Upload Post";
    }
});


// =========================
// Delete Post
// =========================

const deletePost = async (postId) => {

    const confirmed = confirm(
        "Are you sure you want to delete this post?"
    );


    if (!confirmed) {
        return;
    }


    try {

        const response = await fetch(`${API_URL}/${postId}`, {
            method: "DELETE",
        });


        const result = await response.json();


        if (!response.ok) {
            throw new Error(result.message || "Failed to delete post");
        }


        showMessage("Post deleted successfully!");


        // Reload feed

        await loadPosts();


    } catch (error) {

        console.error("Failed to delete post:", error);

        showMessage(error.message);
    }
};


// =========================
// Show Message
// =========================

const showMessage = (text) => {

    message.textContent = text;
};


// =========================
// Format Date
// =========================

const formatDate = (date) => {

    if (!date) {
        return "";
    }

    return new Date(date).toLocaleString();
};


// =========================
// Escape HTML
// =========================

const escapeHTML = (text) => {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
};


// =========================
// Initial Load
// =========================

loadPosts();