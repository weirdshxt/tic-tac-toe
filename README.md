# Tic-Tac-Toe Game

This is a React-Typescript based Tic-Tac-Toe game with support for playing against another player or the computer. The game features animated UI elements and automatic round resets.

## Features

- Play against another player or the computer (AI).
- Randomly selects the starting player each round.
- Keeps track of scores for both players.
- Displays the current turn and game status.
- Automatically resets the board after a round ends (win or draw).
- Supports up to 5 rounds or until a player wins 3 rounds.
- Responsive and styled with Tailwind CSS.
- Move history with the ability to jump to previous moves.
- Result page showing the overall winner.

## How to Run

1. Clone the repository.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser and navigate to the local server (usually `http://localhost:3000`).

## How to Play

- Choose to play against the computer or another player.
- Select your symbol (X or O).
- Take turns clicking on the board to place your symbol.
- The game automatically detects wins, draws, and updates scores.
- When a draw occurs, a big animated "T" symbol is displayed for 2 seconds before the board resets.
- The game ends after 5 rounds or when a player reaches 3 wins, then shows the result page.

## Technologies Used

- React with TypeScript
- React Router for navigation
- Tailwind CSS for styling and animations
- Custom AI logic for computer moves

## File Structure

- `src/components/` - React components including Game, Board, ScoreBoard, etc.
- `src/aiImproved.js` - AI logic for computer moves.
- `public/` - Static assets.
- `tic-tac-toe/` - Project root with configuration files.

## License

This project is open source and free to use.
