/**
 * DOM init helpers for header scroll, scroll-to-top, quote, scroll-reveal, expertise.
 * Called from React after mount so elements exist.
 */

export function initGlobal() {
  const header = document.getElementById('masthead');
  if (header) {
    const threshold = 8;
    function updateHeader() {
      if (window.scrollY > threshold) header.classList.add('header-scrolled');
      else header.classList.remove('header-scrolled');
    }
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  const scrollUp = document.getElementById('kt-scroll-up');
  if (scrollUp) {
    const threshold = 300;
    function updateVisibility() {
      if (window.scrollY > threshold) scrollUp.classList.add('visible');
      else scrollUp.classList.remove('visible');
    }
    window.addEventListener('scroll', updateVisibility, { passive: true });
    updateVisibility();
  }
}

export function initHomePage() {
  const container = document.getElementById('quote-container');
  if (container) {
    const QUOTE_FILE_URL = '/assets/quote_of_the_day.txt';
    const ROLLOVER_HOUR = 9;
    function getQuoteDate() {
      const now = new Date();
      const rollover = new Date(now);
      rollover.setHours(ROLLOVER_HOUR, 0, 0, 0);
      if (now < rollover) {
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday;
      }
      return now;
    }
    function getDayIndex(date, totalQuotes) {
      const y = date.getFullYear();
      const m = date.getMonth();
      const d = date.getDate();
      const dayKey = y * 10000 + m * 100 + d;
      return Math.abs(dayKey) % totalQuotes;
    }
    function parseQuotes(text) {
      const straightQuotes = text.replace(/\u201C/g, '"').replace(/\u201D/g, '"');
      const normalized = straightQuotes.replace(/\s+/g, ' ').trim();
      const regex = /"([^"]*)"\s*-\s*([^"]+?)(?=\s*"|$)/g;
      const quotes = [];
      let m;
      while ((m = regex.exec(normalized)) !== null) {
        const quote = m[1].trim();
        const author = m[2].trim();
        if (quote) quotes.push({ quote, author });
      }
      return quotes;
    }
    function showFallback(msg) {
      container.textContent = msg;
    }
    fetch(QUOTE_FILE_URL)
      .then((res) => (res.ok ? res.text() : Promise.reject(new Error('File not found'))))
      .then((text) => {
        const quotes = parseQuotes(text);
        if (!quotes.length) {
          showFallback('No quotes available.');
          return;
        }
        const quoteDate = getQuoteDate();
        const index = getDayIndex(quoteDate, quotes.length);
        const { quote, author } = quotes[index];
        container.textContent = '"' + quote + '"' + (author ? ' — ' + author : '');
      })
      .catch(() => showFallback('Quote unavailable.'));
  }

  const scrollReveal = document.querySelectorAll('.scroll-reveal');
  if (scrollReveal.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.1 }
    );
    scrollReveal.forEach((el) => observer.observe(el));
  }

  const section = document.querySelector('.expertise-cards-section');
  if (section) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) section.classList.add('cards-visible');
        });
      },
      { rootMargin: '0px 0px -80px 0px', threshold: 0.08 }
    );
    observer.observe(section);
  }
}
