console.log('loaded');

function action() {
    let start = chessToEuclidSpace(4, 6);
    let end = chessToEuclidSpace(4, 4);
    animateMove(start[0], start[1], end[0], end[1], 500);
}

document.addEventListener('keydown', (ev) => {
    if (ev.key === 'k' && ev.altKey) {
        action();
    }
});

let state_board = new Board();
state_board.initialize(board);

console.log(state_board.getMoveCoordinates("Bxb7"));


// document.addEventListener('mousemove', (ev) => {
//   console.log(ev);
// });

// board.addEventListener('mousedown', (ev) => {
//   console.log(ev);
// });
