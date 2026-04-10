
// ==========================
// 🌌 PARTICLES SYSTEM
// ==========================

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
let particleCount = window.innerWidth < 768 ? 40 : 80;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", () => {
  resizeCanvas();
  initParticles();
});

resizeCanvas();

function initParticles() {
  particles = [];
  particleCount = window.innerWidth < 768 ? 40 : 80;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2,
      dx: (Math.random() - 0.5) * 1.2,
      dy: (Math.random() - 0.5) * 1.2
    });
  }
}

initParticles();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,0,0,0.6)";
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });

  requestAnimationFrame(animate);
}

animate();


// ==========================
// 🖱️ CURSOR
// ==========================

const cursor = document.querySelector(".cursor");

if (window.matchMedia("(pointer: fine)").matches) {
  document.addEventListener("mousemove", e => {
    cursor.style.top = e.clientY + "px";
    cursor.style.left = e.clientX + "px";
  });
} else {
  cursor.style.display = "none";
}


// ==========================
// 👀 SCROLL REVEAL
// ==========================

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));


// ==========================
// 🧭 NAVIGATION
// ==========================

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const target = document.querySelector(link.getAttribute("href"));

    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});


// ==========================
// 🔗 CLICK DEBUG
// ==========================

document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    console.log("Clicked:", link.textContent);
  });
});