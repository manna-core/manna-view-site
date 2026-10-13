'use strict';
const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('main-nav');
function closeNav() { nav.classList.remove('is-open'); navToggle.setAttribute('aria-expanded', 'false'); }
navToggle.addEventListener('click', () => { const open = nav.classList.toggle('is-open'); navToggle.setAttribute('aria-expanded', String(open)); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('is-open')) { closeNav(); navToggle.focus(); } });
document.getElementById('year').textContent = new Date().getFullYear();

// Citation links reveal the source list before following their fragment.
function revealSource(hash) {
  if (!hash.startsWith('#source-')) return;
  const details = document.querySelector('.story-sources details');
  if (details) details.open = true;
}
document.querySelectorAll('a[href^="#source-"]').forEach(link => {
  link.addEventListener('click', () => revealSource(link.hash));
});
revealSource(window.location.hash);
window.addEventListener('hashchange', () => revealSource(window.location.hash));
