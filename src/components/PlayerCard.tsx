import React from 'react'

interface PlayerCardProps {
  playerName: string;
    playerSymbol: "X" | "O";
}

const PlayerCard: React.FC<PlayerCardProps> = ({playerName, playerSymbol}) => {
  return (
    <>
        <div className="flex flex-col items-center justify-center bg-slate-100 p-2 py-5 mb-3 rounded-3xl shadow-lg max-w-[8rem] min-w-[6rem]">
            <h2 className="font-bold text-sm text-black mb-2">{playerName}</h2>
            <div className={`text-4xl font-cherry bg-[#d22248] rounded-lg px-4 py-1 ${playerSymbol === "X" ? "text-yellow-400" : "text-white"}`}>
            {playerSymbol}
            </div>
        </div>
    </>
  )
}

export default PlayerCard