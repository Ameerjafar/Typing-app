import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../ui/Card";
import TestCard from "../ui/TestCard";

import { Trophy, Clock, Target, Medal } from "lucide-react";
import RankingCard from "../ui/RankingCard";
import { timeAtom } from "../store/TimeAtom";
import { useRecoilValue } from "recoil";


interface UserObject {
  id: string;
  fullName: string;
  email: string;
  password: string;
  testStarted: number;
  testCompleted: number;
}
const UserProfile = () => {
  const [user, setUser] = useState<UserObject>();
  const [average, setAverage] = useState<number[]>([]);
  const [ranking, setRanking] = useState<number[]>([]);
  const [wpm, setWpm] = useState<string>("0");
  const [accuracy, setAccuracy] = useState<string>("0");
  const time = useRecoilValue(timeAtom);
  useEffect(() => {
    const fetchUser = async () => {
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
      setUser(response.data.userInformation);
      const response1 = await axios.get(
        `${import.meta.env.VITE_API_PATH}/user/average/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response1.data)
      const avg = response1.data;
      console.log(avg);
      setAverage(avg);

      // const response2 = await axios.post(`${import.meta.env.VITE_API_PATH}/leaderboard/${userId}`)
      // setRanking(prev => [...prev, response2.data.sixty])
      // setRanking(prev => [...prev, response2.data.fivteen])
    };
    fetchUser();
  }, []);
  return (
    <div>
      <div className="bg-[#1e1e1e] w-full min-h-screen p-32 pl-60 font-mono">
        <div>
          <div className="flex space-x-5">
            <div className="h-20 w-20 rounded-full text-center pt-5 font-bold text-3xl bg-white">
              {user?.fullName[0].toUpperCase() || "U"}
            </div>
            <div className="text-white font-bold font-mono text-4xl mt-4">
              {user?.fullName.toUpperCase()}
            </div>
          </div>
          <div className="flex space-x-7 ml-3">
            <Card
              second={15}
              wpm={`${average[0] !== undefined ? average[0] : "0"}`}
              icon={<Trophy className="text-yellow-400" />}
            ></Card>
            <Card
              second={30}
              wpm={`${average[1] !== undefined ? average[1] : "0"}`}
              icon={<Trophy className="text-yellow-400" />}
            ></Card>
            <Card
              second={60}
              wpm={`${average[2] !== undefined ? average[2] : "0"}`}
              icon={<Trophy className="text-yellow-400" />}
            ></Card>
          </div>
          <div className="flex space-x-7">
            <TestCard
              title="TestStated"
              totalTest={user?.testStarted || 0}
              icon={<Clock className="text-blue-600" />}
            ></TestCard>
            <TestCard
              title="TestCompleted"
              totalTest={user?.testCompleted || 0}
              icon={<Target className="text-green-500" />}
            ></TestCard>
          </div>
          <div className="flex space-x-7">
            <RankingCard
              second={15}
              ranking={ranking[0]}
              BestUserScore="100"
              icon2={<Trophy className="text-yellow-400" />}
              icon1={<Medal className="text-blue-600" />}
            ></RankingCard>
            <RankingCard
              second={60}
              ranking={ranking[1]}
              BestUserScore="100"
              icon2={<Trophy className="text-yellow-400" />}
              icon1={<Medal className="text-blue-600" />}
            ></RankingCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
