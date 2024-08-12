// index.mjs
import { Chess } from 'chess.js';
import { RandomPlayer } from './random.mjs';
import { MinimaxPlayer } from './minimax.mjs';

const chess = new Chess();

// Puedes cambiar los jugadores aquí según lo desees
const whitePlayer = new MinimaxPlayer(chess, 3);  // Jugador Minimax
const blackPlayer = new RandomPlayer(chess);     // Jugador Aleatorio

function checkGameOver() {
  if (chess.isCheckmate()) {
    console.log('Checkmate!');
    if (chess.turn() === 'b') {
      console.log('White wins!');
    } else {
      console.log('Black wins!');
    }
    return true;
  } else if (chess.isDraw()) {
    if (chess.isStalemate()) {
      console.log('Stalemate!');
    } else if (chess.isThreefoldRepetition()) {
      console.log('Draw by threefold repetition!');
    } else if (chess.isInsufficientMaterial()) {
      console.log('Draw by insufficient material!');
    } else {
      console.log('Draw!');
    }
    return true;
  }
  return false;
}

function gameLoop() {

  if (chess.turn() === 'w') {
    whitePlayer.makeMove();
  } else {
    blackPlayer.makeMove();
  }

  console.log(chess.ascii());
  setTimeout(gameLoop, 500); // Hace una pausa para mostrar el tablero
}

console.log('Starting game...');
console.log(chess.ascii());
gameLoop();
