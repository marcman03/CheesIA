// random.mjs
export class RandomPlayer {
  constructor(chess) {
    this.chess = chess;
  }

  makeMove(callback) {
    const possibleMoves = this.chess.moves();
    if (possibleMoves.length > 0) {
      const randomIdx = Math.floor(Math.random() * possibleMoves.length);
      this.chess.move(possibleMoves[randomIdx]);
    }
    callback();
  }

  close() {
    // No necesita hacer nada para el jugador aleatorio
  }
}
