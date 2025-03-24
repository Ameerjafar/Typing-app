interface RankingCardProps {
    second: number,
    ranking: string,
    BestUserScore: number,
    icon1: React.ReactNode,
    icon2: React.ReactNode
}


const RankingCard = ({ second, ranking, BestUserScore, icon1, icon2 }: RankingCardProps) => {

    return (
        <div className = {`w-2/5 h-60 p-5 mt-10 rounded-md bg-[#1e1e1e] border-2 border-gray-500 text-center text-white font-bold drop-shadow-2xl`}>
            <div className = 'flex justify-between text-xl'>
                <div>
                    { second }s Ranking 
                </div>
                <div>
                    {icon1}
                </div>
            </div>
            <div className = 'flex space-x-3 justify-center mt-3'>
                <div className = 'text-bold text-2xl mt-2'>
                    { icon2 }
                </div>
                {
                <div className='text-white text-3xl mt-1'>
                {ranking !== "0" ? `#${ranking}` : '-'}
              </div>
                }
            </div>
            <hr className = 'w-full text-gray-2 my-6'></hr>
            <div className = 'text-2xl mt-2 mb-3'>Your Best Typed</div>
            <div className = 'flex text-xl space-x-4 justify-center '>
                <div className = 'pb-10'>
                    { BestUserScore !== 0 ? BestUserScore : '-' }
                </div>
                <div className = 'text-gray-400'>
                    WPM 
                </div>
            </div>
        </div>
    )
}

export default RankingCard;