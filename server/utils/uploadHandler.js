const cloudinary = require("cloudinary").v2;
const removeTemp = require("./removeTemp");

const cloudinaryUpload = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.tempFilePath,
      {
        folder: "PicPeek/img",
        public_id: `${Date.now()}-${file.name.replace(/\s/g, "_")}`,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          removeTemp(file.tempFilePath);
          return reject(error);
        }
        removeTemp(file.tempFilePath);
        resolve(result.secure_url);
      }
    );
  });
};

module.exports = cloudinaryUpload;
