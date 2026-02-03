function showGame(id) {
  document.querySelectorAll(".game-card").forEach(g => g.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// 3D Tilt для карточек
document.querySelectorAll(".game-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = ((y / r.height) - .5) * -12;
    const ry = ((x / r.width) - .5) * 12;
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
  });
});

// Ripple effect
document.querySelectorAll(".game-card button").forEach(btn => {
  btn.addEventListener("click", e => {
    const r = btn.getBoundingClientRect();
    const size = Math.max(r.width, r.height);
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = e.clientX - r.left - size/2 + "px";
    ripple.style.top = e.clientY - r.top - size/2 + "px";
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});
