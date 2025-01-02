interface TestCardProps {
    title: string,
    totalTest: number
    icon: React.ReactNode

}


const TestCard = ({ title, icon, totalTest }: TestCardProps) => {

    return (
        <div className = {`w-2/5 h-32 p-5 mt-10 rounded-md bg-[#1e1e1e] border-2 border-gray-500 text-center text-white font-bold drop-shadow-2xl`}>
            <div className = 'flex justify-between text-xl'>
                <div>
                    { title }
                </div>
                <div>
                    {icon}
                </div>
            </div>
            <div className = 'flex space-x-3 justify-center mt-3'>
                <div className = 'text-bold text-2xl'>
                    { totalTest }
                </div>
                <div className = 'text-gray-400 mt-1'>
                    Tests
                </div>
            </div>
        </div>
    )
}

export default TestCard;