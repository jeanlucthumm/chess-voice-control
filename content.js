let board = document.getElementsByTagName('cg-board')[0];
console.log('loaded');

// Sample coordinates: (637, 552) -> (624, 403)

function action() {
  let start = Date.now();
  console.log(start); // DEBUG

  let x = 620;
  let startY = 552;
  let endY = 403;

  board.dispatchEvent(downEvent(x, startY));
  let id = setInterval(frame, 5);
  function frame() {
    let now = Date.now();
    let t = (now - start) / 500;
    if (t > 1) {
      clearInterval(id);
      document.dispatchEvent(upEvent(x, endY));
      return;
    }

    let res = coordEaseInOut(t, x, startY, x, endY);
    document.dispatchEvent(moveEvent(res[0], res[1]));
  }

  // board.dispatchEvent(leftClick());
  // setTimeout(() => {
  //   document.dispatchEvent(moveEvent());
  //   setTimeout(() => {
  //     document.dispatchEvent(upEvent());
  //   }, 200);
  // }, 200);
}

document.addEventListener('keydown', (ev) => {
  console.log(ev.key); // DEBUG
  if (ev.key === 'k' && ev.altKey) {
    action();
  }
});

document.addEventListener('mousemove', (ev) => {
  console.log(ev);
});

// board.addEventListener('mousedown', (ev) => {
//   console.log(ev);
// });

