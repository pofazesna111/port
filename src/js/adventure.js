const heroes = ['рыцарь', 'маг', 'вор'];
const locations = ['тёмный лес', 'заброшенный замок', 'подводное царство'];
const villains = ['дракон', 'колдун', 'гоблин'];

document.getElementById('generateAdventure').addEventListener('click', () => {
    const hero = heroes[random(heroes.length)];
    const location = locations[random(locations.length)];
    const villain = villains[random(villains.length)];

    const text = `Ваш персонаж — ${hero}, находится в ${location} и сражается с ${villain}.`;
    document.getElementById('adventureText').textContent = text;

    localStorage.setItem('lastAdventure', text);
});

function random(max) {
    return Math.floor(Math.random() * max);
}
