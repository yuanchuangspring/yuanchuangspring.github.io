const copyBtn = document.querySelector('[data-copy-bibtex]');
const bibtex = document.getElementById('bibtex');

if (copyBtn && bibtex) {
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(bibtex.innerText.trim());
      copyBtn.textContent = 'Copied!';
      setTimeout(() => (copyBtn.textContent = 'Copy'), 1600);
    } catch {
      copyBtn.textContent = 'Select text';
    }
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();
