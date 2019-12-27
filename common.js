const board = document.getElementsByTagName('cg-board')[0];

// coord from bottom left
function chessToEuclidSpace(x, y) {
    let rect = board.getBoundingClientRect();
    let xStep = rect.width / 8;
    let yStep = rect.height / 8;

    return [
        rect.x + x * xStep + xStep / 2,
        rect.y + y * yStep + yStep / 2
    ];
}

function euclidToChessSpace(x, y) {
    let rect = board.getBoundingClientRect();
    let xStep = rect.width / 8;
    let yStep = rect.height / 8;

    return [
        Math.floor((x - rect.x) / xStep + 0.005),
        Math.floor((y - rect.y) / yStep + 0.005)
    ];
}
