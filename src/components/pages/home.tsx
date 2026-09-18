import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/home.css';

const Home = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Reveal-on-scroll: one orchestrated pattern, not per-element noise.
    const revealEls = root.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));

    // Scroll parallax on framed screenshots.
    const parallaxEls = Array.from(
      root.querySelectorAll<HTMLElement>('.parallax-el')
    );
    let ticking = false;
    const updateParallax = () => {
      const vh = window.innerHeight;
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.speed || '0.05');
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - vh / 2;
        const offset = Math.max(-1, Math.min(1, center / vh)) * (speed * 220);
        el.style.transform = `translateY(${offset}px)`;
      });
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) {
      document.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', updateParallax);
      updateParallax();
    }

    return () => {
      io.disconnect();
      document.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateParallax);
    };
  }, []);

  return (
    <div className="home-container" ref={rootRef}>
      {/* HERO */}
      <header className="bm-hero">
        <div className="bm-hero-field">
          <div className="bm-grid-overlay" />
        </div>

        <div className="bm-orbit-visual" aria-hidden="true">
          <svg viewBox="0 0 640 640">
            <circle className="orbit-ring" cx="320" cy="320" r="120" />
            <circle className="orbit-ring" cx="320" cy="320" r="190" />
            <circle className="orbit-ring" cx="320" cy="320" r="260" />
            <g className="core-pulse">
              <circle cx="320" cy="320" r="46" fill="#0f0f13" stroke="#ff2f5e" strokeWidth="1.5" />
              <circle cx="320" cy="320" r="5" fill="#ff2f5e" />
            </g>
            <g className="orbit-node n1">
              <circle cx="320" cy="200" r="7" fill="#ff2f5e" />
            </g>
            <g className="orbit-node n2">
              <circle cx="510" cy="320" r="6" fill="#a97bf0" />
            </g>
            <g className="orbit-node n3">
              <circle cx="320" cy="60" r="5.5" fill="#43d8cf" />
            </g>
          </svg>
        </div>

        <div className="wrap bm-hero-content">
          <div className="bm-tag-row">
            <span className="bm-pill mono">
              <span className="dot" />
              v2.0.0 &nbsp;·&nbsp; Windows, macOS, Linux
            </span>
          </div>
          <h1 className="bm-hero-h">
            One player for <em>your files and your feeds</em>
          </h1>
          <p className="bm-hero-sub">
            BlackMusic plays the music already on your machine and the services you
            already pay for — Spotify, Audius — from the same window, without handing
            control of either one to the other.
          </p>
          <div className="bm-hero-actions">
            <Link to="/download" className="bm-btn bm-btn-primary">
              Download BlackMusic
            </Link>
            <a href="#theater" className="bm-btn bm-btn-ghost">
              See the theater view
            </a>
          </div>
          <div className="bm-eq" style={{ marginTop: 56 }} aria-hidden="true">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
        </div>
      </header>

      {/* FACT STRIP */}
      <div className="bm-strip">
        <div className="bm-strip-inner">
          <div className="bm-strip-item">
            <b>Local + Spotify + Audius</b>one playback engine, one queue
          </div>
          <div className="bm-strip-item">
            <b>Delta folder scanning</b>add a folder, only that folder gets read
          </div>
          <div className="bm-strip-item">
            <b>blackmusic:// redirects</b>native OAuth, no localhost ports
          </div>
          <div className="bm-strip-item">
            <b>Off by default</b>Last.fm and YouTube stay disconnected until you turn them on
          </div>
        </div>
      </div>

      {/* FEATURE: LIBRARY */}
      <section className="bm-section">
        <div className="wrap">
          <div className="bm-feature reveal">
            <div className="bm-feature-copy">
              <p className="bm-kicker">Your library</p>
              <h2 className="bm-section-h">Built for the music you already have</h2>
              <p className="bm-section-p">
                Point BlackMusic at the folders where your music lives and it stays in
                sync. Add a folder and only that folder gets scanned — nothing gets
                re-imported every time you open the app, and removing a watched folder
                only drops it from the app, never from disk.
              </p>
              <ul className="bm-feature-list">
                <li><b>All music, albums, artists, playlists</b> — the same tracks organized however you're looking for them.</li>
                <li><b>Favorites and playlists</b> you build yourself, stored locally.</li>
                <li><b>Rescan on demand</b> — a full refresh only runs when you ask for one.</li>
              </ul>
            </div>
            <div className="bm-feature-visual">
              <div className="bm-frame parallax-el" data-speed="0.06">
                <div className="bm-frame-bar"><span></span><span></span><span></span></div>
                <img
                  src="/assets/mock-home.webp"
                  alt="BlackMusic home dashboard showing recently played and most played tracks"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE: SEARCH / STREAMING */}
      <section className="bm-section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="bm-feature bm-reverse reveal">
            <div className="bm-feature-copy">
              <p className="bm-kicker">Search</p>
              <h2 className="bm-section-h">The search bar doubles as a command line</h2>
              <p className="bm-section-p">
                Typing a plain word searches your local library and folder names.
                Prefix it and the same bar routes the query somewhere else —{' '}
                <span className="mono bm-inline-code">@online-spotify:</span> for
                whatever streaming service is connected,{' '}
                <span className="mono bm-inline-code">@youtube:</span> for a web
                lookup, <span className="mono bm-inline-code">@genius:</span> for
                lyrics and metadata. One field, no separate search screen per source.
              </p>
              <ul className="bm-feature-list">
                <li><b>Connect from the sidebar logo</b> — pick which service is "active" and the Online page shows that service's catalog.</li>
                <li><b>Spotify needs Premium</b> to play in-app — that's Spotify's restriction on their own Web Playback SDK, not one BlackMusic adds.</li>
              </ul>
            </div>
            <div className="bm-feature-visual">
              <div className="bm-frame parallax-el" data-speed="0.09">
                <div className="bm-frame-bar"><span></span><span></span><span></span></div>
                <img
                  src="/assets/mock-search.webp"
                  alt="BlackMusic search results parsed as a command, showing routed query syntax"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLAYBACK BAR STATEMENT */}
      <section className="bm-bar-section bm-section-tight">
        <div className="wrap">
          <div className="bm-bar-grid">
            <div className="reveal">
              <p className="bm-kicker">Playback</p>
              <h2 className="bm-section-h">One now-playing bar, on every page</h2>
              <p className="bm-section-p">
                Whatever's playing follows you from Home to Library to Search, docked
                at the bottom of the window — with a floating shortcut back to the full
                player. Local files and Audius share one audio engine; a Spotify track
                routes transport calls to Spotify's SDK instead, but reads and looks
                identical from every page that watches playback state.
              </p>
            </div>
            <div className="reveal">
              <div className="bm-fake-track-stack">
                <div className="bm-fake-player active">
                  <div className="art" />
                  <div className="meta">
                    <div className="t1">Local file — playing</div>
                    <div className="t2">routed to the built-in audio engine</div>
                  </div>
                  <div className="playdot">▐▐</div>
                </div>
                <div className="bm-fake-player">
                  <div className="art" style={{ background: 'linear-gradient(135deg,#1a1a20,#2b2b33)' }} />
                  <div className="meta">
                    <div className="t1">Spotify track — queued next</div>
                    <div className="t2">will route to the Web Playback SDK</div>
                  </div>
                  <div className="playdot idle">▶</div>
                </div>
                <div className="bm-fake-player">
                  <div className="art" style={{ background: 'linear-gradient(135deg,#1a1a20,#2b2b33)' }} />
                  <div className="meta">
                    <div className="t1">Audius track — queued</div>
                    <div className="t2">same engine as local playback</div>
                  </div>
                  <div className="playdot idle">▶</div>
                </div>
              </div>
              <div className="bm-route-label mono">
                one queue array <span className="k">→</span> engine picked per track
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THEATER */}
      <section className="bm-theater" id="theater">
        <div className="wrap">
          <div className="bm-theater-head reveal">
            <p className="bm-kicker" style={{ justifyContent: 'center' }}>Playground</p>
            <h2 className="bm-section-h" style={{ maxWidth: 'none' }}>A proper theater view</h2>
            <p className="bm-section-p">
              Album art front and center, an optional lyrics overlay, a loop creator
              for practicing one section of a song on repeat, and a filmstrip of your
              library to jump between tracks without leaving the view.
            </p>
          </div>
          <div className="bm-theater-frame reveal">
            <div className="bm-frame parallax-el" data-speed="0.04">
              <div className="bm-frame-bar"><span></span><span></span><span></span></div>
              <img
                src="/assets/mock-playground.webp"
                alt="BlackMusic Playground theater view with filmstrip and transport controls"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ORGANIZE */}
      <section className="bm-section">
        <div className="wrap">
          <div className="bm-feature reveal">
            <div className="bm-feature-copy">
              <p className="bm-kicker">Organized</p>
              <h2 className="bm-section-h">Everything sorted the way you'd expect</h2>
              <p className="bm-section-p">
                Four plain views instead of one crowded one: what's on disk, how it's
                organized, what's watched, and what's on. Nothing here is a separate
                app bolted on — it's the same track cache, viewed differently.
              </p>
              <ul className="bm-feature-list">
                <li><b>Local</b> — every track in your watched folders, sortable and filterable.</li>
                <li><b>Library</b> — the same music by album, by artist, by playlist, or just your favorites.</li>
                <li><b>Folders</b> — add or remove what's watched; removing one only removes its tracks from the app.</li>
                <li><b>Settings</b> — theme, per-integration switches, account, and update checks.</li>
              </ul>
            </div>
            <div className="bm-feature-visual">
              <div className="bm-frame parallax-el" data-speed="0.06">
                <div className="bm-frame-bar"><span></span><span></span><span></span></div>
                <img
                  src="/assets/mock-library.webp"
                  alt="BlackMusic library grouped by artist"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRIVACY STATEMENT */}
      <section className="bm-statement">
        <div className="wrap reveal">
          <p>
            Nothing talks to a service <span className="dim">you haven't explicitly connected.</span>
          </p>
          <div className="sig mono">Last.fm and YouTube — off until you turn them on in Settings</div>
        </div>
      </section>

      {/* DOWNLOAD CTA */}
      <section className="bm-cta-band">
        <div className="wrap bm-cta-inner reveal">
          <div>
            <p className="bm-kicker">Getting it</p>
            <h2 className="bm-section-h" style={{ maxWidth: 'none', marginBottom: 10 }}>
              Available now on five platforms
            </h2>
            <p className="bm-section-p" style={{ marginBottom: 0 }}>
              GitHub Releases, SourceForge, Softonic, itch.io, and Softpedia — or build it from source yourself.
            </p>
          </div>
          <Link to="/download" className="bm-btn bm-btn-primary">
            Go to the download page
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
