/* ================= MUSIC ================= */
const music = document.getElementById("bgMusic");
let musicStarted = false;

function startMusic() {
  if (musicStarted) return;
  musicStarted = true;

  music.currentTime = 0;
  music.volume = 0.75;

  music.play().catch(err => console.error(err));

  // Stop at 1:35 (95 seconds)
  setTimeout(() => {
    music.pause();
    music.currentTime = 0;
  }, 95000);
}

// Start music when user first interacts
document.addEventListener("click", startMusic, { once: true });

/* ================= SLIDE 1 TREE ================= */
const tree = document.getElementById("tree");
const STAR_COUNT = 240;
const HEIGHT = 360;

for (let i = 0; i < STAR_COUNT; i++) {
  const star = document.createElement("div");
  star.classList.add("star");

  if (i % 6 === 0) star.classList.add("bright");

  // Proper Christmas tree shape (tight triangle)
  const y = (i / STAR_COUNT) * HEIGHT;
  const spread = (1 - y / HEIGHT) * 170;
  const angle = Math.random() * Math.PI * 2;
  const radius = Math.random() * spread;

  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  star.style.transform = `
    translate3d(${x}px, ${y}px, ${z}px)
  `;

  star.style.animationDelay = `${Math.random() * 3}s`;
  tree.appendChild(star);
}

/* ================= SLIDE SWITCH ================= */
const slide1 = document.getElementById("slide1");
const slide2 = document.getElementById("slide2");

document.getElementById("giftButton").addEventListener("click", () => {
  slide1.classList.remove("active");
  slide2.classList.add("active");
});

/* ================= SNOW ================= */
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

const flakes = Array.from({ length: 180 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 3 + 1,
  s: Math.random() * 1.5 + 0.5
}));

function snow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";

  flakes.forEach(f => {
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    ctx.fill();
    f.y += f.s;
    if (f.y > canvas.height) {
      f.y = -10;
      f.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(snow);
}
snow();
