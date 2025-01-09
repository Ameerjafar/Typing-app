import axios from "axios";

const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");


export const UserData = async () => {
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

export const fetchAccuracy = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_PATH}/user/average/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
}