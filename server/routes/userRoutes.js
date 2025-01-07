const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get(
  "/search/:username",
  authMiddleware,
  userController.getUserByUsername
);

router.get("/profile", authMiddleware, userController.getUserProfile);



router.post("/", userController.createUser);

router.delete("/:id", authMiddleware, userController.deleteUser);

router.patch("/:id", authMiddleware, userController.updateUsers);

router.get("/", authMiddleware, userController.getAllUsers);

module.exports = router;
