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

async function animateMove(startX, startY, endX, endY, duration) {
    return new Promise(resolve => {
        let start = Date.now();
        board.dispatchEvent(downEvent(startX, startY));
        let id = setInterval(frame, 5);

        function frame() {
            let now = Date.now();
            let t = (now - start) / duration;
            if (t > 1) {
                clearInterval(id);
                document.dispatchEvent(upEvent(endX, endY));
                resolve('resolved');
                return;
            }

            let res = coordEaseInOut(t, startX, startY, endX, endY);
            document.dispatchEvent(moveEvent(res[0], res[1]));
        }
    });
}
