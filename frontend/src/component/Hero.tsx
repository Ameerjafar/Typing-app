import { useEffect, useState } from "react";
import axios from 'axios'
const Hero = () => {
    const [paragraph, setParagraph] = useState("");
    const [ userInput, setUserInput ] = useState("");
    const [countCharacter, setCountCharacter ] = useState(0);
    const [ wpm, setWpm ] = useState<number>(0);
    useEffect(() => {
        const fetchParagraph = async () => {
            console.log(import.meta.env.VITE_API_PATH);
            const response = await axios.get(`${import.meta.env.VITE_APT_PATH}`);
            console.log(paragraph);
            setParagraph(response.data.paragraph);
        }
        fetchParagraph();
    }, [])

    const handleInput = (e: any) => {
        setUserInput(e.target.value);
        console.log(userInput.length)
        console.log(userInput[countCharacter] === paragraph[countCharacter])
        if(userInput[countCharacter] === paragraph[countCharacter]) {
            setCountCharacter(userInput.length);
            setWpm(Math.ceil((countCharacter % 5) % 60))
        }

    }
    return (
        <div className = 'mt-32 text-white text-4xl pb-10 text-left'>
            <textarea className = 'text-black' onChange = {(e) =>  handleInput(e) }></textarea>
            <div className = 'mt-2 line-clamp-3 space-x-3'>
                { paragraph }
            </div>
        </div>
    )
}

export default Hero;