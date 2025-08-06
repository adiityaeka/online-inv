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
const pagination = document.getElementById("pagination");

const MESSAGES_PER_PAGE = 5;
let currentPage = 1;

function loadMessages(page = 1) {
  const messages = JSON.parse(localStorage.getItem("weddingMessages")) || [];
  const totalPages = Math.ceil(messages.length / MESSAGES_PER_PAGE);
  currentPage = Math.max(1, Math.min(page, totalPages));

  board.innerHTML = "<h3>Messages</h3>";

  const start = (currentPage - 1) * MESSAGES_PER_PAGE;
  const end = start + MESSAGES_PER_PAGE;
  const visibleMessages = messages.slice(start, end);

  visibleMessages.forEach(msg => {
    const div = document.createElement("div");
    div.className = "entry";
    div.innerHTML = `
      <p class="entry-name">${msg.name}</p>
      <p>${msg.message}</p>
    `;
    board.appendChild(div);
  });

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  pagination.innerHTML = "";

  const createButton = (text, page, disabled = false, active = false) => {
    const btn = document.createElement("button");
    btn.innerHTML = text;
    if (disabled) btn.classList.add("disabled");
    if (active) btn.classList.add("active");
    if (!disabled && !active) {
      btn.addEventListener("click", () => loadMessages(page));
    }
    pagination.appendChild(btn);
  };

  // Previous button
  createButton('<span class="arrow">←</span> <span class="text">Sebelumnya</span>', currentPage - 1, currentPage === 1);

  let pages = [];

  if (totalPages <= 7) {
    // Show all pages
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    if (currentPage <= 4) {
      // Near start
      pages = [1, 2, 3, 4, 5, '...', totalPages];
    } else if (currentPage >= totalPages - 3) {
      // Near end
      pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      // Middle range
      pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    }
  }

  // Render the calculated pages
  pages.forEach(p => {
    if (p === '...') {
      const dots = document.createElement("span");
      dots.textContent = "...";
      pagination.appendChild(dots);
    } else {
      createButton(p.toString(), p, false, p === currentPage);
    }
  });

  // Next button
  createButton('<span class="text">Selanjutnya</span> <span class="arrow">→</span>', currentPage + 1, currentPage === totalPages);
}

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("guestName").value.trim();
  const message = document.getElementById("guestMessage").value.trim();

  if (!name || !message) return;

  const messages = JSON.parse(localStorage.getItem("weddingMessages")) || [];
  messages.unshift({ name, message });
  localStorage.setItem("weddingMessages", JSON.stringify(messages));

  form.reset();
  loadMessages(1); // back to first page
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

  
