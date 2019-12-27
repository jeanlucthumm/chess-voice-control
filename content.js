const board = document.getElementsByTagName('cg-board')[0];
console.log('loaded');

// Sample coordinates: (637, 552) -> (624, 403)

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

function animateMove(startX, startY, endX, endY, duration) {
  let start = Date.now();

  board.dispatchEvent(downEvent(startX, startY));
  let id = setInterval(frame, 5);

  function frame() {
    let now = Date.now();
    let t = (now - start) / duration;
    if (t > 1) {
      clearInterval(id);
      document.dispatchEvent(upEvent(endX, endY));
      return;
    }

    let res = coordEaseInOut(t, startX, startY, endX, endY);
    document.dispatchEvent(moveEvent(res[0], res[1]));
  }
}

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

// document.addEventListener('mousemove', (ev) => {
//   console.log(ev);
// });

// board.addEventListener('mousedown', (ev) => {
//   console.log(ev);
// });

