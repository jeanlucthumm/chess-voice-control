function rightDownEvent(x, y) {
  return new MouseEvent('mousedown', {
    clientX: x,
    clientY: y,
    button: 2,
  });
}

function downEvent(x, y) {
  return new MouseEvent('mousedown', {
    clientX: x,
    clientY: y,
    button: 0,
    buttons: 1,
  });
}

function moveEvent(x, y) {
  return new MouseEvent('mousemove', {
    clientX: x,
    clientY: y,
  });
}

function upEvent(x, y) {
  return new MouseEvent('mouseup', {
    clientX: x,
    clientY: y,
  });
}

// t is normalized time, i.e. in [0, 1]
function quadEaseInOut(t) {
  if (t < 0.5) {
    return 2 * t * t
  }
  t -= 0.5;
  return 2 * t * (1 - t) + 0.5;
}

// t is normalized time, i.e. in [0, 1]
function coordEaseInOut(t, startX, startY, endX, endY) {
  let factor = quadEaseInOut(t);
  let x = (endX - startX) * factor + startX;
  let y = (endY - startY) * factor + startY;
  return [x, y];
}

