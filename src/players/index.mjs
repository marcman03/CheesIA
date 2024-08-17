import { Chess } from 'chess.js';
import { RandomPlayer } from './random.mjs';
import { MinimaxPlayer } from './minimax.mjs';
import fs from 'fs';

const chess = new Chess();
const whitePlayer = new MinimaxPlayer(chess, 3);
const blackPlayer = new RandomPlayer(chess);

function writeBoardState() {
  const boardState = {
    position: chess.fen(),
    ascii: chess.ascii()
  };
  fs.writeFileSync('board_state.json', JSON.stringify(boardState));
}

function checkGameOver() {
  if (chess.isCheckmate() || chess.isDraw()) {
    writeBoardState();
    return true;
  }
  return false;
}

function gameLoop() {
  if (checkGameOver()) return;

  if (chess.turn() === 'w') {
    whitePlayer.makeMove();
  } else {
    blackPlayer.makeMove();
  }

  writeBoardState();
  console.log(chess.ascii());
  setTimeout(gameLoop, 500); // Hace una pausa para mostrar el tablero
}

console.log('Starting game...');
console.log(chess.ascii());
writeBoardState();
gameLoop();
