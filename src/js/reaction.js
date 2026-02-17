// reaction.js - Игра на скорость реакции
class ReactionGame {
    constructor() {
        this.score = 0;
        this.timeLeft = 30;
        this.gameActive = false;
        this.timer = null;
        this.reactionTimes = [];
        this.targetVisible = false;
        this.lastAppearance = 0;
        this.appearanceTimeout = null;
        
        this.initElements();
        this.initEventListeners();
    }
    
    initElements() {
        this.area = document.getElementById('reactionArea');
        this.targetBtn = document.getElementById('targetBtn');
        this.scoreEl = document.getElementById('reactionScore');
        this.timeEl = document.getElementById('reactionTime');
        this.avgTimeEl = document.getElementById('avgReactionTime');
        this.hitsEl = document.getElementById('hitsCount');
        this.resultEl = document.getElementById('reactionResult');
        this.resetBtn = document.getElementById('reactionReset');
    }
    
    initEventListeners() {
        if (this.targetBtn) {
            this.targetBtn.addEventListener('click', () => this.handleTargetClick());
        }
        if (this.resetBtn) {
            this.resetBtn.addEventListener('click', () => this.resetGame());
        }
    }
    
    startGame() {
        if (this.gameActive) return;
        
        this.gameActive = true;
        this.score = 0;
        this.timeLeft = 30;
        this.reactionTimes = [];
        this.updateUI();
        
        // Запускаем таймер
        this.timer = setInterval(() => {
            this.timeLeft--;
            if (this.timeEl) this.timeEl.textContent = this.timeLeft;
            
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
        
        // Первое появление кнопки
        this.scheduleNextAppearance(1000); // Первое появление через 1 секунду
    }
    
    scheduleNextAppearance(delay = null) {
        if (this.appearanceTimeout) {
            clearTimeout(this.appearanceTimeout);
        }
        
        // Случайная задержка от 0.5 до 2.5 секунд
        const nextDelay = delay !== null ? delay : (Math.random() * 2000 + 500);
        
        this.appearanceTimeout = setTimeout(() => {
            if (this.gameActive && !this.targetVisible) {
                this.showTarget();
            }
        }, nextDelay);
    }
    
    showTarget() {
        if (!this.gameActive || !this.area || !this.targetBtn || this.targetVisible) return;
        
        // Случайная позиция в пределах области
        const areaRect = this.area.getBoundingClientRect();
        const btnSize = 80;
        
        const maxX = Math.max(0, areaRect.width - btnSize);
        const maxY = Math.max(0, areaRect.height - btnSize);
        
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;
        
        this.targetBtn.style.left = x + 'px';
        this.targetBtn.style.top = y + 'px';
        this.targetBtn.classList.remove('hidden');
        this.targetVisible = true;
        
        // Запоминаем время появления
        this.lastAppearance = Date.now();
    }
    
    handleTargetClick() {
        if (!this.gameActive || !this.targetVisible) return;
        
        // Считаем время реакции
        const reactionTime = Date.now() - this.lastAppearance;
        this.reactionTimes.push(reactionTime);
        
        // Увеличиваем счет
        this.score++;
        if (this.scoreEl) this.scoreEl.textContent = this.score;
        
        // Обновляем среднее время
        const avgTime = Math.round(this.reactionTimes.reduce((a, b) => a + b, 0) / this.reactionTimes.length);
        if (this.avgTimeEl) this.avgTimeEl.textContent = avgTime;
        if (this.hitsEl) this.hitsEl.textContent = this.reactionTimes.length;
        
        // Прячем кнопку
        if (this.targetBtn) {
            this.targetBtn.classList.add('hidden');
        }
        this.targetVisible = false;
        
        // Планируем следующее появление
        if (this.gameActive) {
            this.scheduleNextAppearance();
        }
    }
    
    endGame() {
        this.gameActive = false;
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        if (this.appearanceTimeout) {
            clearTimeout(this.appearanceTimeout);
            this.appearanceTimeout = null;
        }
        
        if (this.targetBtn) {
            this.targetBtn.classList.add('hidden');
        }
        this.targetVisible = false;
        
        // Вычисляем статистику
        const avgTime = this.reactionTimes.length > 0 
            ? Math.round(this.reactionTimes.reduce((a, b) => a + b, 0) / this.reactionTimes.length)
            : 0;
        
        let message = `Игра окончена!\n`;
        message += `Попаданий: ${this.reactionTimes.length}\n`;
        message += `Среднее время: ${avgTime} мс`;
        
        if (this.resultEl) this.resultEl.textContent = message;
        
        // Сохраняем рекорд
        this.saveRecord(this.reactionTimes.length, avgTime);
    }
    
    resetGame() {
        // Очищаем все таймеры
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        if (this.appearanceTimeout) {
            clearTimeout(this.appearanceTimeout);
            this.appearanceTimeout = null;
        }
        
        this.gameActive = false;
        this.targetVisible = false;
        if (this.targetBtn) {
            this.targetBtn.classList.add('hidden');
        }
        
        // Сбрасываем значения
        this.score = 0;
        this.timeLeft = 30;
        this.reactionTimes = [];
        
        // Обновляем UI
        if (this.scoreEl) this.scoreEl.textContent = '0';
        if (this.timeEl) this.timeEl.textContent = '30';
        if (this.avgTimeEl) this.avgTimeEl.textContent = '0';
        if (this.hitsEl) this.hitsEl.textContent = '0';
        if (this.resultEl) this.resultEl.textContent = '';
    }
    
    saveRecord(hits, avgTime) {
        const records = JSON.parse(localStorage.getItem('reactionRecords') || '{"hits":0,"avgTime":9999}');
        
        if (hits > records.hits || (hits === records.hits && avgTime < records.avgTime)) {
            localStorage.setItem('reactionRecords', JSON.stringify({hits, avgTime}));
            if (this.resultEl) {
                this.resultEl.innerHTML += '<br>🏆 Новый рекорд!';
            }
        }
    }
    
    updateUI() {
        if (this.scoreEl) this.scoreEl.textContent = this.score;
        if (this.timeEl) this.timeEl.textContent = this.timeLeft;
    }
}

// Инициализация игры
let reactionGame;
if (document.getElementById('reaction')) {
    reactionGame = new ReactionGame();
}
