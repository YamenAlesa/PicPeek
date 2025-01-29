const fs = require("fs");

const removeTemp = (path) => {
  if (!path) return;
  fs.unlink(path, (err) => {
    if (err) {
      console.error("Error deleting temp file:", err);
      return;
    }
    console.log("Temp file deleted:", path);
  });
};

module.exports = removeTemp;
