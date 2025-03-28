import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../ui/Card";
import TestCard from "../ui/TestCard";
import { Trophy, Clock, Target, Medal } from "lucide-react";
import RankingCard from "../ui/RankingCard";
import { useNavigate } from "react-router-dom";

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
  const [wpm, setWpm] = useState<number[]>([]);
  // const time = useRecoilValue(timeAtom);
  const navigate = useNavigate()
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
      const avg = response1.data;
      console.log(avg);
      setAverage([avg.avgFivteen, avg.avgthirty, avg.avgSixty]);
      console.log("this is the average state variable", average);

      const response2 = await axios.get(
        `${import.meta.env.VITE_API_PATH}/leaderboard/${userId}`
      );
      const ranking = response2.data;
      console.log("this is the ranking", ranking);
      setRanking([ranking.fivteen, ranking.sixty]);
      setWpm([ranking.fivWpm, ranking.sixWpm]);
      console.log(ranking);
    };
    fetchUser();
  }, []);
  return (
    <div>

      <div className="flex justify-center w-full min-h-screen md:p-32 md:pl-60 font-mono bg-[#1e1e1e]">
        <div>
          <div className="flex space-x-5">
            <div className="h-20 w-20 rounded-full text-center pt-5 font-bold  text-3xl bg-white">
              {user?.fullName[0].toUpperCase() || "U"}
            </div>
            <div className="text-white font-bold font-mono text-4xl mt-4">
              {user?.fullName.toUpperCase()}
            </div>
          </div>
          <div className="flex space-x-7 ml-3 mr-52">
            <Card
              second={15}
              wpm={`${!isNaN(average[0]) ? average[0] : "0"}`}
              icon={<Trophy className="text-yellow-400" />}
            ></Card>
            <Card
              second={30}
              wpm={`${!isNaN(average[1]) ? average[1] : "0"}`}
              icon={<Trophy className="text-yellow-400" />}
            ></Card>
            <Card
              second={60}
              wpm={`${!isNaN(average[2]) ? average[2] : "0"}`}
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
              ranking={`${ranking[0]}`}
              BestUserScore={`${wpm[0] !== null ? wpm[0] : 0}`}
              icon2={<Trophy className="text-yellow-400" />}
              icon1={<Medal className="text-blue-600" />}
            ></RankingCard>
            <RankingCard
              second={60}
              ranking={`${ranking[1]}`}
              BestUserScore={`${wpm[1] !== null ? wpm[1] : 0}`}
              icon2={<Trophy className="text-yellow-400" />}
              icon1={<Medal className="text-blue-600" />}
            ></RankingCard>
          </div>
          <div className = 'flex justify-center mr-44'>
            <button onClick = { () => {
              localStorage.removeItem('token');
              navigate('/')
            }} className="flex justify-center text-white border-white border-2 text-center p-3 rounded-md mt-10 font-bold text-2xl">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
