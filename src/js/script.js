// Typing effect
const roles = [
  "Frontend разработчик",
  "UI дизайнер",
  "Студент"
];

let index = 0;
let char = 0;
const typing = document.querySelector(".typing");

function type() {
  if (char < roles[index].length) {
    typing.textContent += roles[index][char];
    char++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  if (char > 0) {
    typing.textContent = roles[index].substring(0, char - 1);
    char--;
    setTimeout(erase, 50);
  } else {
    index = (index + 1) % roles.length;
    setTimeout(type, 300);
  }
}

type();

// Form validation
const form = document.getElementById("contactForm");
const msg = document.getElementById("formMessage");

form.addEventListener("submit", e => {
  e.preventDefault();
  msg.textContent = "Сообщение отправлено!";
  msg.style.color = "#38bdf8";
  form.reset();
});
