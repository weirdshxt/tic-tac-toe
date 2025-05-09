import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StartPage: React.FC = () => {
  const [playerSymbol, setPlayerSymbol] = useState<"X" | "O">("X");
  const [opponent, setOpponent] = useState<"computer" | "player">("computer");
  const [playerName, setPlayerName] = useState<string>("");
  const [secondPlayerName, setSecondPlayerName] = useState<string>("");

  const navigate = useNavigate();

  const handleStart = () => {
    if (playerName.trim() === "") {
      alert("Please enter your name");
      return;
    }
    if (opponent === "player" && secondPlayerName.trim() === "") {
      alert("Please enter the second player's name");
      return;
    }
    navigate("/game", {
      state: {
        playerSymbol,
        opponent,
        playerName: playerName.trim(),
        secondPlayerName: secondPlayerName.trim(),
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center text-black h-screen bg-[#d22248] p-4">
      <h1 className="!text-5xl text-white font-bold mb-6 font-cherry">
        Tic <span className="text-yellow-400 font-cherry !text-5xl">Tac</span>{" "}
        Toe
      </h1>

      <div className="border-red-500 border-2 rounded-lg p-6 shadow-lg max-w-xs bg-slate-50">
        <div className="mb-4">
          <label className="block mb-2 font-semibold">
            Choose your symbol:
          </label>
          <div className="flex space-x-4">
            <button
              className={`px-6 py-3 rounded-lg border-2 font-cherry text-yellow-300 bg-[#d22248] ${
                playerSymbol === "X"
                  ? "bg-yellow-300 !text-white border-[#d22248] scale-110"
                  : "border-gray-300"
              }`}
              onClick={() => setPlayerSymbol("X")}
            >
              X
            </button>
            <button
              className={`px-6 py-3 rounded-lg border-2 font-cherry text-white bg-[#d22248] ${
                playerSymbol === "O"
                  ? "border-red-500 bg-white !text-[#d22248] scale-110"
                  : "border-gray-300"
              }`}
              onClick={() => setPlayerSymbol("O")}
            >
              O
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Choose opponent:</label>
          <div className="flex space-x-4">
            <button
              className={`px-6 py-3 rounded border-2 ${
                opponent === "player"
                  ? "border-[#d22248] bg-[#f9a4b7]"
                  : "border-gray-300"
              }`}
              onClick={() => setOpponent("player")}
            >
              Player
            </button>
            <button
              className={`px-6 py-3 rounded border-2 ${
                opponent === "computer"
                  ? "border-yellow-500 bg-yellow-200"
                  : "border-gray-300"
              }`}
              onClick={() => setOpponent("computer")}
            >
              Computer
            </button>
          </div>
        </div>

        <div className="mb-6 w-full max-w-xs">
          <input
            id="playerName"
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d22248] active:bg-[#f9a4b7]"
            placeholder="Your name"
          />
        </div>

        {opponent === "player" && (
          <div className="mb-6 w-full max-w-xs">
            <input
              id="secondPlayerName"
              type="text"
              value={secondPlayerName}
              onChange={(e) => setSecondPlayerName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 active:bg-yellow-200"
              placeholder="Second player's name"
            />
          </div>
        )}

        <button
          onClick={handleStart}
          className="px-6 py-2 font-semibold bg-yellow-500 text-black rounded-3xl hover:bg-yellow-400"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default StartPage;
