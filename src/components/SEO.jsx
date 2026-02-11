import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BASE_URL, routeMetadata, defaultMetadata } from '../seo-config';

function setMeta(nameOrProp, content, isProperty = false) {
  const attr = isProperty ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${nameOrProp}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, nameOrProp);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function SEO() {
  const location = useLocation();
  const pathname = location.pathname.replace(/\/$/, '') || '/';
  const meta = routeMetadata[pathname] || defaultMetadata;
  const canonicalUrl = pathname === '/' ? BASE_URL + '/' : BASE_URL + pathname;

  useEffect(() => {
    document.title = meta.title;
    setMeta('description', meta.description);
    setCanonical(canonicalUrl);

    setMeta('og:title', meta.title, true);
    setMeta('og:description', meta.description, true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('og:type', 'website', true);
    setMeta('og:site_name', 'Elinor Bahiti', true);
    setMeta('og:locale', 'en_US', true);

    setMeta('twitter:card', 'summary');
    setMeta('twitter:title', meta.title);
    setMeta('twitter:description', meta.description);
  }, [pathname, meta.title, meta.description, canonicalUrl]);

  return null;
}
