const removeTemp = require("../utils/removeTemp");

const imgMiddleware = async (req, res, next) => {
  try {
    if (!req.files) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    let files = Object.values(req.body.files).flat();
    for (const file of files) {
      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/jpg" &&
        file.mimetype !== "image/webp"
      ) {
        {
          removeTemp(file.tempFilePath);
          return res
            .status(400)
            .json({ message: "Only jpeg, png, jpg and webp formats are allowed." });
        }
      }

      if (file.size > 1024 * 1024 * 5) {
        removeTemp(file.tempFilePath);
        return res.status(400).json({ message: "File size should be less than 5MB" });
      }
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error - imgMiddleware" });
  }
};

module.exports = imgMiddleware;
