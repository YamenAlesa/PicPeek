const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(users);
  } catch (err) {
    console.log(error);
    return res.status(500).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      username,
      name,
      email,
      password: encryptedPassword,
    });

    const user = await newUser.save();
    if (!user) {
      return res.status(400).json({ message: "User not created" });
    }
    return res.status(201).json({ message: "User created", user });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      if (error.keyPattern.username) {
        return res.status(400).json({ message: "Username already exists" });
      }
      if (error.keyPattern.email) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userDelete = await User.findByIdAndDelete(req.params.id);
    if (!userDelete) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(201).json({ message: "User deleted", userDelete });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const updateUsers = (req, res) => {
  const user = User.find((u) => u.id == req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = req.body.name || user.name;
  res.status(200).json(user);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUsers,
};
