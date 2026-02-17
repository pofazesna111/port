// adventure.js - улучшенный генератор приключений
const heroes = ['🗡️ рыцарь', '🔮 маг', '🏹 эльф', '💀 некромант', '🛡️ паладин', '🐉 драконорожденный'];
const locations = ['🌲 тёмный лес', '🏰 заброшенный замок', '🌊 подводное царство', '⛰️ горный перевал', '🏜️ пустыня забвения', '🏛️ древние руины'];
const villains = ['🐉 дракон', '🧙 злой колдун', '👹 гоблин-вождь', '🧟 лич', '👾 демон', '🐺 оборотень'];
const treasures = ['💰 золото', '⚔️ легендарный меч', '📜 древний свиток', '💍 кольцо всевластия', '🏺 артефакт богов', '🧪 эликсир бессмертия'];
const quests = ['спасает принцессу', 'ищет сокровище', 'сражается с врагом', 'разгадывает тайну', 'защищает деревню', 'находит союзника'];

document.getElementById('generateAdventure').addEventListener('click', generateAdventure);

function generateAdventure() {
    const hero = heroes[random(heroes.length)];
    const location = locations[random(locations.length)];
    const villain = villains[random(villains.length)];
    const treasure = treasures[random(treasures.length)];
    const quest = quests[random(quests.length)];
    
    // Разные варианты историй
    const storyTemplates = [
        `${hero} отправляется в ${location}, чтобы ${quest} — ${villain}.`,
        `В ${location} появился ${villain}. ${hero} ${quest} и находит ${treasure}.`,
        `Легенда гласит: ${hero} посетил ${location}, сразил ${villain} и добыл ${treasure}.`,
        `Судьба привела ${hero} в ${location}, где предстоит ${quest} с ${villain}.`
    ];
    
    const story = storyTemplates[random(storyTemplates.length)];
    const adventureText = document.getElementById('adventureText');
    adventureText.textContent = story;
    
    // Эффект печатания текста
    adventureText.style.opacity = '0';
    setTimeout(() => {
        adventureText.style.opacity = '1';
        adventureText.style.transition = 'opacity 0.5s';
    }, 100);
    
    // Сохраняем историю
    const history = JSON.parse(localStorage.getItem('adventureHistory') || '[]');
    history.unshift(story);
    if (history.length > 5) history.pop(); // храним только 5 последних
    localStorage.setItem('adventureHistory', JSON.stringify(history));
    
    // Показываем счетчик историй
    showHistoryCount();
}

function random(max) {
    return Math.floor(Math.random() * max);
}

// Показываем сколько историй создано
function showHistoryCount() {
    const history = JSON.parse(localStorage.getItem('adventureHistory') || '[]');
    const btn = document.getElementById('generateAdventure');
    if (history.length > 0) {
        btn.textContent = `✨ Создать приключение (${history.length})`;
    }
}

// Загружаем последнюю историю при старте
window.addEventListener('load', () => {
    const history = JSON.parse(localStorage.getItem('adventureHistory') || '[]');
    if (history.length > 0) {
        document.getElementById('adventureText').textContent = history[0];
    }
    showHistoryCount();
});
