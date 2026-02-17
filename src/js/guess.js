// guess.js - игра Угадай число
let secretNumber = Math.floor(Math.random() * 100) + 1;
let attemptsLeft = 10;
let gameOver = false;

const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const guessMessage = document.getElementById('guessMessage');
const attemptsEl = document.getElementById('attempts');
const restartBtn = document.getElementById('restartBtn');

if (guessBtn) {
    guessBtn.addEventListener('click', () => {
        // Проверка: игра не окончена?
        if (gameOver) {
            guessMessage.textContent = 'Игра окончена! Нажмите "Заново"';
            return;
        }
        
        // Получаем и проверяем ввод
        const inputValue = guessInput.value.trim();
        
        // Проверка на пустой ввод
        if (inputValue === '') {
            guessMessage.textContent = '⚠️ Введите число!';
            return;
        }
        
        const guess = parseInt(inputValue);
        
        // Проверка на число
        if (isNaN(guess)) {
            guessMessage.textContent = '⚠️ Это не число!';
            guessInput.value = '';
            return;
        }
        
        // Проверка диапазона
        if (guess < 1 || guess > 100) {
            guessMessage.textContent = '⚠️ Число должно быть от 1 до 100!';
            guessInput.value = '';
            return;
        }

        // Основная логика игры
        attemptsLeft--;
        attemptsEl.textContent = attemptsLeft;

        if (guess === secretNumber) {
            guessMessage.textContent = '🎉 ПОБЕДА! Вы угадали число!';
            gameOver = true;
            restartBtn.classList.remove('hidden');
            guessBtn.disabled = true;
        } 
        else if (attemptsLeft === 0) {
            guessMessage.textContent = `😢 Проигрыш. Число было: ${secretNumber}`;
            gameOver = true;
            restartBtn.classList.remove('hidden');
            guessBtn.disabled = true;
        } 
        else {
            // Подсказка
            const difference = Math.abs(guess - secretNumber);
            let hint = guess > secretNumber ? 'Меньше' : 'Больше';
            
            // Добавляем дополнительную подсказку
            if (difference <= 5) {
                hint += ' (🔥 очень близко!)';
            } else if (difference <= 15) {
                hint += ' (👍 близко)';
            } else if (difference <= 30) {
                hint += ' (👎 далековато)';
            } else {
                hint += ' (❄️ очень далеко)';
            }
            
            guessMessage.textContent = hint;
        }
        
        // Очищаем поле ввода
        guessInput.value = '';
    });
}

if (restartBtn) {
    restartBtn.addEventListener('click', () => {
        // Новая игра
        secretNumber = Math.floor(Math.random() * 100) + 1;
        attemptsLeft = 10;
        gameOver = false;
        
        // Обновление UI
        attemptsEl.textContent = attemptsLeft;
        guessMessage.textContent = '';
        restartBtn.classList.add('hidden');
        guessBtn.disabled = false;
        guessInput.value = '';
        guessInput.focus();
    });
}

// Разрешаем ввод только цифр
if (guessInput) {
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            guessBtn.click();
        }
    });
}
