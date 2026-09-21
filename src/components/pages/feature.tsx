import '../../styles/features.css';

const AVAILABLE = [
  {
    title: 'Local library sync',
    body: "Point BlackMusic at your folders and it stays in sync. Add a folder and only that folder gets scanned — nothing gets re-imported on every launch.",
  },
  {
    title: 'Spotify + Audius, alongside your files',
    body: 'Connect from the sidebar logo and switch between "my files" and "my Spotify" without leaving the app. Spotify playback requires Premium — that\u2019s Spotify\u2019s SDK restriction, not ours.',
  },
  {
    title: 'Command-line search',
    body: 'The search bar parses prefixes — @online-spotify:, @youtube:, @genius: — and routes the rest of the query to the right place.',
  },
  {
    title: 'One playback bar, everywhere',
    body: 'Whatever\u2019s playing follows you across pages, with a floating shortcut back to the full player. Local and Audius share one audio engine; Spotify routes to its own SDK behind the same interface.',
  },
  {
    title: 'Playground — a theater view',
    body: 'Album art front and center, an optional lyrics overlay, a loop creator for repeating a section, and a filmstrip to jump between tracks.',
  },
  {
    title: 'Local, Library, Folders, Settings',
    body: 'Four plain views over the same track cache: what\u2019s on disk, how it\u2019s organized, what\u2019s watched, and what\u2019s on.',
  },
  {
    title: 'Off by default',
    body: 'Last.fm (for missing album art) and YouTube lookups stay disconnected until you turn them on in Settings.',
  },
];

const NOT_YET = [
  {
    title: 'YouTube Video Mode + downloading',
    body: 'Downloading video off YouTube outside their official API sits in a Terms-of-Service gray area. Rather than quietly ship it, it\u2019s left as a disabled toggle and a stubbed TODO until that\u2019s resolved.',
  },
  {
    title: 'Genius, and most other connections',
    body: 'Genius lyrics, plus GitHub, Google, Facebook, Tidal, Jamendo, TikTok, VK, MusicBrainz, and Amazon all need a server-side piece to hold a client secret and do the token exchange — none of that exists yet. Their redirect URIs are already wired consistently (blackmusic://<service>/callback), so adding them later won\u2019t require changing what\u2019s already there.',
  },
  {
    title: "Spotify's own multi-track queue",
    body: 'BlackMusic drives Spotify tracks one URI at a time through its own queue instead of handing Spotify its Connect queue API — skipping through a mixed queue works, but Spotify\u2019s native next/previous methods are unused.',
  },
  {
    title: 'Most Folder view styles',
    body: 'Of the original ten, Cover Art View and List View are real. The rest are listed in the menu for continuity, but currently fall back to List View.',
  },
  {
    title: 'Android and iOS builds',
    body: 'Tauri 2 supports building for mobile from the same codebase, but it hasn\u2019t been tested here yet — things that assume a desktop window (fixed sizing, file-picker-based folder scanning) will need a pass first.',
  },
];

const Features = () => {
  return (
    <div className="feat-container">
      <header className="feat-hero">
        <p className="feat-kicker mono">Features</p>
        <h1 className="feat-title">What's built, and what isn't yet</h1>
        <p className="feat-sub">
          An honest split — everything below "Available now" ships in v2.0.0.
          Everything under "Not yet available" is either a deliberate call
          to hold off, or work that hasn't happened.
        </p>
      </header>

      <section className="feat-section">
        <div className="feat-section-head">
          <span className="feat-dot available" />
          <h2>Available now</h2>
        </div>
        <div className="feat-grid">
          {AVAILABLE.map((f) => (
            <div className="feat-card" key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="feat-section">
        <div className="feat-section-head">
          <span className="feat-dot pending" />
          <h2>Not yet available</h2>
        </div>
        <div className="feat-grid">
          {NOT_YET.map((f) => (
            <div className="feat-card pending" key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
        <p className="feat-footnote">
          The reasoning behind each of these lives in the{' '}
          <a href="/documentation">developer documentation</a>.
        </p>
      </section>
    </div>
  );
};

export default Features;
