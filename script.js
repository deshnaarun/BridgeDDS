const navbar = document.querySelector(".navbar");
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 8);
});

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

const links = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main .section");

links.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        links.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach((section) => observer.observe(section));

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");
  button.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    faqItems.forEach((other) => {
      other.classList.remove("open");
      other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      other.querySelector(".faq-icon").textContent = "+";
    });
    if (!isOpen) {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
      item.querySelector(".faq-icon").textContent = "×";
    }
  });
});

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add("in-view");
        obs.unobserve(el);
        // Drop the reveal/in-view classes once the entrance transition has
        // finished so they stop overriding transform on :hover.
        setTimeout(() => {
          el.classList.remove("reveal", "in-view");
        }, 1000);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);

reveals.forEach((el) => revealObserver.observe(el));

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute("data-target"), 10);
      const duration = 1000;
      const start = performance.now();

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.round(progress * target);
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  },
  { threshold: 0.5 }
);

counters.forEach((el) => counterObserver.observe(el));

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const track = carousel.querySelector("[data-track]");
  const prevBtn = carousel.querySelector(".carousel-btn.prev");
  const nextBtn = carousel.querySelector(".carousel-btn.next");
  const AUTOPLAY_DELAY = 3500;
  let autoplayId = null;

  const scrollStep = () => {
    const card = track.querySelector(".mentor-card");
    if (!card) return 0;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    return card.getBoundingClientRect().width + gap;
  };

  const advance = () => {
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    if (atEnd) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      track.scrollBy({ left: scrollStep(), behavior: "smooth" });
    }
  };

  const retreat = () => {
    if (track.scrollLeft <= 4) {
      track.scrollTo({ left: track.scrollWidth, behavior: "smooth" });
    } else {
      track.scrollBy({ left: -scrollStep(), behavior: "smooth" });
    }
  };

  const startAutoplay = () => {
    stopAutoplay();
    autoplayId = setInterval(advance, AUTOPLAY_DELAY);
  };

  const stopAutoplay = () => {
    if (autoplayId) clearInterval(autoplayId);
  };

  nextBtn.addEventListener("click", () => {
    advance();
    startAutoplay();
  });

  prevBtn.addEventListener("click", () => {
    retreat();
    startAutoplay();
  });

  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);

  startAutoplay();
});
