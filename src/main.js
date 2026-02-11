/**
 * Quote of the Day: load from local assets/quote_of_the_day.txt, one quote per day.
 * Daily rotation at 9:00 AM local time. No external API. Fails gracefully if file is missing.
 */
(function () {
  const container = document.getElementById('quote-container');
  if (!container) return;

  const QUOTE_FILE_URL = '/assets/quote_of_the_day.txt';
  const ROLLOVER_HOUR = 9; // 9:00 AM local

  /** Get the "quote date": today, or yesterday if before 9:00 AM local. */
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

  /** Deterministic index from date so the same quote is used all day until next 9 AM. */
  function getDayIndex(date, totalQuotes) {
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDate();
    const dayKey = y * 10000 + m * 100 + d;
    return Math.abs(dayKey) % totalQuotes;
  }

  /** Parse file text into array of { quote, author }. Format: "Quote text" - Author Name (handles line wraps). Accepts curly/smart quotes. */
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

  function showFallback(message) {
    container.textContent = message;
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
    .catch(() => {
      showFallback('Quote unavailable.');
    });
})();

/**
 * Header: transparent at top, blurry opaque when scrolled.
 */
(function () {
  const header = document.getElementById('masthead');
  if (!header) return;

  const threshold = 8;
  function updateHeader() {
    if (window.scrollY > threshold) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
})();

/**
 * Scroll reveal: fly in from below when section enters viewport.
 */
(function () {
  const elements = document.querySelectorAll('.scroll-reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { rootMargin: '0px 0px -60px 0px', threshold: 0.1 }
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });
})();

/**
 * Expertise cards: fly in on scroll with ~0.5s stagger (first to last).
 */
(function () {
  const section = document.querySelector('.expertise-cards-section');
  if (!section) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          section.classList.add('cards-visible');
        }
      });
    },
    { rootMargin: '0px 0px -80px 0px', threshold: 0.08 }
  );

  observer.observe(section);
})();

/**
 * Scroll-to-top button: show after user scrolls down.
 */
(function () {
  const scrollUp = document.getElementById('kt-scroll-up');
  if (!scrollUp) return;

  const threshold = 300;
  function updateVisibility() {
    if (window.scrollY > threshold) {
      scrollUp.classList.add('visible');
    } else {
      scrollUp.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', updateVisibility, { passive: true });
  updateVisibility();
})();
