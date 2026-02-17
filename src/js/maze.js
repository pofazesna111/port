// maze.js - Игра Лабиринт (ПОЛНАЯ ВЕРСИЯ)
class MazeGame {
    constructor() {
        // Стандартный лабиринт 10x10 (1 - стена, 0 - проход)
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
        
        this.initElements();
        this.initEventListeners();
        this.loadMaze();
        this.renderMaze();
        this.startTimer();
    }
    
    initElements() {
        this.gridEl = document.getElementById('mazeGrid');
        this.timeEl = document.getElementById('mazeTime');
        this.movesEl = document.getElementById('mazeMoves');
        this.messageEl = document.getElementById('mazeMessage');
        this.newBtn = document.getElementById('mazeNew');
        this.resetBtn = document.getElementById('mazeReset');
    }
    
    initEventListeners() {
        // Управление с клавиатуры
        window.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Кнопки
        this.newBtn.addEventListener('click', () => this.newMaze());
        this.resetBtn.addEventListener('click', () => this.resetPosition());
        
        // Блокируем скролл при нажатии стрелок
        window.addEventListener('keydown', (e) => {
            if (e.key.startsWith('Arrow')) {
                e.preventDefault();
            }
        });
    }
    
    loadMaze() {
        // Копируем шаблон
        this.maze = this.mazeTemplate.map(row => [...row]);
        
        // Ставим игрока и выход
        this.playerPos = { x: 1, y: 1 };
        this.exitPos = { x: 8, y: 8 };
    }
    
    renderMaze() {
        const size = this.maze.length;
        this.gridEl.style.gridTemplateColumns = `repeat(${size}, ${this.cellSize}px)`;
        
        this.gridEl.innerHTML = '';
        
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const cell = document.createElement('div');
                cell.className = 'maze-cell';
                
                // Определяем тип клетки
                if (this.maze[y][x] === 1) {
                    cell.classList.add('wall');
                } else {
                    cell.classList.add('path');
                }
                
                // Игрок
                if (x === this.playerPos.x && y === this.playerPos.y) {
                    cell.classList.add('player');
                }
                
                // Выход
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
        
        // Определяем новое положение
        switch(key) {
            case 'ArrowUp':
                newY--;
                break;
            case 'ArrowDown':
                newY++;
                break;
            case 'ArrowLeft':
                newX--;
                break;
            case 'ArrowRight':
                newX++;
                break;
            default:
                return;
        }
        
        // Проверяем можно ли туда пойти (не стена и в пределах лабиринта)
        if (this.isValidMove(newX, newY)) {
            this.movePlayer(newX, newY);
        }
    }
    
    isValidMove(x, y) {
        // Проверка границ
        if (y < 0 || y >= this.maze.length || x < 0 || x >= this.maze[0].length) {
            return false;
        }
        
        // Проверка стены
        return this.maze[y][x] !== 1;
    }
    
    movePlayer(newX, newY) {
        // Обновляем позицию
        this.playerPos.x = newX;
        this.playerPos.y = newY;
        
        // Увеличиваем счетчик ходов
        this.moves++;
        this.movesEl.textContent = this.moves;
        
        // Проверяем победу
        if (this.playerPos.x === this.exitPos.x && this.playerPos.y === this.exitPos.y) {
            this.win();
        }
        
        // Обновляем отображение
        this.renderMaze();
    }
    
    win() {
        this.gameActive = false;
        this.stopTimer();
        
        const timeText = this.formatTime(this.time);
        this.messageEl.innerHTML = `
            🎉 ПОБЕДА!<br>
            ⏱️ Время: ${timeText}<br>
            👣 Ходов: ${this.moves}
        `;
        
        // Сохраняем рекорд
        this.saveRecord();
    }
    
    startTimer() {
        this.timer = setInterval(() => {
            this.time++;
            this.timeEl.textContent = this.formatTime(this.time);
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
        this.movesEl.textContent = '0';
        this.renderMaze();
    }
    
    newMaze() {
        // Сбрасываем игру
        this.stopTimer();
        this.gameActive = true;
        this.moves = 0;
        this.time = 0;
        
        // Загружаем новый лабиринт (можно добавить разные варианты)
        this.loadMaze();
        this.renderMaze();
        
        // Обновляем UI
        this.movesEl.textContent = '0';
        this.timeEl.textContent = '0';
        this.messageEl.innerHTML = '';
        
        // Запускаем таймер
        this.startTimer();
    }
    
    saveRecord() {
        const records = JSON.parse(localStorage.getItem('mazeRecords') || '{"time":999,"moves":999}');
        
        if (this.time < records.time || (this.time === records.time && this.moves < records.moves)) {
            localStorage.setItem('mazeRecords', JSON.stringify({
                time: this.time,
                moves: this.moves
            }));
            this.messageEl.innerHTML += '<br>🏆 Новый рекорд!';
        }
    }
}

// Инициализация
let mazeGame;
window.addEventListener('load', () => {
    mazeGame = new MazeGame();
});

// Обновляем showGame
const originalShowGame2 = window.showGame;
window.showGame = function(id) {
    originalShowGame2(id);
    if (id === 'maze' && mazeGame) {
        mazeGame.newMaze();
    }
};
