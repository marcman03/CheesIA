// app.js
$(document).ready(function() {
    var board = ChessBoard('board', {
      draggable: true,
      position: 'start',
      onDrop: handleMove
    });
  
    $('#moveButton').on('click', function() {
      $.get('/get-move', function(data) {
        if (data.move) {
          board.move(data.move);
          console.log('Move made: ' + data.move);
        } else {
          alert(data.message);
        }
      });
    });
  
    function handleMove(oldPos, newPos, piece) {
      console.log('Move from ' + oldPos + ' to ' + newPos + ' with piece ' + piece);
    }
  });
  