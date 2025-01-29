import axios from "axios";

export const followUser = async (targetUserId) => {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:4499/api/users/follow",
      { targetUserId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    console.error("Error following user:", error);
  }
};

export const unfollowUser = async (targetUserId) => {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:4499/api/users/unfollow",
      { targetUserId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    console.error("Error unfollowing user:", error);
  }
};
