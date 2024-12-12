const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.get("/", userController.getAllUsers);

router.post("/", userController.createUser);

router.get("/:id", userController.getUserById);

router.delete("/:id", userController.deleteUser);

router.patch("/:id", userController.updateUsers);

module.exports = router;
