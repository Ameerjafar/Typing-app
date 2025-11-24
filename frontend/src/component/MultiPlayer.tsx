import { useState, useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { wordAtom, currentInd, textAtom, isMultiPlayer } from "../store/textAtom";
import Test from "./Test";
import { faker } from '@faker-js/faker';
import { wordGenerator } from "./wordList";
import { Users, Play, Copy, Check, Trophy, Timer } from "lucide-react";
import { toast } from "sonner";
import Header from "./Header";
import Footer from "./Footer";

interface User {
    userId: string;
    userName: string;
    progress: number;
    wpm?: number;
    accuracy?: number;
}

const MultiPlayer = () => {
    const [roomId, setRoomId] = useState("");
    const [userId] = useState(faker.string.uuid());
    const [userName, setUserName] = useState(faker.person.firstName());
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [gameState, setGameState] = useState<'setup' | 'lobby' | 'game' | 'results'>('setup');
    const [users, setUsers] = useState<User[]>([]);
    const [copied, setCopied] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [leaderboard, setLeaderboard] = useState<User[]>([]);
    
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const setWords = useSetRecoilState(wordAtom);
    const setText = useSetRecoilState(textAtom);
    const setCurrentIndex = useSetRecoilState(currentInd);
    const currentIndexValue = useRecoilValue(currentInd);
    const [isMulti, setIsMulti] = useRecoilState(isMultiPlayer);

    const words = useRecoilValue(wordAtom);
    const totalChars = words.reduce((acc, word) => acc + word.length, 0) + words.length;

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');
        socket.onopen = () => {
            console.log('Connected to WebSocket');
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("Received:", data);

            if (data.type === 'roomCreated') {
                setGameState('lobby');
                setUsers([{ userId, userName, progress: 0 }]);
                toast.success("Room created successfully!");
            }

            if (data.type === 'joinedRoom') {
                setGameState('lobby');
                if (data.users) {
                    setUsers(data.users);
                }
                if (data.userId !== userId) {
                    toast.info(`${data.userName} joined the room`);
                }
            }

            if (data.type === 'leftRoomSuccess') {
                setUsers(prev => prev.filter(u => u.userId !== data.userId));
                toast.info(`${data.userName} left the room`);
            }

            if (data.type === 'gameStarted') {
                setWords(data.text);
                setText([]);
                setCurrentIndex(0);
                setIsMulti(true);
                setGameState('game');
                setStartTime(Date.now());
                setHasFinished(false);
                setElapsedTime(0);
                toast.success("Game Started!");
            }

            if (data.type === 'progressUpdate') {
                setUsers(prev => prev.map(u => {
                    if (u.userId === data.userId) {
                        return { ...u, progress: data.progress };
                    }
                    return u;
                }));
            }

            if (data.type === 'gameEnded') {
                setLeaderboard(data.leaderboard);
                setGameState('results');
                setIsMulti(false);
                if (timerRef.current) clearInterval(timerRef.current);
            }
            
            if (data.error) {
                toast.error(data.error);
            }
        };

        setWs(socket);

        return () => {
            socket.close();
            setIsMulti(false);
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    useEffect(() => {
        if (gameState === 'game' && startTime) {
            timerRef.current = setInterval(() => {
                setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [gameState, startTime]);

    useEffect(() => {
        if (gameState === 'game' && ws) {
            ws.send(JSON.stringify({
                type: 'updateProgress',
                roomId,
                userId,
                progress: currentIndexValue
            }));

            if (currentIndexValue >= totalChars && totalChars > 0 && !hasFinished && startTime) {
                setHasFinished(true);
                const endTime = Date.now();
                const timeInMinutes = (endTime - startTime) / 60000;
                const wpm = Math.round((totalChars / 5) / timeInMinutes);
                const accuracy = 100; // Simplified for now, can be calculated properly if needed

                ws.send(JSON.stringify({
                    type: 'gameFinished',
                    roomId,
                    userId,
                    wpm,
                    accuracy
                }));
                toast.success(`Finished! WPM: ${wpm}`);
            }
        }
    }, [currentIndexValue, totalChars, hasFinished, gameState, startTime]);

    const createRoom = () => {
        if (!ws || ws.readyState !== WebSocket.OPEN) {
            toast.error("Not connected to server. Please ensure backend is running.");
            return;
        }
        const newRoomId = Math.floor(1000 + Math.random() * 9000).toString();
        setRoomId(newRoomId);
        ws.send(JSON.stringify({
            type: 'createRoom',
            roomId: newRoomId,
            userId,
            userName,
            admin: userId
        }));
    };

    const joinRoom = () => {
        if (!ws || ws.readyState !== WebSocket.OPEN) {
            toast.error("Not connected to server. Please ensure backend is running.");
            return;
        }
        if (!roomId) {
            toast.error("Please enter a Room ID");
            return;
        }
        ws.send(JSON.stringify({
            type: 'joinRoom',
            roomId,
            userId,
            userName
        }));
    };

    const startGame = () => {
        if (!ws) return;
        const text = wordGenerator();
        ws.send(JSON.stringify({
            type: 'startGame',
            roomId,
            text
        }));
    };

    const copyRoomId = () => {
        navigator.clipboard.writeText(roomId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const resetGame = () => {
        setGameState('lobby');
        setHasFinished(false);
        setStartTime(null);
        setElapsedTime(0);
        setCurrentIndex(0);
        setText([]);
    };

    return (
        <div className="bg-[#181818] min-h-screen px-4 sm:px-8 md:px-20 pt-10 font-mono text-white">
            <div className='pb-10'>
                <Header />
            </div>

            <div className="flex flex-col items-center w-full max-w-6xl mx-auto">
                {gameState === 'setup' && (
                    <div className="w-full max-w-md space-y-8 mt-10">
                        <div className="text-center space-y-2">
                            <h1 className="text-3xl md:text-4xl font-bold text-yellow-500">Multiplayer</h1>
                            <p className="text-gray-400">Race against friends in real-time</p>
                        </div>

                        <div className="bg-[#2c2c2c] p-8 rounded-xl shadow-2xl space-y-6 border border-gray-700">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">Your Name</label>
                                <input 
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="w-full bg-[#181818] border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
                                    placeholder="Enter your name"
                                />
                            </div>
                            
                            <div className="space-y-4">
                                <button 
                                    onClick={createRoom}
                                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02]"
                                >
                                    Create New Room
                                </button>
                                
                                <div className="relative py-2">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-gray-600" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-[#2c2c2c] px-2 text-gray-400">Or join existing</span>
                                    </div>
                                </div>

                                <div className="flex space-x-2">
                                    <input 
                                        value={roomId}
                                        onChange={(e) => setRoomId(e.target.value)}
                                        placeholder="Room ID"
                                        className="flex-1 bg-[#181818] border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
                                    />
                                    <button 
                                        onClick={joinRoom}
                                        className="bg-gray-700 hover:bg-gray-600 text-white font-bold px-6 rounded-lg transition-all"
                                    >
                                        Join
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {gameState === 'lobby' && (
                    <div className="w-full max-w-4xl space-y-8 mt-10">
                        <div className="bg-[#2c2c2c] p-6 rounded-xl border border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex items-center space-x-4">
                                <div>
                                    <p className="text-sm text-gray-400">Room ID</p>
                                    <div className="flex items-center space-x-2">
                                        <h2 className="text-2xl font-bold font-mono tracking-wider">{roomId}</h2>
                                        <button onClick={copyRoomId} className="p-2 hover:bg-gray-700 rounded-full transition-colors" title="Copy Room ID">
                                            {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={startGame}
                                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg"
                            >
                                <Play size={20} />
                                <span>Start Game</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {users.map((user) => (
                                <div key={user.userId} className="bg-[#2c2c2c] p-4 rounded-xl border border-gray-700 flex items-center space-x-4 transition-all hover:border-gray-500">
                                    <div className="bg-gray-700 p-3 rounded-full">
                                        <Users size={24} className="text-yellow-500" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">{user.userName} {user.userId === userId && <span className="text-yellow-500 text-sm ml-2">(You)</span>}</p>
                                        <p className="text-gray-400 text-sm flex items-center">
                                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                                            Ready
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {gameState === 'game' && (
                    <div className="w-full flex flex-col gap-8">
                        {/* Timer and Progress Section */}
                        <div className="flex justify-between items-center bg-[#2c2c2c] p-4 rounded-lg border border-gray-700">
                            <div className="flex items-center space-x-2 text-yellow-500">
                                <Timer size={24} />
                                <span className="text-2xl font-bold">{elapsedTime}s</span>
                            </div>
                            <div className="text-gray-400">
                                {users.length} Players Racing
                            </div>
                        </div>

                        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                            {users.map((user) => (
                                <div key={user.userId} className={`bg-[#2c2c2c] p-4 rounded-lg border ${user.userId === userId ? 'border-yellow-500' : 'border-gray-700'}`}>
                                    <div className="flex justify-between mb-2">
                                        <span className="font-bold truncate">{user.userName}</span>
                                        <span className="text-yellow-500 font-mono">{user.progress} chars</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div 
                                            className="bg-yellow-500 h-2 rounded-full transition-all duration-300 ease-out" 
                                            style={{ width: `${totalChars > 0 ? Math.min((user.progress / totalChars) * 100, 100) : 0}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Game Area */}
                        <div className="relative text-[#333333] text-xl md:text-4xl font-mono overflow-hidden min-h-[300px]">
                            <Test />
                        </div>
                    </div>
                )}

                {gameState === 'results' && (
                    <div className="w-full max-w-4xl space-y-8 mt-10">
                        <div className="text-center space-y-4">
                            <Trophy size={64} className="text-yellow-500 mx-auto" />
                            <h1 className="text-4xl font-bold text-white">Race Finished!</h1>
                        </div>

                        <div className="bg-[#2c2c2c] rounded-xl border border-gray-700 overflow-hidden">
                            <div className="grid grid-cols-4 bg-gray-800 p-4 font-bold text-gray-300">
                                <div>Rank</div>
                                <div>Player</div>
                                <div>WPM</div>
                                <div>Accuracy</div>
                            </div>
                            {leaderboard.map((user, index) => (
                                <div key={user.userId} className={`grid grid-cols-4 p-4 border-t border-gray-700 ${user.userId === userId ? 'bg-yellow-500/10' : ''}`}>
                                    <div className="flex items-center">
                                        {index === 0 && <span className="text-2xl mr-2">🥇</span>}
                                        {index === 1 && <span className="text-2xl mr-2">🥈</span>}
                                        {index === 2 && <span className="text-2xl mr-2">🥉</span>}
                                        <span className="font-mono text-xl">#{index + 1}</span>
                                    </div>
                                    <div className="font-bold flex items-center">
                                        {user.userName}
                                        {user.userId === userId && <span className="ml-2 text-xs bg-yellow-500 text-black px-2 py-0.5 rounded-full">YOU</span>}
                                    </div>
                                    <div className="font-mono text-green-400 font-bold">{user.wpm || 0}</div>
                                    <div className="font-mono text-blue-400 font-bold">{user.accuracy || 0}%</div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center">
                            <button 
                                onClick={resetGame}
                                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 rounded-lg transition-all transform hover:scale-105"
                            >
                                Back to Lobby
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-20">
                <Footer />
            </div>
        </div>
    );
}

export default MultiPlayer;