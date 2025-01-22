import axios from "axios";

export const followUser = async (targetUserId) => {
  try {
    const token = localStorage.getItem("token");

    console.log(targetUserId);

    await axios.post("http://localhost:4499/api/users/follow", targetUserId, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error(error);
  }
};
