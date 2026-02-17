// reaction.js
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
        if (this.targetBtn)
            this.targetBtn.addEventListener('click', () => this.handleTargetClick());

        if (this.resetBtn)
            this.resetBtn.addEventListener('click', () => this.resetGame());
    }

    startGame() {
        if (this.gameActive) return;

        this.gameActive = true;
        this.score = 0;
        this.timeLeft = 30;
        this.reactionTimes = [];
        this.updateUI();

        this.timer = setInterval(() => {
            this.timeLeft--;
            if (this.timeEl) this.timeEl.textContent = this.timeLeft;
            if (this.timeLeft <= 0) this.endGame();
        }, 1000);

        this.scheduleNextAppearance(1000);
    }

    scheduleNextAppearance(delay = null) {
        if (this.appearanceTimeout)
            clearTimeout(this.appearanceTimeout);

        const nextDelay = delay ?? (Math.random() * 2000 + 500);

        this.appearanceTimeout = setTimeout(() => {
            if (this.gameActive && !this.targetVisible)
                this.showTarget();
        }, nextDelay);
    }

    showTarget() {
        if (!this.area || !this.targetBtn) return;

        const rect = this.area.getBoundingClientRect();
        const size = 80;

        const x = Math.random() * (rect.width - size);
        const y = Math.random() * (rect.height - size);

        this.targetBtn.style.left = x + 'px';
        this.targetBtn.style.top = y + 'px';
        this.targetBtn.classList.remove('hidden');

        this.targetVisible = true;
        this.lastAppearance = Date.now();
    }

    handleTargetClick() {
        if (!this.targetVisible) return;

        const reactionTime = Date.now() - this.lastAppearance;
        this.reactionTimes.push(reactionTime);

        this.score++;
        this.targetVisible = false;
        this.targetBtn.classList.add('hidden');

        const avg = Math.round(
            this.reactionTimes.reduce((a, b) => a + b, 0) /
            this.reactionTimes.length
        );

        if (this.scoreEl) this.scoreEl.textContent = this.score;
        if (this.avgTimeEl) this.avgTimeEl.textContent = avg;
        if (this.hitsEl) this.hitsEl.textContent = this.reactionTimes.length;

        this.scheduleNextAppearance();
    }

    endGame() {
        this.gameActive = false;
        clearInterval(this.timer);
        clearTimeout(this.appearanceTimeout);

        const avg = this.reactionTimes.length
            ? Math.round(this.reactionTimes.reduce((a, b) => a + b, 0) / this.reactionTimes.length)
            : 0;

        if (this.resultEl)
            this.resultEl.textContent =
                `Игра окончена | Попаданий: ${this.reactionTimes.length} | Среднее: ${avg} мс`;
    }

    resetGame() {
        clearInterval(this.timer);
        clearTimeout(this.appearanceTimeout);

        this.score = 0;
        this.timeLeft = 30;
        this.reactionTimes = [];
        this.targetVisible = false;
        this.gameActive = false;

        if (this.targetBtn) this.targetBtn.classList.add('hidden');
        if (this.scoreEl) this.scoreEl.textContent = '0';
        if (this.timeEl) this.timeEl.textContent = '30';
        if (this.avgTimeEl) this.avgTimeEl.textContent = '0';
        if (this.hitsEl) this.hitsEl.textContent = '0';
        if (this.resultEl) this.resultEl.textContent = '';
    }

    updateUI() {
        if (this.scoreEl) this.scoreEl.textContent = this.score;
        if (this.timeEl) this.timeEl.textContent = this.timeLeft;
    }
}

window.addEventListener("DOMContentLoaded", () => {
    window.reactionGame = new ReactionGame();
});
