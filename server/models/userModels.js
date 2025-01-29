const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      Minlength: 3,
      Maxlength: 20,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      Minlength: 3,
      Maxlength: 30,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      Minlength: 6,
    },
    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    following: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
    posts: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    postCount: {
      type: Number,
      default: 0,
    },
    bio: {
      type: String,
      default: "No bio",
      Maxlength: 150,
    },
    profilePicture: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
