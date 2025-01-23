import axios from "axios";

export const followUser = async (user) => {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:4499/api/users/follow",
      { targetUserId: user.id },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    console.error(error);
  }
};
