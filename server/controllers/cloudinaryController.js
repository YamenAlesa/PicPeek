const cloudinary = require("cloudinary").v2;
const uploadHandler = require("../utils/uploadHandler");
const removeTemp = require("../utils/removeTemp");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dehiogkvb",
  api_key: process.env.CLOUDINARY_API_KEY || "865945142765374",
  api_secret: process.env.CLOUDINARY_API_SECRET || "ueWbGVF3UnYE4dCf6UyVd89N8x4",
  secure: true,
});

const cloudinaryUpload = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "No files were uploaded." });
    }

    let files = Object.values(req.files).flat();
    let images = [];

    for (const file of files) {
      const imgToUpload = await uploadHandler(file);
      images.push(imgToUpload);
      removeTemp(file.tempFilePath);
    }

    res.status(200).json({ message: "Images uploaded successfully", images });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Internal server error - cloudinaryUpload" });
  }
};

module.exports = {
  cloudinaryUpload,
};
