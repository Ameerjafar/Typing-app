import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentInd,
  isMultiPlayer,
  wordAtom,
} from "../store/textAtom";
import { useNavigate } from "react-router-dom";
function WebSocketServer() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [roomId, setRoomId] = useState<string>("");
  const currentIndex = useRecoilValue(currentInd);
  // const [text, setText] = useRecoilState(textAtom);
  const setMultiPlayer = useSetRecoilState(isMultiPlayer);
  const navigate = useNavigate();
  const words = useRecoilValue(wordAtom);
  // console.log(roomId);
  const createRoomHandler = () => {
    const newRoomId = Math.random().toString().substring(2, 6);
    setRoomId(newRoomId);
    // console.log(Math.random().toString().substring(2, 6));
    console.log("This is the roomId", newRoomId);
    if (newRoomId !== "") {
      socket!.send(
        JSON.stringify({
          type: "CreateRoom",
          roomId: newRoomId,
          text: words,
          admin: true,
        })
      );
      navigate('/');
      setMultiPlayer(true);
    }
  };
  const roomHandler = () => {
    if (socket && roomId) {
      socket.send(
        JSON.stringify({
          type: "JoinRoom",
          roomId: roomId,
        })
      );
    }
    setMultiPlayer(true);
  };
  useEffect(() => {
    if (socket && roomId) {
      socket.send(
        JSON.stringify({
          type: "IndexUpdate",
          room: roomId,
          index: currentIndex,
        })
      );
    }
  }, [currentInd, socket, roomId]);
  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");
    newSocket.onopen = () => {
      console.log("Connection established");
      newSocket.send("Hello Server!");
    };
    newSocket.onmessage = (message) => {
      const parsedData = JSON.parse(message.data);
      // if(parsedData.type === 'gameStart') {
      //   setText(parsedData.text);
      // }
      if (parsedData.type === "JoinedRoom") {
        navigate("/");
      }

      // if(parsedData.type === 'roomCreated') {
      //   navigate('/');
      // }
      console.log("Message received:", message.data);
    };
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);
  useEffect(() => {
    if (socket && roomId) {
      socket.send(
        JSON.stringify({
          type: "IndexUpdate",
          roomId: roomId,
          index: currentIndex,
        })
      );
    }
  }, [currentIndex, roomId, socket]);
  return (
    <>
      <div className="flex flex-col items-center gap-4 p-4">
        <div className="flex gap-4">
          <button 
            onClick={createRoomHandler}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create Room
          </button>
          {roomId && <div>Room ID: {roomId}</div>}
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="font-medium">Join Room</div>
          <input 
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter room ID"
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={roomHandler}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Join Room
          </button>
        </div>
      </div>
    </>
  );
}

export default WebSocketServer;
