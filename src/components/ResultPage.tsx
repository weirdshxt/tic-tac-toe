import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PlayerCard from "./PlayerCard";
import { Crown, Frown, RotateCcw, Star } from "lucide-react";

interface LocationState {
  winnerSymbol: "X" | "O" | "tie";
  winnerName?: string;
  playerName: string;
  playerSymbol: "X" | "O";
  secondPlayerName?: string;
  secondPlayerSymbol?: "X" | "O";
  loserSymbol?: "X" | "O";
}

const ResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | undefined;

  if (!state) {
    navigate("/", { replace: true });
    return null;
  }

  const {
    winnerSymbol,
    winnerName,
    playerName,
    playerSymbol,
    secondPlayerName = "Player 2",
    secondPlayerSymbol = playerSymbol === "X" ? "O" : "X",
    loserSymbol,
  } = state;

  const isTie = winnerSymbol === "tie";
  const isPlayerWinner = winnerSymbol === playerSymbol;
  const isSecondPlayerWinner = winnerSymbol !== "tie" && !isPlayerWinner;
  const isPlayerLoser = isPlayerWinner ? secondPlayerSymbol : playerSymbol;

  const congratsMessage = isTie
    ? "It's a tie!"
    : "Congratulations!";

  return (
    <div className="flex flex-col items-center justify-evenly h-screen bg-[#d22248] p-4">
      <h1 className="!text-5xl text-white font-bold font-cherry mt4">
        Tic <span className="text-yellow-400 font-cherry !text-5xl">Tac</span>{" "}
        Toe
      </h1>
      <div className="flex flex-col items-center justify-center bg-[#d22248] p-4">
        {!isTie ? (
          <>
            <div className="flex flex-col items-center mb-4">
              <Crown size={100} color="#fdbb0c" strokeWidth={1} />
              <div
                className={`text-4xl mb-4 font-cherry border-2 border-white bg-[#d22248] rounded-full p-4 px-6 shadow-2xl ${
                  winnerSymbol === "X" ? "text-yellow-400" : "text-white"
                }`}
              >
                {winnerSymbol}
              </div>
              <h2 className="font-bold shadow-2xl mb-8">
                {winnerName === "computer" ? "Hi" : ""} {winnerName}!
              </h2>
            </div>
            <div className="flex items-end mb-6">
              <Star size={60} color="#fdbb0c" fill="#fdbb0c" />
              <Star size={100} color="#fdbb0c" fill="#fdbb0c" />
              <Star size={60} color="#fdbb0c" fill="#fdbb0c" />
            </div>
            <h1 className="text-3xl font-bold text-center">
              {congratsMessage}
            </h1>
            <p className="text-center mb-6 font-semibold">You won the match</p>
            <div className="flex flex-col items-center mt-12">
              <div className="flex flex-col items-start relative bg-slate-100 p-8 py-4 mb-3 rounded-3xl shadow-lg max-w-xs min-w-[20rem]">
                <div
                  className={`text-4xl mb-4 font-cherry border-2 border-slate-100 absolute left-6 bottom-10 bg-[#d22248] rounded-full p-2 px-4 shadow-2xl ${
                    isPlayerLoser === "O" ? "text-white" : "text-yellow-400"
                  }`}
                >
                  {isPlayerLoser}
                </div>
                <h2 className="font-bold text-[1rem] text-black mt-2">
                  {secondPlayerName || playerName || "computer"}
                </h2>
                <p className="text-gray-500 text-xs font-bold opacity-50">
                  {winnerName === "computer" ? "Your" : ""} opponent
                </p>
                <button
                  className="mt-10 px-6 py-3 bg-yellow-500 rounded-3xl absolute right-4 bottom-4 hover:bg-yellow-600 transition"
                  onClick={() => navigate("/", { replace: true })}
                >
                  <RotateCcw />
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mb-12 flex flex-col items-center justify-center">
              <Crown size={100} color="#fdbb0c" strokeWidth={1} />
              <Frown size={130} color="#fdbb0c" strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl font-bold text-center">
              {congratsMessage}
            </h1>
            <p className="text-center mb-10 font-semibold">Well played both!</p>
            <div className="flex space-x-8">
              <div className="flex flex-col items-center">
                <PlayerCard
                  playerName={playerName}
                  playerSymbol={playerSymbol}
                />
              </div>
              <button
                className=" p-2 mb-6 mt-4 bg-yellow-500 rounded-3xl hover:bg-yellow-600 transition"
                onClick={() => navigate("/", { replace: true })}
              >
                <RotateCcw />
              </button>
              <div className="flex flex-col items-center">
                <PlayerCard
                  playerName={secondPlayerName}
                  playerSymbol={secondPlayerSymbol}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
