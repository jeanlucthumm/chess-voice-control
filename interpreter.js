const piece_regex = /(white|black) ([a-z]+)/;

class Piece {
    constructor(color, type, x, y) {
        this.color = color;
        this.type = type;
        this.x = x;
        this.y = y;
    }
}

function parseTypeString(type) {
    let t = type.toLowerCase();
    let possible_types = [
        "rook", "knight", "bishop",
        "queen", "king", "pawn"
    ];
    if (possible_types.includes(t)) {
        return t;
    } else {
        console.error("Unknown piece type: " + t);
    }
}

class Board {
    constructor() {
        this.pieces = [];
    }

    initialize(board) {
        let html_pieces = board.getElementsByTagName('piece');
        if (html_pieces.length !== 32) {
            console.error("Found more than 32 pieces on the board");
            return;
        }
        for (let html_piece of html_pieces) {
            let rect = html_piece.getBoundingClientRect();
            let pos = euclidToChessSpace(rect.x, rect.y);
            let class_string = html_piece.classList.value;
            if (!piece_regex.test(class_string)) {
                console.error("Cannot interpret piece class list: " + class_string);
                return;
            }
            let regGroups = class_string.match(piece_regex);

            let piece = new Piece(
                regGroups[1],
                parseTypeString(regGroups[2]),
                pos[0], pos[1]);
            this.pieces.push(piece);
        }
    }

    debugDump() {
        for (let piece of this.pieces) {
            console.log(piece);
        }
    }
}
