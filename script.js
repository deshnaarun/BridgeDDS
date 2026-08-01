const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");

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
