import React from "react";
import Cell from "./Cell";
import { Angry } from "lucide-react";

interface BoardProps {
  squares: Array<"X" | "O" | null>;
  onPlay: (nextSquares: Array<"X" | "O" | null>) => void;
  xIsNext: boolean; // Add xIsNext as a prop
  disabled: boolean;
}

interface WinnerResult {
  winner: "X" | "O" | null;
  line: number[] | null;
}

const calculateWinner = (squares: Array<string | null>): WinnerResult => {
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
      return { winner: squares[a] as "X" | "O", line: lines[i] };
    }
  }
  return { winner: null, line: null };
};

const Board: React.FC<BoardProps> = ({
  squares,
  onPlay,
  xIsNext,
  disabled,
}) => {
  const { winner, line } = calculateWinner(squares);

  const handleClick = (index: number) => {
    if (squares[index] || winner || disabled) return;

    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? "X" : "O"; // Use xIsNext to determine the symbol
    onPlay(newSquares);
  };

  const getBorderClass = (index: number) => {
    let classes = "";
    if (index % 3 !== 2) {
      classes += " border-r-[1.5px] ";
    }
    if (index < 6) {
      classes += " border-b-[1.5px] ";
    }
    return classes.trim();
  };

  return (
    <div className="flex flex-col items-center border-dashed bg-slate-50 border-[#d22248] border-2 rounded-lg p-1 shadow-lg">
      <div className="grid grid-cols-3 gap-0 rounded-lg bg-[#d22248] w-60 h-60">
        {squares.map((val, index) => (
          <Cell
            key={index}
            value={val}
            onClick={() => handleClick(index)}
            borderClassName={getBorderClass(index)}
            isWinningCell={line ? line.includes(index) : false}
            winner={winner}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
