import axios from "axios";

export const UserData = async () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `${import.meta.env.VITE_API_PATH}/user/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
