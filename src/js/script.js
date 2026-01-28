const roles = ["Frontend разработчик", "Студент", "Web developer"];
let i = 0;
const el = document.querySelector(".typing");

setInterval(() => {
  el.textContent = roles[i];
  i = (i + 1) % roles.length;
}, 2000);

document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("formMessage").textContent =
    "Сообщение отправлено!";
});
