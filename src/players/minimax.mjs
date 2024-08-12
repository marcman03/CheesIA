// minimax.mjs

import { Chess } from 'chess.js';

export class MinimaxPlayer {
  constructor(chess, depth = 3) {
    this.chess = chess;
    this.depth = depth;
  }

  // Función de evaluación del tablero (simple)
  evaluateBoard() {
    const values = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 1000 };
    let heuristica = 0;
    
    this.chess.board().forEach(row => {
      row.forEach(piece => {
        if (piece) {
          const value = values[piece.type];
          heuristica += (piece.color === 'w' ? value : -value);
        }
      });
    });
    
    return heuristica;
  }

  // Implementación del algoritmo Minimax con poda alfa-beta
  minimax(depth, isMaximizingPlayer, alpha, beta) {
    if (depth === 0 || this.chess.isGameOver()) {
      return this.evaluateBoard();
    }

    const possibleMoves = this.chess.moves();
    if (isMaximizingPlayer) {
      let maxHeuristica = -Infinity;
      for (const move of possibleMoves) {
        this.chess.move(move);
        const heuristica = this.minimax(depth - 1, false, alpha, beta); // Cambio aquí
        this.chess.undo();
        maxHeuristica = Math.max(maxHeuristica, heuristica);
        alpha = Math.max(alpha, heuristica);
        if (beta <= alpha) break;
      }
      return maxHeuristica;
    } else {
      let minHeuristica = Infinity;
      for (const move of possibleMoves) {
        this.chess.move(move);
        const heuristica = this.minimax(depth - 1, true, alpha, beta); // Cambio aquí
        this.chess.undo();
        minHeuristica = Math.min(minHeuristica, heuristica);
        beta = Math.min(beta, heuristica);
        if (beta <= alpha) break;
      }
      return minHeuristica;
    }
  }

  // Método para hacer un movimiento basado en el algoritmo Minimax
  makeMove() {
    let bestMove = null;
    let bestValue = -Infinity;
    const possibleMoves = this.chess.moves();

    for (const move of possibleMoves) {
      this.chess.move(move);
      const boardHeuristica = this.minimax(this.depth - 1, false, -Infinity, Infinity);
      this.chess.undo();

      if (boardHeuristica > bestValue) {
        bestValue = boardHeuristica;
        bestMove = move;
      }
    }

    this.chess.move(bestMove);
    return bestMove;
  }
}
