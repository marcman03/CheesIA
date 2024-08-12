// index.mjs
import { Chess } from 'chess.js';
import { RandomPlayer } from './random.mjs';
import { ManualPlayer } from './manual.mjs';

// Instanciar el juego de ajedrez
const chess = new Chess();

// Instanciar los jugadores (puedes cambiar estos para alternar entre tipos de jugadores)
const whitePlayer = new RandomPlayer(chess);
const blackPlayer = new RandomPlayer(chess);

function checkGameOver() {
  if (chess.isCheckmate()) {
    console.log('Checkmate!');
    console.log(chess.turn() === 'b' ? 'White wins!' : 'Black wins!');
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
  if (checkGameOver()) {
    whitePlayer.close?.(); // Cierra si es un jugador manual
    blackPlayer.close?.(); // Cierra si es un jugador manual
    return;
  }

  const currentPlayer = chess.turn() === 'w' ? whitePlayer : blackPlayer;
  currentPlayer.makeMove(() => {
    console.log(chess.ascii());
    gameLoop(); // Continuar con el siguiente movimiento
  });
}

console.log('Starting game...');
console.log(chess.ascii());
gameLoop();
