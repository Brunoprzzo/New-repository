const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const form = document.getElementById('signupForm');
const formMessage = document.getElementById('formMessage');

// Mobile menu toggle
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Scroll reveal animation
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => revealObserver.observe(el));

// Animated counters
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const counter = entry.target;
      const target = Number(counter.dataset.target);
      let count = 0;
      const step = Math.max(1, Math.ceil(target / 70));

      const interval = setInterval(() => {
        count += step;
        if (count >= target) {
          counter.textContent = `${target}${target === 3000 ? '+' : '+'}`;
          clearInterval(interval);
          counterObserver.unobserve(counter);
        } else {
          counter.textContent = count;
        }
      }, 25);
    });
  },
  { threshold: 0.6 }
);

counters.forEach((counter) => counterObserver.observe(counter));

// Membership form validation + submit
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const plan = document.getElementById('plan').value;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9+()\-\s]{7,20}$/;

  if (!name || !email || !phone || !plan) {
    formMessage.textContent = 'Please fill out all fields.';
    formMessage.style.color = '#ff5e5e';
    return;
  }

  if (!emailRegex.test(email)) {
    formMessage.textContent = 'Please enter a valid email address.';
    formMessage.style.color = '#ff5e5e';
    return;
  }

  if (!phoneRegex.test(phone)) {
    formMessage.textContent = 'Please enter a valid phone number.';
    formMessage.style.color = '#ff5e5e';
    return;
  }

  try {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, plan })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Could not submit form.');
    }

    formMessage.textContent = result.message;
    formMessage.style.color = '#39d353';
    form.reset();
  } catch (error) {
    formMessage.textContent = error.message;
    formMessage.style.color = '#ff5e5e';
  }
});
