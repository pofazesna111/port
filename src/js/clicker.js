// clicker.js - игра Кликер
let score = 0;
let time = 30;
let timer = null;
let gameActive = false;

const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const resultEl = document.getElementById('clickerResult');
const clickBtn = document.getElementById('clickBtn');
const resetBtn = document.getElementById('resetBtn');

// Загрузка рекорда при старте
const savedRecord = localStorage.getItem('clickerRecord');
if (savedRecord && resultEl) {
    resultEl.textContent = `🏆 Ваш рекорд: ${savedRecord}`;
}

if (clickBtn) {
    clickBtn.addEventListener('click', () => {
        // Проверка: игра активна?
        if (time <= 0) {
            resultEl.textContent = 'Игра окончена! Нажмите "Сброс" чтобы начать заново.';
            return;
        }
        
        // Запуск таймера при первом клике
        if (!timer) {
            startTimer();
            gameActive = true;
        }
        
        // Только если игра активна, увеличиваем счет
        if (gameActive) {
            score++;
            scoreEl.textContent = score;
            
            // Анимация клика
            clickBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                clickBtn.style.transform = 'scale(1)';
            }, 100);
        }
    });
}

if (resetBtn) {
    resetBtn.addEventListener('click', resetGame);
}

function startTimer() {
    timer = setInterval(() => {
        time--;
        timeEl.textContent = time;

        if (time <= 0) {
            // Игра окончена
            clearInterval(timer);
            timer = null;
            gameActive = false;
            
            // Сохраняем рекорд, если он больше предыдущего
            const oldRecord = parseInt(localStorage.getItem('clickerRecord')) || 0;
            if (score > oldRecord) {
                localStorage.setItem('clickerRecord', score);
                resultEl.textContent = `🎉 НОВЫЙ РЕКОРД! Очки: ${score}`;
            } else {
                resultEl.textContent = `⏰ Игра окончена. Очки: ${score}`;
            }
            
            timeEl.textContent = '0';
        }
    }, 1000);
}

function resetGame() {
    // Очистка таймера
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    
    // Сброс значений
    gameActive = false;
    score = 0;
    time = 30;
    
    // Обновление UI
    scoreEl.textContent = score;
    timeEl.textContent = time;
    
    // Показываем рекорд
    const record = localStorage.getItem('clickerRecord') || '0';
    resultEl.textContent = `🏆 Рекорд: ${record}`;
}
