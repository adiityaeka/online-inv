// Countdown
const targetDate = new Date("December 20, 2025 10:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  const days = Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const minutes = Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Message Guestbook
const form = document.getElementById("messageForm");
const board = document.getElementById("messageBoard");

function loadMessages() {
  const messages = JSON.parse(localStorage.getItem("weddingMessages")) || [];
  board.innerHTML = "<h3>Messages</h3>";

  messages.forEach(msg => {
    const div = document.createElement("div");
    div.className = "entry";
    div.innerHTML = `
      <p class="entry-name">${msg.name}</p>
      <p>${msg.message}</p>
    `;
    board.appendChild(div);
  });
}

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("guestName").value.trim();
  const message = document.getElementById("guestMessage").value.trim();

  if (!name || !message) return;

  const messages = JSON.parse(localStorage.getItem("weddingMessages")) || [];
  messages.unshift({ name, message });

  form.reset();
  loadMessages();
});

loadMessages();

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target); // Animate once
      }
    });
  }, {
    threshold: 0.3
  });

  document.querySelectorAll('.profile-card, .ampersand').forEach(el => {
    observer.observe(el);
  });

function createPetal() {
  const petal = document.createElement("div");
  petal.classList.add("petal");

  // Random horizontal start position
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.animationDuration = 4 + Math.random() * 3 + "s";
  petal.style.opacity = Math.random();

  // Append to overlay
  document.getElementById("welcomeOverlay").appendChild(petal);

  // Remove after animation
  setTimeout(() => {
    petal.remove();
  }, 7000);

  const rotateDirection = Math.random() > 0.5 ? 1 : -1;
  petal.style.setProperty('--rotateDir', rotateDirection);
}

// Create petals repeatedly only on the overlay
const petalInterval = setInterval(createPetal, 800);

function openInvitation() {
  const overlay = document.getElementById("welcomeOverlay");
  overlay.classList.add("hide");

  // Start background music
  const bgMusic = document.getElementById("bgMusic");
  bgMusic.play().catch(err => {
    console.log("Autoplay failed:", err);
  });

  // Stop petals after overlay hides
  setTimeout(() => {
    clearInterval(petalInterval);
    overlay.style.display = "none";
  }, 1000); // match to overlay slide duration
}

const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");

musicToggle.addEventListener("click", () => {
  if (bgMusic.muted) {
    bgMusic.muted = false;
    musicIcon.src = "unmute.svg";
  } else {
    bgMusic.muted = true;
    musicIcon.src = "mute.svg";
  }
});

// Insert guest name
const params = new URLSearchParams(window.location.search);
const invitee = params.get("to");
if (invitee) {
  document.querySelector(".invitee-name").textContent = `Dear ${decodeURIComponent(invitee)},`;
}

  