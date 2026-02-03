let score = 0;
let time = 30;
let timer;

const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const resultEl = document.getElementById('clickerResult');

document.getElementById('clickBtn').addEventListener('click', () => {
    if (!timer) startTimer();
    score++;
    scoreEl.textContent = score;
});

document.getElementById('resetBtn').addEventListener('click', resetGame);

function startTimer() {
    timer = setInterval(() => {
        time--;
        timeEl.textContent = time;

        if (time === 0) {
            clearInterval(timer);
            localStorage.setItem('clickerRecord', score);
            resultEl.textContent = `Игра окончена. Очки: ${score}`;
        }
    }, 1000);
}

function resetGame() {
    clearInterval(timer);
    timer = null;
    score = 0;
    time = 30;
    scoreEl.textContent = score;
    timeEl.textContent = time;
    resultEl.textContent = '';
}
