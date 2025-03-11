import { useEffect, useState } from 'react'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { currentInd, isMultiPlayer, textAtom } from '../store/textAtom';
function WebSocketServer() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [ roomId, setRoomId ] = useState<string>("");
  const currentIndex = useRecoilValue(currentInd);
  const [text, setText] = useRecoilState(textAtom);
  const setMultiPlayer = useSetRecoilState(isMultiPlayer);
  console.log(roomId);
  const createRoomHandler = () => {
    setRoomId(Math.random().toString().substring(2, 6));
    console.log(roomId);
    socket!.send(JSON.stringify({
      type: 'CreateRoom',
      room: roomId,
      text: text,
      admin: true
    }))
    setMultiPlayer(true);
  }

  const roomHandler = () => {
    if(socket && roomId) {
      socket.send(JSON.stringify({
        type: "JoinRoom",
        room: roomId
      }))
    }
    setMultiPlayer(true);
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
      const parsedData = JSON.parse(message.data);
      if(parsedData.type === 'gameStart') {
        setText(parsedData.text);
      }
      console.log('Message received:', message.data);
    }
    setSocket(newSocket);
    return () => newSocket.close();
  }, [])
  useEffect(() => {
    if(socket && roomId) {
      socket.send(JSON.stringify({
        type: 'IndexUpdate',
        roomId: roomId, 
        index: currentIndex
      }))
    }
  }, [currentIndex, roomId, socket])
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

