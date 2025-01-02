import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../ui/Card";
import TestCard from "../ui/TestCard";

import { Trophy, Clock, Target, Medal } from "lucide-react";
import RankingCard from "../ui/RankingCard";

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
  const [ typeInformation, setTypeInformation ] = useState();
  const [ average, setAverage ] = useState<number[]>([]);
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
      const response = await axios.get(
        `${import.meta.env.VITE_API_PATH}/average/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAverage(prev => [...prev, response.data.avgFivteen]);
      setAverage(prev => [...prev, response.data.avgsixty]);
      setAverage(prev => [...prev, response.data.avgthirty]);

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
              wpm={"100"}
              icon={<Trophy className="text-yellow-400" />}
            ></Card>
            <Card
              second={30}
              wpm={"100"}
              icon={<Trophy className="text-yellow-400" />}
            ></Card>
            <Card
              second={60}
              wpm={"100"}
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
              ranking={1}
              BestUserScore="100"
              icon2={<Trophy className="text-yellow-400" />}
              icon1={<Medal className="text-blue-600" />}
            ></RankingCard>
            <RankingCard
              second={60}
              ranking={1}
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
