let number = Math.floor(Math.random() * 100) + 1;
let attempts = 10;

document.getElementById('guessBtn').addEventListener('click', () => {
    const input = parseInt(document.getElementById('guessInput').value);
    const message = document.getElementById('guessMessage');

    if (attempts === 0) return;

    attempts--;
    document.getElementById('attempts').textContent = attempts;

    if (input === number) {
        message.textContent = 'Вы угадали!';
        endGame();
    } else if (input > number) {
        message.textContent = 'Меньше';
    } else {
        message.textContent = 'Больше';
    }

    if (attempts === 0) {
        message.textContent = `Проигрыш. Число было: ${number}`;
        endGame();
    }
});

document.getElementById('restartBtn').addEventListener('click', () => {
    number = Math.floor(Math.random() * 100) + 1;
    attempts = 10;
    document.getElementById('attempts').textContent = attempts;
    document.getElementById('guessMessage').textContent = '';
    document.getElementById('restartBtn').classList.add('hidden');
});

function endGame() {
    document.getElementById('restartBtn').classList.remove('hidden');
}
