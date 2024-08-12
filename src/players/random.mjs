// random.mjs
import { Chess } from 'chess.js';

export class RandomPlayer {
  constructor(chess) {
    this.chess = chess;
  }

  makeMove(callback) {
    const possibleMoves = this.chess.moves();
    
    if (possibleMoves.length > 0) {
      const randomIdx = Math.floor(Math.random() * possibleMoves.length);
      this.chess.move(possibleMoves[randomIdx]);
      console.log(this.chess.ascii());
    }
    
    if (callback && typeof callback === 'function') {
      callback();
    }
  }
}
