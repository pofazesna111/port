// games.js - Управление всеми играми
function showGame(id) {
    console.log('Показываем игру:', id); // Для отладки
    
    // Скрываем все игры
    document.querySelectorAll(".game-card").forEach(g => {
        g.classList.add("hidden");
    });
    
    // Показываем выбранную игру
    const selectedGame = document.getElementById(id);
    if (selectedGame) {
        selectedGame.classList.remove("hidden");
    }
    
    // Специфичные действия для каждой игры
    switch(id) {
        case 'reaction':
            if (window.reactionGame) {
                console.log('Запускаем реакцию');
                setTimeout(() => {
                    window.reactionGame.resetGame();
                    window.reactionGame.startGame();
                }, 100);
            } else {
                console.error('reactionGame не найден');
            }
            break;
            
        case 'tictactoe':
            if (window.tictactoe) {
                console.log('Показываем крестики-нолики');
                window.tictactoe.resetGame();
            }
            break;
            
        case 'maze':
            if (window.mazeGame) {
                console.log('Запускаем лабиринт');
                window.mazeGame.newMaze();
            }
            break;
            
        case 'clicker':
            if (window.clickerGame) {
                console.log('Показываем кликер');
                window.clickerGame.resetGame();
            }
            break;
            
        case 'adventure':
            console.log('Показываем приключения');
            break;
            
        case 'guess':
            if (window.guessGame) {
                console.log('Показываем угадай число');
                window.guessGame.resetGame();
            }
            break;
    }
}

// 3D Tilt для карточек
let ticking = false;
document.querySelectorAll(".game-card").forEach(card => {
    card.addEventListener("mousemove", e => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const r = card.getBoundingClientRect();
                const x = e.clientX - r.left;
                const y = e.clientY - r.top;
                const rx = ((y / r.height) - .5) * -12;
                const ry = ((x / r.width) - .5) * 12;
                card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`;
                ticking = false;
            });
            ticking = true;
        }
    });
    
    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    });
});

// Ripple effect для всех кнопок
document.querySelectorAll(".game-card button").forEach(btn => {
    btn.addEventListener("click", function(e) {
        const ripple = document.createElement("span");
        ripple.className = "ripple";
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Проверка загрузки
window.addEventListener('load', () => {
    console.log('Страница загружена');
    console.log('ReactionGame:', window.reactionGame);
    console.log('TicTacToe:', window.tictactoe);
    console.log('MazeGame:', window.mazeGame);
});
