'use strict';
const groups = window.MENU_GROUPS || [];
let selected = groups[0]?.id || 'breakfast';
let query = '';
const categories = document.getElementById('menu-categories');
const results = document.getElementById('menu-results');
const search = document.getElementById('menu-search');
const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
function renderMenu(all = false) {
  const normalized = query.toLowerCase().trim();
  let count = 0;
  results.innerHTML = groups.filter(group => all || normalized || group.id === selected).map(group => {
    const items = group.items.filter(item => all || !normalized || `${item.name} ${item.description || ''} ${group.label}`.toLowerCase().includes(normalized));
    if (!items.length) return '';
    count += items.length;
    return `<section class="menu-group" aria-labelledby="group-${escapeHtml(group.id)}"><h3 class="menu-group-heading" id="group-${escapeHtml(group.id)}">${escapeHtml(group.label)}</h3><p class="group-note">${escapeHtml(group.note || '')}</p><div class="menu-items">${items.map(item => `<article class="menu-item"><div><h4>${escapeHtml(item.name)}</h4>${item.description ? `<p>${escapeHtml(item.description)}</p>` : ''}</div><span class="menu-price">${escapeHtml(item.price || 'Ask us')}</span></article>`).join('')}</div></section>`;
  }).join('');
  if (!count) results.innerHTML = `<div class="empty-menu"><h3>No favorites found just yet.</h3><p>Try “biscuit,” “chicken,” or “coffee.”</p><button class="text-link" type="button" id="clear-search">Clear search</button></div>`;
  document.getElementById('menu-count').textContent = `${count} menu items shown${normalized ? ` for ${query}` : ''}.`;
  document.getElementById('clear-search')?.addEventListener('click', () => { query = ''; search.value = ''; renderMenu(); search.focus(); });
  categories.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(!normalized && button.dataset.category === selected)));
}
for (const group of groups) {
  const button = document.createElement('button');
  button.type = 'button'; button.className = 'category-button'; button.dataset.category = group.id;
  button.textContent = ({breakfast:'Breakfast',biscuits:'Biscuits',pancakes:'Pancakes',lunch:'Lunch plates',sandwiches:'Sandwiches',sides:'Sides',drinks:'Drinks'})[group.id] || group.label; button.setAttribute('aria-pressed', String(group.id === selected));
  button.addEventListener('click', () => { selected = group.id; query = ''; search.value = ''; renderMenu(); });
  categories.append(button);
}
search.addEventListener('input', () => { query = search.value; renderMenu(); });
renderMenu();
const dialog = document.getElementById('photo-dialog');
const dialogImage = document.getElementById('dialog-image');
document.querySelectorAll('[data-photo]').forEach(button => button.addEventListener('click', () => { dialogImage.src = button.dataset.photo; dialogImage.alt = button.querySelector('img').alt; document.getElementById('photo-caption').textContent = button.dataset.caption; dialog.showModal(); }));
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
document.getElementById('print-menu').addEventListener('click', () => window.print());
window.addEventListener('beforeprint', () => renderMenu(true));
window.addEventListener('afterprint', () => renderMenu());
