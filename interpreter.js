const piece_regex = /(white|black) ([a-z]+)/;
const move_regex = /(^[A-Z]?)([a-h]?)(x?)([a-h][1-8])/;

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
        this.user_color = null;
    }

    initialize(board) {
        this.update(board);
        this.initializeColor();
    }

    initializeColor() {
        let piece = this.getPiece(0, 6);
        if (piece === null) {
            console.error("Could not determine user color");
            return;
        }
        this.user_color = piece.color;
    }

    update(board) {
        let html_pieces = board.getElementsByTagName('piece');
        if (html_pieces.length !== 32) {
            console.error("Found more than 32 pieces on the board");
            return;
        }
        this.pieces = [];
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
                pos.x, pos.y);
            this.pieces.push(piece);
        }
    }

    debugDump() {
        for (let piece of this.pieces) {
            console.log(piece);
        }
    }

    getPiece(x, y) {
        for (let piece of this.pieces) {
            if (piece.x === x && piece.y === y) return piece;
        }
        return null;
    }

    getMoveCoordinates(move) {
        let regGroups = move.match(move_regex);
        let type = (regGroups[1] !== "") ? typeCodeToType(regGroups[1]) : 'pawn';
        let col = (regGroups[2] !== "") ? columnToNumber(regGroups[2]) : null;
        let takes = regGroups[3] !== "";
        let dest = squareToChessSpace(regGroups[4]);

        let candidates = [];
        for (let piece of this.pieces) {
            if (piece.color === this.user_color && piece.type === type) {
                if ((col != null && piece.x === col) || col == null) {
                    candidates.push(piece);
                }
            }
        }

        // filter by possible moves
        let movable = [];
        for (let candidate of candidates) {
            if (this._isPossibleMove(candidate, dest, takes)) {
                movable.push(candidate);
            }
        }
        if (movable.length === 1) {
            let piece = movable[0];
            return [
                new Point(piece.x, piece.y),
                dest
            ];
        }
        return null;
    }

    _isPossibleMove(piece, dest, takes) {
        switch (piece.type) {
            case 'rook':
                return dest.x === piece.x || dest.y === piece.y;
            case 'knight':
                return (dest.x === piece.x + 2 && dest.y === piece.y + 1) ||
                    (dest.x === piece.x + 2 && dest.y === piece.y - 1) ||
                    (dest.x === piece.x - 2 && dest.y === piece.y + 1) ||
                    (dest.x === piece.x - 2 && dest.y === piece.y - 1) ||
                    (dest.y === piece.y + 2 && dest.x === piece.x + 1) ||
                    (dest.y === piece.y + 2 && dest.x === piece.x - 1) ||
                    (dest.y === piece.y - 2 && dest.x === piece.x + 1) ||
                    (dest.y === piece.y - 2 && dest.x === piece.x - 1);
            case 'bishop':
                return Math.abs(dest.x - piece.x) === Math.abs(dest.y - piece.y);
            case 'pawn':
                return (Math.abs(dest.y - piece.y) <= 2 && dest.x === piece.x) ||
                    (takes && Math.abs(dest.x - piece.x) === 1 && Math.abs(dest.y - piece.y) === 1);
            default:
                return true; // all other pieces are unique
        }
    }
}

function typeCodeToType(code) {
    switch (code) {
        case 'R':
            return 'rook';
        case 'N':
            return 'knight';
        case 'B':
            return 'bishop';
        case 'Q':
            return 'queen';
        case 'K':
            return 'king';
        case '':
            return 'pawn';
        default:
            return null;
    }
}

function columnToNumber(col) {
    let x = col.charCodeAt(0) - 'a'.charCodeAt(0);
    if (0 <= x && x <= 7) {
        return x;
    }
    return null;
}

function squareToChessSpace(square) {
    let x = columnToNumber(square[0]);
    let y = 8 - parseInt(square[1]);
    return new Point(x, y);
}
