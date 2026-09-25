const multer = require("multer");

const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                success: false,
                message: "Image size must be less than 5MB",
            });
        }

        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }

    if (err.message === "Only JPEG, PNG, and WebP images are allowed") {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }

    res.status(500).json({
        success: false,
        message: "Internal server error",
    });
};

module.exports = errorHandler;