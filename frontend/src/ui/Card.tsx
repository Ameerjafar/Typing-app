interface CardProps {
    second: number,
    wpm: string,
    icon: React.ReactNode;

}
const Card = ({second, wpm, icon}: CardProps) => {

    return (
        <div className = {`w-72 h-32 p-5 mt-10 rounded-md bg-[#1e1e1e] border-2 border-gray-500 text-center text-white font-bold drop-shadow-2xl`}>
            <div className = 'flex justify-between text-xl'>
                <div>
                    {second}s Average
                </div>
                <div>
                    {icon}
                </div>
            </div>
            <div className = 'flex space-x-3 justify-center mt-3'>
                <div className = 'text-bold text-2xl'>
                    { wpm }
                </div>
                <div className = 'text-gray-400 mt-1'>
                    WPM
                </div>
            </div>
        </div>
    )
}

export default Card;