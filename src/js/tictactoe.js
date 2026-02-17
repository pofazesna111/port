// tictactoe.js - Крестики-нолики (ПОЛНАЯ ВЕРСИЯ)
class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.mode = '2p'; // '2p' или 'ai'
        this.scores = { X: 0, O: 0 };
        this.winCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // горизонтали
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // вертикали
            [0, 4, 8], [2, 4, 6]             // диагонали
        ];
        
        this.initElements();
        this.initEventListeners();
        this.renderBoard();
        this.updateStatus();
    }
    
    initElements() {
        this.boardEl = document.getElementById('tttBoard');
        this.statusEl = document.getElementById('tttStatus');
        this.scoreXEl = document.getElementById('scoreX');
        this.scoreOEl = document.getElementById('scoreO');
        this.mode2pBtn = document.getElementById('mode2p');
        this.modeAIBtn = document.getElementById('modeAI');
        this.restartBtn = document.getElementById('tttRestart');
        this.resultEl = document.getElementById('tttResult');
    }
    
    initEventListeners() {
        this.mode2pBtn.addEventListener('click', () => this.setMode('2p'));
        this.modeAIBtn.addEventListener('click', () => this.setMode('ai'));
        this.restartBtn.addEventListener('click', () => this.resetGame());
    }
    
    setMode(mode) {
        this.mode = mode;
        this.mode2pBtn.classList.toggle('active', mode === '2p');
        this.modeAIBtn.classList.toggle('active', mode === 'ai');
        this.resetGame();
    }
    
    renderBoard() {
        this.boardEl.innerHTML = '';
        
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.className = `ttt-cell ${this.board[i].toLowerCase()}`;
            if (this.board[i] === 'X') cell.classList.add('x');
            if (this.board[i] === 'O') cell.classList.add('o');
            if (!this.gameActive || this.board[i]) cell.classList.add('disabled');
            
            cell.textContent = this.board[i];
            cell.dataset.index = i;
            
            cell.addEventListener('click', () => this.handleCellClick(i));
            
            this.boardEl.appendChild(cell);
        }
    }
    
    handleCellClick(index) {
        // Проверяем можно ли сделать ход
        if (!this.gameActive || this.board[index]) return;
        if (this.mode === 'ai' && this.currentPlayer === 'O') return;
        
        // Делаем ход
        this.makeMove(index);
        
        // Если режим AI и игра продолжается, ход компьютера
        if (this.mode === 'ai' && this.gameActive && this.currentPlayer === 'O') {
            setTimeout(() => this.makeAIMove(), 500);
        }
    }
    
    makeMove(index) {
        // Ставим знак
        this.board[index] = this.currentPlayer;
        
        // Проверяем победу
        const winInfo = this.checkWin();
        
        if (winInfo.win) {
            // Подсвечиваем выигрышную комбинацию
            this.highlightWinningCombo(winInfo.combo);
            
            // Обновляем счет
            this.scores[this.currentPlayer]++;
            this.updateScores();
            
            // Сообщение о победе
            this.statusEl.textContent = `🏆 Игрок ${this.currentPlayer} победил!`;
            this.resultEl.textContent = `Победитель: ${this.currentPlayer}`;
            
            this.gameActive = false;
        } 
        else if (!this.board.includes('')) {
            // Ничья
            this.statusEl.textContent = '🤝 Ничья!';
            this.resultEl.textContent = 'Ничья!';
            this.gameActive = false;
        } 
        else {
            // Меняем игрока
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.updateStatus();
        }
        
        // Обновляем доску
        this.renderBoard();
    }
    
    makeAIMove() {
        if (!this.gameActive || this.currentPlayer !== 'O') return;
        
        // Поиск пустых клеток
        const emptyCells = this.board.reduce((acc, cell, index) => {
            if (cell === '') acc.push(index);
            return acc;
        }, []);
        
        if (emptyCells.length > 0) {
            // Случайный ход
            const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.makeMove(randomIndex);
        }
    }
    
    checkWin() {
        for (let combo of this.winCombos) {
            const [a, b, c] = combo;
            if (this.board[a] && 
                this.board[a] === this.board[b] && 
                this.board[a] === this.board[c]) {
                return { win: true, combo: combo };
            }
        }
        return { win: false, combo: null };
    }
    
    highlightWinningCombo(combo) {
        combo.forEach(index => {
            const cell = this.boardEl.children[index];
            cell.classList.add('win');
        });
    }
    
    updateStatus() {
        this.statusEl.textContent = `Ход игрока ${this.currentPlayer === 'X' ? '❌' : '⭕'}`;
    }
    
    updateScores() {
        this.scoreXEl.textContent = this.scores.X;
        this.scoreOEl.textContent = this.scores.O;
        
        // Сохраняем в localStorage
        localStorage.setItem('tttScores', JSON.stringify(this.scores));
    }
    
    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.resultEl.textContent = '';
        
        // Загружаем счета из localStorage
        const savedScores = localStorage.getItem('tttScores');
        if (savedScores) {
            this.scores = JSON.parse(savedScores);
            this.updateScores();
        }
        
        this.renderBoard();
        this.updateStatus();
    }
}

// Инициализация
let tictactoe;
window.addEventListener('load', () => {
    tictactoe = new TicTacToe();
});
