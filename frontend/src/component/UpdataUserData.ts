import axios from "axios";
import toast from "react-hot-toast";

const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");

export const updateTestCompleted = async () => {
  await axios.put(
    `${import.meta.env.VITE_API_PATH}/user/testCompleted/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  toast.success("test updated in db successfully");
};

export const updateTestStarted = async () => {
  await axios.put(
    `${import.meta.env.VITE_API_PATH}/user/testStarted/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("update test started function finished successfully");
};

export const updateTestInformation = async (wpm: string, second: number, accuracy: string) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_PATH}/user/addData/${userId}`,
    {
      wpm,
      second,
      accuracy,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response.data);
};