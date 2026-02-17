// maze.js - Игра Лабиринт
class MazeGame {
    constructor() {
        console.log('Создание MazeGame');
        this.mazeTemplate = [
            [1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,1,0,0,0,0,1],
            [1,0,1,0,1,0,1,1,0,1],
            [1,0,1,0,0,0,1,0,0,1],
            [1,0,1,1,1,0,1,0,1,1],
            [1,0,0,0,1,0,0,0,0,1],
            [1,1,1,0,1,1,1,0,1,1],
            [1,0,0,0,0,0,1,0,0,1],
            [1,0,1,1,1,0,0,0,1,1],
            [1,1,1,1,1,1,1,1,1,1]
        ];
        
        this.maze = [];
        this.playerPos = { x: 1, y: 1 };
        this.exitPos = { x: 8, y: 8 };
        this.gameActive = true;
        this.moves = 0;
        this.time = 0;
        this.timer = null;
        this.cellSize = 40;
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initElements());
        } else {
            this.initElements();
        }
    }
    
    initElements() {
        console.log('Инициализация элементов Maze');
        this.gridEl = document.getElementById('mazeGrid');
        this.timeEl = document.getElementById('mazeTime');
        this.movesEl = document.getElementById('mazeMoves');
        this.messageEl = document.getElementById('mazeMessage');
        this.newBtn = document.getElementById('mazeNew');
        this.resetBtn = document.getElementById('mazeReset');
        
        console.log('Элементы Maze:', this.gridEl);
        
        window.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        if (this.newBtn) {
            this.newBtn.addEventListener('click', () => this.newMaze());
        }
        if (this.resetBtn) {
            this.resetBtn.addEventListener('click', () => this.resetPosition());
        }
        
        window.addEventListener('keydown', (e) => {
            if (e.key.startsWith('Arrow')) {
                e.preventDefault();
            }
        });
        
        this.loadMaze();
        this.renderMaze();
    }
    
    loadMaze() {
        this.maze = this.mazeTemplate.map(row => [...row]);
        this.playerPos = { x: 1, y: 1 };
        this.exitPos = { x: 8, y: 8 };
    }
    
    renderMaze() {
        if (!this.gridEl) return;
        
        const size = this.maze.length;
        this.gridEl.style.gridTemplateColumns = `repeat(${size}, ${this.cellSize}px)`;
        
        this.gridEl.innerHTML = '';
        
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const cell = document.createElement('div');
                cell.className = 'maze-cell';
                
                if (this.maze[y][x] === 1) {
                    cell.classList.add('wall');
                } else {
                    cell.classList.add('path');
                }
                
                if (x === this.playerPos.x && y === this.playerPos.y) {
                    cell.classList.add('player');
                }
                
                if (x === this.exitPos.x && y === this.exitPos.y) {
                    cell.classList.add('exit');
                }
                
                this.gridEl.appendChild(cell);
            }
        }
    }
    
    handleKeyPress(e) {
        if (!this.gameActive) return;
        
        const key = e.key;
        let newX = this.playerPos.x;
        let newY = this.playerPos.y;
        
        switch(key) {
            case 'ArrowUp': newY--; break;
            case 'ArrowDown': newY++; break;
            case 'ArrowLeft': newX--; break;
            case 'ArrowRight': newX++; break;
            default: return;
        }
        
        if (this.isValidMove(newX, newY)) {
            this.movePlayer(newX, newY);
        }
    }
    
    isValidMove(x, y) {
        if (y < 0 || y >= this.maze.length || x < 0 || x >= this.maze[0].length) {
            return false;
        }
        return this.maze[y][x] !== 1;
    }
    
    movePlayer(newX, newY) {
        this.playerPos.x = newX;
        this.playerPos.y = newY;
        
        this.moves++;
        if (this.movesEl) this.movesEl.textContent = this.moves;
        
        if (this.playerPos.x === this.exitPos.x && this.playerPos.y === this.exitPos.y) {
            this.win();
        }
        
        this.renderMaze();
        
        if (this.moves === 1 && !this.timer) {
            this.startTimer();
        }
    }
    
    win() {
        this.gameActive = false;
        this.stopTimer();
        
        const timeText = this.formatTime(this.time);
        if (this.messageEl) {
            this.messageEl.innerHTML = `
                🎉 ПОБЕДА!<br>
                ⏱️ Время: ${timeText}<br>
                👣 Ходов: ${this.moves}
            `;
        }
        
        this.saveRecord();
    }
    
    startTimer() {
        this.timer = setInterval(() => {
            this.time++;
            if (this.timeEl) this.timeEl.textContent = this.time;
        }, 1000);
    }
    
    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    resetPosition() {
        if (!this.gameActive) return;
        
        this.playerPos = { x: 1, y: 1 };
        this.moves = 0;
        if (this.movesEl) this.movesEl.textContent = '0';
        this.renderMaze();
    }
    
    newMaze() {
        this.stopTimer();
        this.gameActive = true;
        this.moves = 0;
        this.time = 0;
        this.timer = null;
        
        this.loadMaze();
        this.renderMaze();
        
        if (this.movesEl) this.movesEl.textContent = '0';
        if (this.timeEl) this.timeEl.textContent = '0';
        if (this.messageEl) this.messageEl.innerHTML = '';
    }
    
    saveRecord() {
        const records = JSON.parse(localStorage.getItem('mazeRecords') || '{"time":999,"moves":999}');
        
        if (this.time < records.time || (this.time === records.time && this.moves < records.moves)) {
            localStorage.setItem('mazeRecords', JSON.stringify({
                time: this.time,
                moves: this.moves
            }));
            if (this.messageEl) {
                this.messageEl.innerHTML += '<br>🏆 Новый рекорд!';
            }
        }
    }
}

// Создаем глобальный экземпляр
if (document.getElementById('maze')) {
    window.mazeGame = new MazeGame();
    console.log('MazeGame создан');
}
