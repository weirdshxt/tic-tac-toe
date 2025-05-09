import React from "react";

interface CellProps {
  value: "X" | "O" | null;
  onClick: () => void;
  borderClassName?: string;
  isWinningCell?: boolean;
  winner?: "X" | "O" | null;
}

const Cell: React.FC<CellProps> = ({
  value,
  onClick,
  borderClassName = "",
  isWinningCell = false,
  winner = null,
}) => {
  let textColor = "text-black";
  let bgColor = "";

  if (isWinningCell) {
    if (winner === "X") {
      bgColor = "bg-yellow-400";
      textColor = "text-white";
    } else if (winner === "O") {
      bgColor = "bg-white";
      textColor = "text-[#d22248]";
    }
  } else {
    if (value === "X") {
      textColor = "text-yellow-400";
    } else if (value === "O") {
      textColor = "text-white";
    }
  }

  return (
    <button
      className={
        "w-20 h-20 flex items-center justify-center text-2xl font-bold font-cherry cursor-pointer border-dashed border-white p-2 " +
        textColor +
        " " +
        bgColor +
        " " +
        borderClassName
      }
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Cell;
