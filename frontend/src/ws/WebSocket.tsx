
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { currentInd } from '../store/textAtom';
function WebSocketServer() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [ latestMessage, setLatestMessage ] = useState<string>("");
  const [ roomId, setRoomId ] = useState<string>("");
  const [ showRoomId, setShowRoomId ] = useState<boolean>(false);
  const currentIndex = useRecoilValue(currentInd);
  const [opponentCurrentInd, setOpponentCurrentInd] = useState<string>();
  console.log(roomId);
  const createRoomHandler = () => {
    setRoomId(Math.random().toString().substring(2, 6));
    console.log(roomId);
    setShowRoomId(true);
    socket!.send(JSON.stringify({
      type: 'CreateRoom',
      room: roomId
    }))
  }
  const roomHandler = () => {
    if(socket && roomId) {
      socket.send(JSON.stringify({
        type: "JoinRoom",
        room: roomId
      }))
    }
  }
  useEffect(() => {
    if(socket && roomId) {
      socket.send(JSON.stringify({
        type: "IndexUpdate",
        room: roomId,
        index: currentIndex
      }))
    }
  }, [currentInd, socket, roomId])
  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      console.log('Connection established');
      newSocket.send('Hello Server!');
    }
    newSocket.onmessage = (message) => {
      console.log('Message received:', message.data);
    }
    setSocket(newSocket);
    return () => newSocket.close();
  }, [])

  return (
    <>
     <div className = ''>

        <button onClick = { createRoomHandler }>create Room</button>
        <div>Join room</div>
        <input onChange = { (e) => setRoomId(e.target.value)}></input>
        <button onClick = { roomHandler }>Enter Your room id</button>
        { latestMessage }
     </div>
    </>
  )
}

export default WebSocketServer;

