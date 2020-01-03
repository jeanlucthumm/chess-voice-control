console.log('loaded');
main();

let state_board = new Board();

async function main() {
    // let state_board = new Board();
    // state_board.initialize(board);
    //
    // let move = 'e4';
    // let [start, end] = state_board.getMoveCoordinates(move);
    // console.log(start, end);
    // start = chessToEuclidSpace(start.x, start.y);
    // end = chessToEuclidSpace(end.x, end.y);
    // await animateMove(start.x, start.y, end.x, end.y, 900);
    // await simpleMove(start, end);

    injectModal();
}

function injectModal() {
    // CSS
    let style = document.createElement('link');
    style.id = 'chess-voice-control-stylesheet';
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = chrome.extension.getURL('indicator.css');
    (document.head || document.documentElement).appendChild(style);

    // HTML
    let div = document.createElement('div');
    div.id = 'chess-voice-control-content-wrapper';
    document.body.appendChild(div);

    let request = new XMLHttpRequest();
    request.open('GET', chrome.extension.getURL('indicator.html'));
    request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
            div.innerHTML = request.responseText;
        }
        setupModal();
        setupState();
    };
    request.send();
}

function setupModal() {
    let indicator = document.getElementById('chess-voice-control-indicator');
    if (indicator == null) console.error("Could not find injected modal");
    indicator.src = chrome.extension.getURL('images/green-circle.svg');

    let input = document.getElementById('chess-voice-control-text-input');
    input.addEventListener('keydown', ev => {
        if (ev.key === 'Enter') {
            let move = input.value;
            input.value = '';
            makeMove(move);
        }
    });
}

function setupState() {
    let board = document.getElementsByTagName('cg-board')[0];
    state_board.initialize(board);
}

async function makeMove(move) {
    let board = document.getElementsByTagName('cg-board')[0];
    state_board.update(board);
    state_board.debugDump();
    let [start, end] = state_board.getMoveCoordinates(move);
    start = chessToEuclidSpace(start.x, start.y, board);
    end = chessToEuclidSpace(end.x, end.y, board);
    await simpleMove(start, end, board);
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
