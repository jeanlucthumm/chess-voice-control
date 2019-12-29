console.log('loaded');
main();

async function main() {
    let state_board = new Board();
    state_board.initialize(board);

    let move = 'e4';
    let [start, end] = state_board.getMoveCoordinates(move);
    console.log(start, end);
    start = chessToEuclidSpace(start.x, start.y);
    end = chessToEuclidSpace(end.x, end.y);
    // await animateMove(start.x, start.y, end.x, end.y, 900);
    await simpleMove(start, end);
}

function action() {
    let start = chessToEuclidSpace(4, 6);
    let end = chessToEuclidSpace(4, 4);
    animateMove(start[0], start[1], end[0], end[1], 2000);
}

document.addEventListener('keydown', (ev) => {
    if (ev.key === 'k' && ev.altKey) {
        action();
    }
});
