document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Card slider logic
  const track = document.querySelector('.card-slider-track');
  if (track) {
    const cards = track.querySelectorAll('.card');

    if (cards.length > 0) cards[0].classList.add('active');

    function updateActiveCard() {
      const center = track.scrollLeft + track.offsetWidth / 2;
      cards.forEach(card => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(center - cardCenter);
        card.classList.toggle('active', distance < card.offsetWidth / 2);
      });
    }

    track.addEventListener('scroll', updateActiveCard);
    window.addEventListener('load', updateActiveCard);

    window.slideCards = function (direction) {
      const scrollAmount = 260;
      if (direction === -1 && track.scrollLeft === 0) {
        track.classList.add('shake-left');
        setTimeout(() => track.classList.remove('shake-left'), 500);
        return;
      }
      track.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
      });
    }
  }

  // Reveal on scroll
  function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;
      const elementBottom = el.getBoundingClientRect().bottom;
      const revealPoint = 100;

      if (elementTop < windowHeight - revealPoint && elementBottom > 0) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('load', revealOnScroll);

  // Scroll spy
  const dots = document.querySelectorAll('.scroll-indicator .dot');
  const sections = [...dots].map(dot => document.getElementById(dot.dataset.section));

  function activateDot() {
    const scrollY = window.scrollY;
    let closestIndex = 0;
    let closestOffset = Infinity;

    sections.forEach((section, i) => {
      const offset = Math.abs(section.offsetTop - scrollY);
      if (offset < closestOffset) {
        closestOffset = offset;
        closestIndex = i;
      }
    });

    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[closestIndex]) {
      dots[closestIndex].classList.add('active');
    }
  }

  window.addEventListener('scroll', activateDot);
  window.addEventListener('load', activateDot);

  // ✅ Typing animation (tidak disarangkan!)
// === TYPING EFFECT ===
const phrases = [
  "Mountains I’ve Conquered.",
  "Moments I’ve Kept."
];

const typedText = document.getElementById("typed-text");
let currentPhrase = 0;
let charIndex = 0;
let isDeleting = false;
let fullText = "";

function typeEffect() {
  if (!isDeleting) {
    const current = phrases[currentPhrase];
    typedText.innerHTML = fullText + current.substring(0, charIndex++);

    if (charIndex > current.length) {
      fullText += current + "<br>"; // Simpan dan lanjut ke baris berikutnya
      currentPhrase++;

      if (currentPhrase < phrases.length) {
        charIndex = 0;
        setTimeout(typeEffect, 1000); // jeda sebelum baris berikutnya
      } else {
        // Semua baris selesai → tunggu lalu hapus semua
        setTimeout(() => {
          isDeleting = true;
          typeEffect();
        }, 2500);
      }
    } else {
      setTimeout(typeEffect, 100);
    }

  } else {
    // Hapus semua sekaligus
    typedText.innerHTML = "";
    fullText = "";
    currentPhrase = 0;
    charIndex = 0;
    isDeleting = false;
    setTimeout(typeEffect, 1000); // ulang dari awal
  }
}

// Mulai saat halaman dimuat
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(typeEffect, 1000);
});

});
