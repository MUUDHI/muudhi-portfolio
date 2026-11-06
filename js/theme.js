/**
 * theme.js — Light/dark theme toggle with localStorage persistence.
 * Loaded synchronously in <head> so the saved theme is applied before first paint
 * (no flash of the wrong theme). Button wiring runs after the DOM is ready.
 */
(() => {
  'use strict';

  const STORAGE_KEY = 'muudhi-theme';
  const DEFAULT_THEME = 'dark';
  const root = document.documentElement;

  const isValid = (value) => value === 'light' || value === 'dark';

  const readSaved = () => {
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
  };

  const save = (theme) => {
    try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* private mode: ignore */ }
  };

  const syncChrome = (theme) => {
    // Keep the browser UI colour in step with the page.
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#F7F5F0' : '#0B1220');

    const button = document.getElementById('themeToggleBtn');
    if (button) {
      const next = theme === 'dark' ? 'light' : 'dark';
      button.setAttribute('aria-label', `Switch to ${next} theme`);
      button.setAttribute('title', `Switch to ${next} theme`);
    }
  };

  const apply = (theme) => {
    root.setAttribute('data-theme', theme);
    syncChrome(theme);
  };

  const current = () => (root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

  // 1. Apply immediately (before body renders)
  const saved = readSaved();
  apply(isValid(saved) ? saved : DEFAULT_THEME);

  // 2. Wire the toggle once the DOM exists
  document.addEventListener('DOMContentLoaded', () => {
    syncChrome(current());

    const button = document.getElementById('themeToggleBtn');
    if (button) {
      button.addEventListener('click', () => {
        const next = current() === 'dark' ? 'light' : 'dark';
        apply(next);
        save(next);
      });
    }
  });

  // 3. Stay in sync if the choice changes in another tab
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY && isValid(event.newValue)) apply(event.newValue);
  });
})();
