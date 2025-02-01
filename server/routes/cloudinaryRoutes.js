const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const cloudinaryController = require("../controllers/cloudinaryController");
const fileUpload = require("express-fileupload");

router.use(authMiddleware);
router.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

// POST /api/cloudinary/upload
router.post("/upload", cloudinaryController.cloudinaryUpload);

module.exports = router;
