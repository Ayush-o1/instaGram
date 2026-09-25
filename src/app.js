const express = require("express");

const postRoutes = require("./routes/postRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

app.use(express.static("public"));

app.use("/uploads", express.static("uploads"));

app.use("/api/posts", postRoutes);

app.use(errorHandler);

module.exports = app;