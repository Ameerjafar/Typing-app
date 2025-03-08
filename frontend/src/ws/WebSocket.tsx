import { useEffect, useState } from 'react'

function WebSocketServer() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [ latestMessage, setLatestMessage ] = useState<string>("");
  const [ roomId, setRoomId ] = useState<string>("");
  const sendButton = () => {
    socket?.send(inputChange);
  }
  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      console.log('Connection established');
      newSocket.send('Hello Server!');
    }
    newSocket.onmessage = (message) => {
      console.log('Message received:', message.data);
      setLatestMessage(message.data);
    }
    setSocket(newSocket);
    return () => newSocket.close();
  }, [])

  return (
    <>
     <div className = ''>
        <div>create Room</div>
        <div>Join room</div>
        <input onChange = { (e) => setRoomId(e.target.value)}></input>
        <button onClick = { sendButton }>Enter Your room id</button>
        { latestMessage }
     </div>
    </>
  )
}

export default WebSocketServer;

