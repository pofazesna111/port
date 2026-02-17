// tictactoe.js
class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;

        this.init();
    }

    init() {
        this.boardEl = document.getElementById('tttBoard');
        this.statusEl = document.getElementById('tttStatus');
        this.restartBtn = document.getElementById('tttRestart');

        if (this.restartBtn)
            this.restartBtn.addEventListener('click', () => this.resetGame());

        this.render();
    }

    render() {
        if (!this.boardEl) return;

        this.boardEl.innerHTML = '';

        this.board.forEach((cell, i) => {
            const div = document.createElement('div');
            div.className = 'ttt-cell';
            div.textContent = cell;
            div.addEventListener('click', () => this.makeMove(i));
            this.boardEl.appendChild(div);
        });
    }

    makeMove(i) {
        if (this.board[i] || !this.gameActive) return;

        this.board[i] = this.currentPlayer;

        if (this.checkWin()) {
            this.statusEl.textContent = `Победил ${this.currentPlayer}`;
            this.gameActive = false;
        } else if (!this.board.includes('')) {
            this.statusEl.textContent = 'Ничья';
            this.gameActive = false;
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.statusEl.textContent = `Ход ${this.currentPlayer}`;
        }

        this.render();
    }

    checkWin() {
        const combos = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ];

        return combos.some(([a,b,c]) =>
            this.board[a] &&
            this.board[a] === this.board[b] &&
            this.board[a] === this.board[c]
        );
    }

    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.statusEl.textContent = 'Ход X';
        this.render();
    }
}

window.addEventListener("DOMContentLoaded", () => {
    window.tictactoe = new TicTacToe();
});
