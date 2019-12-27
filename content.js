console.log('loaded');

function action() {
  let start = chessToEuclidSpace(4, 6);
  let end = chessToEuclidSpace(4, 4);
  animateMove(start[0], start[1], end[0], end[1], 500);
}

document.addEventListener('keydown', (ev) => {
  console.log(ev.key); // DEBUG
  if (ev.key === 'k' && ev.altKey) {
    action();
  }
});

let state_board = new Board();
state_board.initialize(board);
state_board.debugDump();

// document.addEventListener('mousemove', (ev) => {
//   console.log(ev);
// });

// board.addEventListener('mousedown', (ev) => {
//   console.log(ev);
// });
