// manual.mjs
import readline from 'readline';

export class ManualPlayer {
  constructor(chess) {
    this.chess = chess;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  makeMove(callback) {
    this.rl.question('Enter your move: ', (move) => {
      const result = this.chess.move(move);
      if (!result) {
        console.log('Invalid move! Try again.');
        this.makeMove(callback);
      } else {
        callback();
      }
    });
  }

  close() {
    this.rl.close();
  }
}
