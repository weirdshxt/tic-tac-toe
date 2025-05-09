import React from 'react'
import PlayerCard from './PlayerCard';

interface ScoreBoardProps {
  player1Score: number;
    player2Score: number;
    player1Name: string;
    player2Name: string;
    player1Symbol: "X" | "O";
    player2Symbol: "X" | "O";
    roundsPlayed: number;
    tieCount: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({player1Name, player1Score, player1Symbol, player2Name, player2Score, player2Symbol , roundsPlayed, tieCount}) => {
  return (
    <div className="flex flex-row justify-between items-center p-2 mb-4 rounded-3xl md:min-w-[25rem] sm:max-w-[20rem]">
      <div className="flex flex-col items-center justify-center ">
        <PlayerCard playerName={player1Name} playerSymbol={player1Symbol} />
        <div className="rounded-3xl text-xs font-bold p-1 px-2 border-2 bg-slate-100 border-yellow-300 text-yellow-400">
          Won Rounds: {player1Score}{" "}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center mb-4 rounded-full w-16 h-16 p-4 bg-yellow-500 text-black shadow-lg">
          <p className="text-xl font-bold">{roundsPlayed}</p>
          <p className='text-[0.6rem] font-bold'>Round</p>
        </div>
        <div className="text-black text-xs font-bold ">
          Draw: <span className='text-[#d22248]'>{tieCount} Times</span>{" "}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center ">
        <PlayerCard playerName={player2Name} playerSymbol={player2Symbol} />
        <div className="rounded-3xl text-xs font-bold p-1 px-2 border-2 bg-slate-100 border-yellow-300 text-yellow-400">
          Won Rounds: {player2Score}{" "}
        </div>
      </div>
    </div>
  );
}

export default ScoreBoard