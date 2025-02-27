const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".container__left h1", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".container_left .container_btn", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".container__right h4", {
  ...scrollRevealOption,
  delay: 2000,
});
ScrollReveal().reveal(".container__right h2", {
  ...scrollRevealOption,
  delay: 2500,
});
ScrollReveal().reveal(".container__right h3", {
  ...scrollRevealOption,
  delay: 3000,
});
ScrollReveal().reveal(".container__right p", {
  ...scrollRevealOption,
  delay: 3500,
});

ScrollReveal().reveal(".container__right .tent-1", {
  duration: 1000,
  delay: 4000,
});
ScrollReveal().reveal(".container__right .tent-2", {
  duration: 1000,
  delay: 4500,
});

ScrollReveal().reveal(".location", {
  ...scrollRevealOption,
  origin: "left",
  delay: 5000,
});

ScrollReveal().reveal(".socials span", {
  ...scrollRevealOption,
  origin: "top",
  delay: 5500,
  interval: 500,
});
document.querySelectorAll('.nav__links a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      document.getElementById(targetId).scrollIntoView({
          behavior: 'smooth'
      });
  });
});
document.querySelectorAll('.nav__links a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      document.getElementById(targetId).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

document.querySelector('.contact-us form').addEventListener('submit', function(e) {
  e.preventDefault(); 

  const successMessage = document.createElement('p');
  successMessage.textContent = "✅ Your message has been sent!";
  successMessage.style.color = "#28a745";
  successMessage.style.fontSize = "1.2rem";
  successMessage.style.marginBottom = "1rem";
  successMessage.style.fontWeight = "bold";
  
  const form = document.querySelector('.contact-us form');
  const parent = form.parentNode;
  const existingMessage = document.querySelector('.contact-success');
  if (existingMessage) {
      existingMessage.remove();
  }

  successMessage.classList.add('contact-success');
  parent.insertBefore(successMessage, form);

  form.reset();

  setTimeout(() => {
      successMessage.remove();
  }, 3000);
});