// stars.js - анимированный звездный фон
const canvas = document.getElementById('stars');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let stars = [];
    const numStars = 200;
    
    // Настройка canvas на весь экран
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initStars();
    }
    
    // Создание звезд
    function initStars() {
        stars = [];
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 0.5,
                speed: Math.random() * 0.3 + 0.1,
                brightness: Math.random() * 0.7 + 0.3
            });
        }
    }
    
    // Анимация движения звезд
    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
            ctx.fill();
            
            // Движение вверх (создает эффект полета)
            star.y -= star.speed;
            
            // Возврат вниз, когда звезда улетает за верх
            if (star.y < 0) {
                star.y = canvas.height;
                star.x = Math.random() * canvas.width;
            }
        });
        
        requestAnimationFrame(animateStars);
    }
    
    // Обновление при изменении размера окна
    window.addEventListener('resize', () => {
        resizeCanvas();
    });
    
    // Запуск
    resizeCanvas();
    animateStars();
}
