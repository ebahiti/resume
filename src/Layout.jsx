import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { initGlobal } from './dom-init';
import { SEO } from './components/SEO';
import { OptimizedImage } from './components/OptimizedImage';

export function Layout() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    initGlobal();
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="site wp-site-blocks" id="wrapper">
      <SEO />
      <a className="skip-link screen-reader-text" href="#main">Skip to content</a>

      <header id="masthead" className="site-header" role="banner">
        <div id="main-header" className="site-header-wrap">
          <div className="site-header-inner-wrap">
            <div className="site-header-upper-wrap">
              <div className="site-header-upper-inner-wrap">
                <div className="site-top-header-wrap site-header-row-container">
                  <div className="site-header-row-container-inner">
                    <div className="site-container site-header-inner">
                      <div className="site-top-header-inner-wrap site-header-row site-header-row-has-sides">
                        <div className="site-header-top-section-left site-header-section">
                          <div className="site-branding">
                            <NavLink className="brand has-logo-image" to="/" rel="home">
                              <OptimizedImage src="/assets/logo.png" className="custom-logo" alt="Elinor Bahiti" width={200} height={80} decoding="async" />
                            </NavLink>
                          </div>
                        </div>
                        <div className="site-header-top-section-right site-header-section">
                          <button
                            type="button"
                            className={'menu-toggle' + (menuOpen ? ' is-open' : '')}
                            aria-expanded={menuOpen}
                            aria-label="Toggle menu"
                            aria-controls="primary-menu"
                            onClick={() => setMenuOpen(!menuOpen)}
                          >
                            <span className="menu-toggle-inner" aria-hidden>
                              <span className="menu-toggle-bar" />
                              <span className="menu-toggle-bar" />
                              <span className="menu-toggle-bar" />
                            </span>
                          </button>
                          <nav id="site-navigation" className={'main-navigation' + (menuOpen ? ' nav-open' : '')} role="navigation" aria-label="Primary">
                            <div className="primary-menu-container">
                              <ul id="primary-menu" className="menu">
                                <li className={'menu-item' + (location.pathname === '/' ? ' current-menu-item' : '')}>
                                  <NavLink to="/" end>Profile</NavLink>
                                </li>
                                <li className={'menu-item' + (location.pathname === '/credentials' ? ' current-menu-item' : '')}>
                                  <NavLink to="/credentials">Credentials</NavLink>
                                </li>
                                <li className={'menu-item' + (location.pathname === '/services' ? ' current-menu-item' : '')}>
                                  <NavLink to="/services">Services</NavLink>
                                </li>
                                <li className={'menu-item' + (location.pathname === '/contact' ? ' current-menu-item' : '')}>
                                  <NavLink to="/contact">Contact</NavLink>
                                </li>
                              </ul>
                            </div>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main id="inner-wrap" className="wrap" role="main">
        <div id="primary" className="content-area">
          <div className="content-container site-container">
            <div id="main" className="site-main">
              <div className="content-wrap">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer id="colophon" className="site-footer" role="contentinfo">
        <div className="site-footer-wrap">
          <div className="site-top-footer-wrap site-footer-row-container">
            <div className="site-footer-row-container-inner">
              <div className="site-container">
                <div className="site-top-footer-inner-wrap site-footer-row site-footer-row-columns-2">
                  <div className="site-footer-top-section-1 site-footer-section"></div>
                  <div className="site-footer-top-section-2 site-footer-section">
                    <nav id="footer-navigation" className="footer-navigation" role="navigation" aria-label="Footer">
                      <div className="footer-menu-container">
                        <ul id="footer-menu" className="menu">
                          <li className="menu-item"><NavLink to="/">Profile</NavLink></li>
                          <li className="menu-item"><NavLink to="/credentials">Credentials</NavLink></li>
                          <li className="menu-item"><NavLink to="/services">Services</NavLink></li>
                          <li className="menu-item"><NavLink to="/contact">Contact</NavLink></li>
                        </ul>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="site-bottom-footer-wrap site-footer-row-container">
            <div className="site-footer-row-container-inner">
              <div className="site-container">
                <div className="site-bottom-footer-inner-wrap site-footer-row">
                  <div className="site-footer-bottom-section-1 site-footer-section site-info">
                    <div className="footer-html-inner">
                      <p>&copy; 2026 Elinor Bahiti</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <a id="kt-scroll-up" href="#wrapper" className="kadence-scroll-to-top scroll-up-wrap" aria-label="Scroll to top" tabIndex={-1} onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
        <span className="kadence-svg-iconset">
          <svg aria-hidden="true" className="kadence-svg-icon kadence-arrow-up2-svg" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="26" height="28" viewBox="0 0 26 28">
            <title>Scroll to top</title>
            <path d="M25.172 15.172c0 0.531-0.219 1.031-0.578 1.406l-1.172 1.172c-0.375 0.375-0.891 0.594-1.422 0.594s-1.047-0.219-1.406-0.594l-4.594-4.578v11c0 1.125-0.938 1.828-2 1.828h-2c-1.062 0-2-0.703-2-1.828v-11l-4.594 4.578c-0.359 0.375-0.875 0.594-1.406 0.594s-1.047-0.219-1.406-0.594l-1.172-1.172c-0.375-0.375-0.594-0.875-0.594-1.406s0.219-1.047 0.594-1.422l10.172-10.172c0.359-0.375 0.875-0.578 1.406-0.578s1.047 0.203 1.422 0.578l10.172 10.172c0.359 0.375 0.578 0.891 0.578 1.422z" />
          </svg>
        </span>
      </a>
    </div>
  );
}
