console.log('loaded');
main();

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
    request.send();
    request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
            div.innerHTML = request.responseText;
        }
        let indicator = document.getElementById('chess-voice-control-indicator');
        if (indicator == null) console.error("Could not find injected modal");
        indicator.src = chrome.extension.getURL('images/green-circle.svg');
    };
    request.send();
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
