import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Board from "./Board";
import ScoreBoard from "./ScoreBoard";
import { Angry, History, LogOut} from "lucide-react";
import { getAIMove } from "./aiImproved";

type SquareValue = "X" | "O" | null;

interface LocationState {
  playerSymbol: "X" | "O";
  opponent: "computer" | "player";
  playerName: string;
  secondPlayerName?: string;
}

const calculateWinner = (squares: Array<SquareValue>) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const getRandomMove = (squares: Array<SquareValue>): number | null => {
  const emptyIndices = squares
    .map((val, idx) => (val === null ? idx : null))
    .filter((val): val is number => val !== null);
  if (emptyIndices.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * emptyIndices.length);
  return emptyIndices[randomIndex];
};

const Game: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | undefined;

  if (!state) {
    // Redirect to start page if no state
    navigate("/", { replace: true });
    return null;
  }

  const { playerSymbol, opponent, playerName, secondPlayerName } = state;

  // Helper function to get random boolean
  const getRandomBoolean = () => Math.random() < 0.5;

  // Initialize startingPlayer randomly on first load
  const [startingPlayer, setStartingPlayer] = useState<"X" | "O">(() => {
    const initial = getRandomBoolean() ? "X" : "O";
    console.log("Initial startingPlayer:", initial);
    return initial;
  });

  const [history, setHistory] = useState<Array<Array<SquareValue>>>([
    Array(9).fill(null),
  ]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  // Initialize xIsNext based on startingPlayer
  const [xIsNext, setXIsNext] = useState<boolean>(startingPlayer === "X");
  const [scores, setScores] = useState<Record<"X" | "O", number>>({
    X: 0,
    O: 0,
  });
  const [tieCount, setTieCount] = useState<number>(0);
  const [roundsPlayed, setRoundsPlayed] = useState<number>(1);
  const [vsComputer, setVsComputer] = useState<boolean>(
    opponent === "computer"
  );

  const computerSymbol = playerSymbol === "X" ? "O" : "X"; // Determine computer's symbol
  const currentSquares = history[currentMove];
  const winner = calculateWinner(currentSquares);
  const isDraw = !winner && currentSquares.every((square) => square !== null);


  const handlePlay = (nextSquares: Array<SquareValue>) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);

    const newWinner = calculateWinner(nextSquares);
    if (newWinner) {
      setScores((prevScores) => ({
        ...prevScores,
        [newWinner]: (prevScores[newWinner] || 0) + 1,
      }));
    }
  };

  const jumpTo = (move: number) => {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
  };

  const [autoReset, setAutoReset] = useState<boolean>(true);
  const [autoResetTimer, setAutoResetTimer] = useState<number | null>(null);

  const handleRestart = () => {
    if (scores[playerSymbol] >= 3 || scores[computerSymbol] >= 3 || roundsPlayed >= 5) {
      // Do not allow restart if match is over
      return;
    }
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    console.log("Restarting round. startingPlayer:", startingPlayer);
    // Set xIsNext to startingPlayer for the new round
    setXIsNext(startingPlayer === "X");
    setRoundsPlayed((prev) => prev + 1);
  };

  // Effect to handle automatic reset after round completion
  useEffect(() => {
    if ((winner || isDraw) && autoReset) {
      if (autoResetTimer) {
        clearTimeout(autoResetTimer);
      }
      const timer = setTimeout(() => {
        // Update startingPlayer based on winner or random if draw
        if (winner) {
          console.log("Round ended. Winner:", winner);
          setStartingPlayer(winner);
        } else if (isDraw) {
          const randomStart = getRandomBoolean() ? "X" : "O";
          console.log("Round ended in draw. Random startingPlayer:", randomStart);
          setStartingPlayer(randomStart);
        }
        handleRestart();
      }, 2000);
      setAutoResetTimer(timer);
      return () => clearTimeout(timer);
    }
    // Clear timer if round changes or autoReset is false
    if (autoResetTimer) {
      clearTimeout(autoResetTimer);
      setAutoResetTimer(null);
    }
  }, [winner, isDraw, autoReset]);

  // Effect for computer move
  useEffect(() => {
    if (
      vsComputer &&
      !winner &&
      !isDraw &&
      xIsNext !== (playerSymbol === "X") // Computer's turn
    ) {
      const timer = setTimeout(() => {
        // Use improved AI move function
        const move = getAIMove(currentSquares, computerSymbol, playerSymbol, "hard");
        if (move !== null) {
          const newSquares = currentSquares.slice();
          newSquares[move] = computerSymbol;
          handlePlay(newSquares);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [
    vsComputer,
    winner,
    isDraw,
    xIsNext,
    currentSquares,
    currentMove,
    computerSymbol,
  ]);

  // Effect to increment tie count when game ends in draw
  useEffect(() => {
    if (isDraw) {
      setTieCount((prev) => prev + 1);
      setRoundsPlayed((prev) => prev + 1);
    }
  }, [isDraw]);

  // Effect to check for overall winner (3 out of 5 rounds) or max rounds played
  useEffect(() => {
    if (
      scores[playerSymbol] >= 3 ||
      scores[computerSymbol] >= 3 ||
      roundsPlayed >= 5
    ) {
      const overallWinnerSymbol =
        scores[playerSymbol] > scores[computerSymbol]
          ? playerSymbol
          : scores[computerSymbol] > scores[playerSymbol]
          ? computerSymbol
          : "tie";

      const winnerName = overallWinnerSymbol === playerSymbol ? playerName : (vsComputer ? "Computer" : (secondPlayerName || "Player"));
      navigate("/result", {
        state: {
          winnerSymbol: overallWinnerSymbol,
          winnerName,
          playerName,
          playerSymbol,
          secondPlayerName,
          secondPlayerSymbol: computerSymbol,
        },
        replace: true,
      });
    }
  }, [scores, playerSymbol, computerSymbol, roundsPlayed, navigate, playerName, secondPlayerName]);


  const moves = history.map((squares, move) => {
    const description = move ? `Move #${move}` : "Game started";
    return (
      <li key={move} className="flex flex-col items-center justify-center">
        <button
          className="text-yellow-500 font-bold hover:underline active:!text-white active:!bg-[#d22248] "
          onClick={() => jumpTo(move)}
          disabled={move === currentMove}
        >
          {description}
        </button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "It's a draw!";
  } else {
    status = `Turn: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full h-screen  bg-pink-200">
      <ScoreBoard
        player1Name={playerName}
        player1Score={scores[playerSymbol]}
        player1Symbol={playerSymbol}
        player2Name={vsComputer ? "Computer" : secondPlayerName || "Player"}
        player2Score={scores[computerSymbol]}
        player2Symbol={computerSymbol}
        roundsPlayed={roundsPlayed}
        tieCount={tieCount}
      />

      <div className="mb-4 rounded-3xl relative bg-yellow-500 py-2 px-4 text-black text-xs font-bold">
        {status}
      </div>


      <Board
        squares={currentSquares}
        onPlay={handlePlay}
        xIsNext={xIsNext} // Pass xIsNext to the Board
        disabled={
          !!winner ||
          isDraw ||
          (vsComputer &&
            ((playerSymbol === "X" && !xIsNext) ||
              (playerSymbol === "O" && xIsNext)))
        }
      />
      <button
        className="mt-4 rounded-3xl shadow-lg bg-yellow-500 py-2 px-4 text-black text-xs font-bold"
        onClick={() => setAutoReset(!autoReset)}
      >
        {autoReset ? "Pause" : "Resume"}
      </button>

      <div className="flex items-center justify-between md:min-w-[25rem] min-w-[20rem] mt-10">
        <button
          className="mt-2 px-4 py-2 bg-[#d22248] text-yellow-300 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out"
          onClick={() => {
            navigate("/");
          }}
        >
          <LogOut />
        </button>

        <div className="dropdown dropdown-left dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn m-1 bg-slate-100 border-none shadow-lg rounded-2xl hover:scale-105 transition-transform duration-200 ease-in-out"
          >
            <History color="#d22248" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-slate-100 border-yellow-400 border-2 rounded-box z-1 w-36 p-1 shadow-lg"
          >
            {moves}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Game;
