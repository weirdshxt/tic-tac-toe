/**
 * Improved AI logic for Tic-Tac-Toe
 * Adds fork creation and blocking, prioritizes corners and edges,
 * and supports difficulty levels.
 */

const winningPaths = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Helper to find empty indices on the board
function getEmptyIndices(board) {
  return board
    .map((val, idx) => (val === null || val === 0 ? idx : null))
    .filter((val) => val !== null);
}

// Check if player can win in next move and return winning index
function findWinningMove(board, player) {
  for (const path of winningPaths) {
    const marks = path.map((idx) => board[idx]);
    const countPlayer = marks.filter((m) => m === player).length;
    const countEmpty = marks.filter((m) => m === null || m === 0).length;
    if (countPlayer === 2 && countEmpty === 1) {
      const emptyIndex = path.find((idx) => board[idx] === null || board[idx] === 0);
      return emptyIndex;
    }
  }
  return null;
}

// Check if player can create a fork
function findForkMove(board, player) {
  const emptyIndices = getEmptyIndices(board);
  for (const idx of emptyIndices) {
    const boardCopy = board.slice();
    boardCopy[idx] = player;
    let winningMoves = 0;
    for (const path of winningPaths) {
      const marks = path.map((i) => boardCopy[i]);
      const countPlayer = marks.filter((m) => m === player).length;
      const countEmpty = marks.filter((m) => m === null || m === 0).length;
      if (countPlayer === 2 && countEmpty === 1) {
        winningMoves++;
      }
    }
    if (winningMoves >= 2) {
      return idx;
    }
  }
  return null;
}

// Block opponent's fork
function blockOpponentFork(board, player, opponent) {
  // Try to force opponent to block by playing in a position that creates two in a row
  const emptyIndices = getEmptyIndices(board);
  for (const idx of emptyIndices) {
    const boardCopy = board.slice();
    boardCopy[idx] = player;
    if (findForkMove(boardCopy, opponent) === null) {
      return idx;
    }
  }
  return null;
}

// Prioritize center, corners, edges
function pickStrategicMove(board) {
  if (board[4] === null || board[4] === 0) {
    return 4; // center
  }
  const corners = [0, 2, 6, 8];
  const emptyCorners = corners.filter((i) => board[i] === null || board[i] === 0);
  if (emptyCorners.length > 0) {
    return emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
  }
  const edges = [1, 3, 5, 7];
  const emptyEdges = edges.filter((i) => board[i] === null || board[i] === 0);
  if (emptyEdges.length > 0) {
    return emptyEdges[Math.floor(Math.random() * emptyEdges.length)];
  }
  return null;
}

// Main AI move function
function getAIMove(board, aiPlayer, humanPlayer, difficulty = "hard") {
  // difficulty can be "easy", "medium", "hard"
  if (difficulty === "easy") {
    // random move
    const empty = getEmptyIndices(board);
    return empty[Math.floor(Math.random() * empty.length)];
  }

  // Check if AI can win
  let move = findWinningMove(board, aiPlayer);
  if (move !== null) return move;

  // Block human win
  move = findWinningMove(board, humanPlayer);
  if (move !== null) return move;

  if (difficulty === "medium") {
    // Medium difficulty: random between strategic and random
    if (Math.random() < 0.5) {
      move = pickStrategicMove(board);
      if (move !== null) return move;
    }
    const empty = getEmptyIndices(board);
    return empty[Math.floor(Math.random() * empty.length)];
  }

  // Hard difficulty: try forks
  move = findForkMove(board, aiPlayer);
  if (move !== null) return move;

  // Block opponent fork
  move = findForkMove(board, humanPlayer);
  if (move !== null) {
    const blockMove = blockOpponentFork(board, aiPlayer, humanPlayer);
    if (blockMove !== null) return blockMove;
  }

  // Pick strategic move
  move = pickStrategicMove(board);
  if (move !== null) return move;

  // Fallback random
  const empty = getEmptyIndices(board);
  return empty[Math.floor(Math.random() * empty.length)];
}

export { getAIMove };
