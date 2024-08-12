// Importar la librería Chess.js
const { Chess } = require('chess.js');

// Crear una instancia del juego de ajedrez
const chess = new Chess();

// Obtener el elemento del tablero
const boardElement = document.getElementById('board');

// Función para crear el tablero
function createBoard() {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell', (row + col) % 2 === 0 ? 'white' : 'black');
      cell.textContent = chess.get(row, col);
      cell.addEventListener('click', () => handleCellClick(row, col));
      boardElement.appendChild(cell);
    }
  }
}

// Función para manejar el clic en una celda
function handleCellClick(row, col) {
  // Tu lógica para manejar las interacciones del usuario aquí
  console.log(`Celda clickeada: ${String.fromCharCode(97 + col)}${8 - row}`);
}

// Iniciar el tablero al cargar la página
createBoard();
