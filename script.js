// ==========================
// 🌌 PARTICLES SYSTEM (SAFE)
// ==========================

const canvas = document.getElementById("particles");

if (canvas) {
  const ctx = canvas.getContext("2d");

  let particles = [];
  let particleCount;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function initParticles() {
    particles = [];
    particleCount = window.innerWidth < 768 ? 40 : 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2,
        dx: (Math.random() - 0.5),
        dy: (Math.random() - 0.5)
      });
    }
  }

  window.addEventListener("resize", () => {
    resizeCanvas();
    initParticles();
  });

  resizeCanvas();
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
}

// ==========================
// 📜 SCROLL REVEAL (SAFE)
// ==========================

const reveals = document.querySelectorAll(".reveal");

if (reveals.length > 0) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
}

// ==========================
// 📉 SCROLL INTENSITY
// ==========================

window.addEventListener("scroll", () => {
  document.body.classList.toggle("scrolled", window.scrollY > 100);
});

// ==========================
// 🔍 CLICK DEBUG (SAFE)
// ==========================

document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    console.log("Clicked:", link.textContent);
  });
});


// =====================================================
// 🌱 FRUITSTAND SERVICE SYSTEM (FINAL FIXED + UPGRADED)
// =====================================================

(function initServiceSystem() {

  const serviceEls = document.querySelectorAll(".service");
  const tierEls = document.querySelectorAll(".tier");

  const summaryBundle = document.getElementById("summaryBundle");
  const summaryServices = document.getElementById("summaryServices");
  const summaryTotal = document.getElementById("summaryTotal");
  const statusText = document.getElementById("statusText");

  const demoBtn = document.getElementById("demoBtn");
  const finalSubmit = document.getElementById("finalSubmit");

  if (!serviceEls.length && !tierEls.length) return;

  const selectedServices = new Map();
  let selectedBundle = null;

  function updateUI() {

    const names = Array.from(selectedServices.keys());
    const prices = Array.from(selectedServices.values());
    const total = prices.reduce((a, b) => a + b, 0);

    // =========================
    // SUMMARY PANEL
    // =========================
    if (summaryBundle) {
      summaryBundle.textContent = selectedBundle || "None selected";
    }

    if (summaryServices) {
      summaryServices.textContent =
        names.length ? names.join(", ") : "None selected";
    }

    if (summaryTotal) {
      summaryTotal.textContent = `$${total}`;
    }

    if (statusText) {
      statusText.textContent =
        (names.length || selectedBundle)
          ? "Ready to send release request"
          : "Select items to begin";
    }

    // =========================
    // EMAIL BUILDER
    // =========================
    let body = `Hi FruitStand,\n\nI’m interested in the following:\n\n`;

    if (selectedBundle) {
      body += `PACKAGE:\n- ${selectedBundle}\n\n`;
    }

    body += `SERVICES:\n`;
    body += names.length
      ? names.map(s => "- " + s).join("\n")
      : "- None selected";

    body += `\n\nEstimated Total: $${total}`;
    body += `\n\nArtist Name:\nTrack Link:\n\nThanks.`;

    const mailto =
      "mailto:fruitstandproductions1@outlook.com" +
      "?subject=" + encodeURIComponent("FruitStand Release Inquiry") +
      "&body=" + encodeURIComponent(body);

    if (demoBtn) demoBtn.href = mailto;
    if (finalSubmit) finalSubmit.href = mailto;
  }

  // =========================
  // SERVICE CLICK SYSTEM
  // =========================
  serviceEls.forEach(el => {
    el.addEventListener("click", () => {

      const name = el.dataset.name;
      const price = Number(el.dataset.price || 0);

      if (selectedServices.has(name)) {
        selectedServices.delete(name);
        el.classList.remove("active");
      } else {
        selectedServices.set(name, price);
        el.classList.add("active");
      }

      updateUI();
    });
  });

  // =========================
  // BUNDLE CLICK SYSTEM
  // =========================
  tierEls.forEach(el => {
    el.addEventListener("click", () => {

      const name =
        el.dataset.bundle ||
        el.querySelector("h3")?.textContent?.trim();

      if (selectedBundle === name) {
        selectedBundle = null;
        el.classList.remove("active");
      } else {
        tierEls.forEach(t => t.classList.remove("active"));
        selectedBundle = name;
        el.classList.add("active");
      }

      updateUI();
    });
  });

  updateUI();

})();