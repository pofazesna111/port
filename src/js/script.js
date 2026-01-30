// typing
const roles = ["Frontend разработчик", "UI дизайнер", "Студент"];
let i = 0, j = 0;
const typing = document.querySelector(".typing");

function type() {
  if (j < roles[i].length) {
    typing.textContent += roles[i][j++];
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  if (j > 0) {
    typing.textContent = roles[i].substring(0, --j);
    setTimeout(erase, 50);
  } else {
    i = (i + 1) % roles.length;
    setTimeout(type, 300);
  }
}
type();

// reveal + skills
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";

      entry.target.querySelectorAll(".progress div").forEach(bar => {
        bar.style.width = bar.dataset.progress;
      });

      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

reveals.forEach(el => observer.observe(el));

// form
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("formMessage").textContent = "Сообщение отправлено!";
});
