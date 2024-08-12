// server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { Chess } from 'chess.js';

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const chess = new Chess();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/get-move', (req, res) => {
  const possibleMoves = chess.moves();
  if (possibleMoves.length > 0) {
    const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    chess.move(randomMove);
    res.json({ move: randomMove, board: chess.ascii() });
  } else {
    res.json({ message: 'Game over' });
  }
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
