const express = require("express");

const postRoutes = require("./routes/postRoutes");
const errorHandler = require("./middleware/errorHandler");
const app = express();

app.use(express.json());

app.use("/uploads",express.static("uploads"));

app.get("/", (req, res) => {
    res.send("Instagram Backend is running! ✅");
});

app.use("/api/posts", postRoutes);
app.use(errorHandler);

module.exports = app;