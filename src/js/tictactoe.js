// tictactoe.js - Крестики-нолики
class TicTacToe {
    constructor() {
        console.log('Создание TicTacToe');
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.mode = '2p';
        this.scores = { X: 0, O: 0 };
        this.winCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initElements());
        } else {
            this.initElements();
        }
    }
    
    initElements() {
        console.log('Инициализация элементов TicTacToe');
        this.boardEl = document.getElementById('tttBoard');
        this.statusEl = document.getElementById('tttStatus');
        this.scoreXEl = document.getElementById('scoreX');
        this.scoreOEl = document.getElementById('scoreO');
        this.mode2pBtn = document.getElementById('mode2p');
        this.modeAIBtn = document.getElementById('modeAI');
        this.restartBtn = document.getElementById('tttRestart');
        this.resultEl = document.getElementById('tttResult');
        
        console.log('Элементы TicTacToe:', this.boardEl);
        
        if (this.mode2pBtn) {
            this.mode2pBtn.addEventListener('click', () => this.setMode('2p'));
        }
        if (this.modeAIBtn) {
            this.modeAIBtn.addEventListener('click', () => this.setMode('ai'));
        }
        if (this.restartBtn) {
            this.restartBtn.addEventListener('click', () => this.resetGame());
        }
        
        this.loadScores();
        this.renderBoard();
        this.updateStatus();
    }
    
    setMode(mode) {
        this.mode = mode;
        if (this.mode2pBtn && this.modeAIBtn) {
            this.mode2pBtn.classList.toggle('active', mode === '2p');
            this.modeAIBtn.classList.toggle('active', mode === 'ai');
        }
        this.resetGame();
    }
    
    renderBoard() {
        if (!this.boardEl) return;
        
        this.boardEl.innerHTML = '';
        
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.className = `ttt-cell ${this.board[i].toLowerCase()}`;
            if (this.board[i] === 'X') cell.classList.add('x');
            if (this.board[i] === 'O') cell.classList.add('o');
            if (!this.gameActive || this.board[i]) cell.classList.add('disabled');
            
            cell.textContent = this.board[i];
            cell.dataset.index = i;
            
            cell.addEventListener('click', (e) => this.handleCellClick(parseInt(e.target.dataset.index)));
            
            this.boardEl.appendChild(cell);
        }
    }
    
    handleCellClick(index) {
        if (!this.gameActive || this.board[index]) return;
        if (this.mode === 'ai' && this.currentPlayer === 'O') return;
        
        this.makeMove(index);
        
        if (this.mode === 'ai' && this.gameActive && this.currentPlayer === 'O') {
            setTimeout(() => this.makeAIMove(), 500);
        }
    }
    
    makeMove(index) {
        this.board[index] = this.currentPlayer;
        
        const winInfo = this.checkWin();
        
        if (winInfo.win) {
            this.highlightWinningCombo(winInfo.combo);
            this.scores[this.currentPlayer]++;
            this.updateScores();
            
            if (this.statusEl) {
                this.statusEl.textContent = `🏆 Игрок ${this.currentPlayer} победил!`;
            }
            if (this.resultEl) {
                this.resultEl.textContent = `Победитель: ${this.currentPlayer}`;
            }
            
            this.gameActive = false;
        } 
        else if (!this.board.includes('')) {
            if (this.statusEl) this.statusEl.textContent = '🤝 Ничья!';
            if (this.resultEl) this.resultEl.textContent = 'Ничья!';
            this.gameActive = false;
        } 
        else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.updateStatus();
        }
        
        this.renderBoard();
    }
    
    makeAIMove() {
        if (!this.gameActive || this.currentPlayer !== 'O') return;
        
        const emptyCells = this.board.reduce((acc, cell, index) => {
            if (cell === '') acc.push(index);
            return acc;
        }, []);
        
        if (emptyCells.length > 0) {
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
        if (!this.boardEl) return;
        combo.forEach(index => {
            const cell = this.boardEl.children[index];
            if (cell) cell.classList.add('win');
        });
    }
    
    updateStatus() {
        if (this.statusEl) {
            this.statusEl.textContent = `Ход игрока ${this.currentPlayer === 'X' ? '❌' : '⭕'}`;
        }
    }
    
    updateScores() {
        if (this.scoreXEl) this.scoreXEl.textContent = this.scores.X;
        if (this.scoreOEl) this.scoreOEl.textContent = this.scores.O;
        localStorage.setItem('tttScores', JSON.stringify(this.scores));
    }
    
    loadScores() {
        const savedScores = localStorage.getItem('tttScores');
        if (savedScores) {
            this.scores = JSON.parse(savedScores);
            this.updateScores();
        }
    }
    
    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        if (this.resultEl) this.resultEl.textContent = '';
        this.loadScores();
        this.renderBoard();
        this.updateStatus();
    }
}

// Создаем глобальный экземпляр
if (document.getElementById('tictactoe')) {
    window.tictactoe = new TicTacToe();
    console.log('TicTacToe создан');
}
