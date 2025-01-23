const User = require("../models/userModels");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const adminUser = await User.findById(req.user.id);
    const { isAdmin } = adminUser;

    if (!isAdmin) {
      return res.status(403).json({ message: "You are not authorized to view this page" });
    }

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

const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const users = await User.find({
      username: { $regex: username, $options: "i" },
    });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const userToReturn = users.map((user) => {
      return {
        username: user.username,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        id: user._id,
        followers: user.followers.length,
        following: user.following.length,
        postCount: user.postCount,
      };
    });

    return res.status(200).json(userToReturn);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, name, email, password, isAdmin } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 12);

    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = new User({
      username,
      name,
      email,
      password: encryptedPassword,
      isAdmin: isAdmin || false,
    });

    const user = await newUser.save();

    return res.status(201).json({ message: "User created", user });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Username or email already exists" });
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

const updateUsers = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  const { username, name, email, password, profilePicture, isAdmin } = req.body;

  user.username = username || user.username;
  user.name = name || user.name;
  user.email = email || user.email;
  if (password) {
    const encryptedPassword = await bcrypt.hash(password, 12);
    user.password = encryptedPassword;
  }
  user.profilePicture = profilePicture || user.profilePicture;
  user.isAdmin = isAdmin || user.isAdmin;

  await user.save();
  res.status(200).json(user);
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("following")
      .populate("followers")
      .select("-password")
      .exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const followUser = async (req, res) => {
  const { id: userId } = req.user;
  const { targetUserId } = req.body;

  if (userId === targetUserId) {
    return res.status(400).json({ message: "You cannot follow yourself." });
  }

  try {
    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({ message: "User to follow not found." });
    }

    if (user.following.includes(targetUserId)) {
      return res.status(400).json({ message: "You already follow this user." });
    }

    user.following.push(targetUserId);
    targetUser.followers.push(userId);

    await user.save();
    await targetUser.save();

    res.status(200).json({ message: "User followed successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const unfollowUser = async (req, res) => {
  const { userId } = req.user;
  const { targetUserId } = req.body;

  try {
    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({ message: "User to unfollow not found." });
    }

    if (!user.following.includes(targetUserId)) {
      return res.status(400).json({ message: "You do not follow this user." });
    }

    user.following = user.following.filter((id) => id.toString() !== targetUserId);
    targetUser.followers = targetUser.followers.filter((id) => id.toString() !== userId);

    await user.save();
    await targetUser.save();

    res.status(200).json({ message: "User unfollowed successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFriends = async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await User.findById(userId).populate("followers following");

    const friends = user.followers.filter((follower) =>
      user.following.includes(follower._id.toString())
    );

    res.status(200).json({ friends });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserByUsername,
  createUser,
  deleteUser,
  updateUsers,
  getUserProfile,
  followUser,
  unfollowUser,
  getFriends,
};
