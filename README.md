# Instagram Clone — Backend Practice Project

A simple Instagram-like photo-sharing web application built to practice backend development with Node.js, Express, MongoDB, and REST APIs.

The project focuses on understanding how a real backend works:

Frontend → API → Controller → Service → Database

---

## Features

- Upload an image with a caption
- View all posts
- View posts in a scrolling feed
- Delete posts
- Delete uploaded images when a post is deleted
- Image type validation
- 5 MB image size limit
- Caption validation
- Maximum 500-character caption
- Error handling
- MongoDB database storage
- REST API
- Simple responsive frontend

---

## Tech Stack

### Frontend

- HTML
- CSS
- JavaScript
- Fetch API

### Backend

- Node.js
- Express.js
- Multer

### Database

- MongoDB
- Mongoose

### Other

- dotenv
- Nodemon
- Git / GitHub
- Postman

---

## Project Structure

```text
Instagram/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── postController.js
│   │
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── upload.js
│   │
│   ├── models/
│   │   └── Post.js
│   │
│   ├── routes/
│   │   └── postRoutes.js
│   │
│   ├── services/
│   │   └── postService.js
│   │
│   ├── app.js
│   └── server.js
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── uploads/
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md