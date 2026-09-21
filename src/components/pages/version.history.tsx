import '../../styles/version.history.css';

const CURRENT_FIXES = [
  {
    title: 'Preferences weren\u2019t persisting',
    body: 'preferencesStore.ts called store.set() without the follow-up store.save() the Tauri store plugin needs to actually write to disk. This is almost certainly why folders used to rescan on every launch, and probably contributed to general instability too.',
  },
  {
    title: 'Playback could get "stuck" switching sources',
    body: 'playTrack read the play queue from React state in the same tick it had just replaced that state, so the audio element sometimes loaded against the previous queue while the displayed metadata showed the new track — title and art looked right, but duration and seeking didn\u2019t work. Fixed by having every transport action pass its queue explicitly instead of reading it back off state.',
  },
  {
    title: 'Folder paths could silently fail to resolve on Windows',
    body: 'Paths were joined with manual "/" concatenation instead of @tauri-apps/api/path\u2019s join() — a watched folder on Windows is backslash-separated, and a mixed-separator path can fail without any visible error.',
  },
  {
    title: 'Last.fm enrichment caused jank on large libraries',
    body: 'Every page re-rendered once per album resolved, one at a time. Batched instead.',
  },
  {
    title: 'Folder scanning is now delta-based',
    body: 'Only new or removed folders trigger work, and results stream into the UI as they\u2019re found, rather than a full rescan on every launch that only appears once finished.',
  },
];

const VersionHistory = () => {
  return (
    <div className="vh-container">
      <header className="vh-hero">
        <p className="vh-kicker mono">Version history</p>
        <h1 className="vh-title">What changed, release by release</h1>
        <p className="vh-sub">The concrete fixes worth knowing about if something feels off.</p>
      </header>

      <div className="vh-timeline">
        <article className="vh-entry">
          <div className="vh-entry-head">
            <span className="vh-badge current">Current</span>
            <h2>v2.0.0</h2>
            <span className="vh-meta mono">Tauri 2 + React 18</span>
          </div>
          <p className="vh-entry-intro">
            A rebuild from an Electron + plain-HTML app onto Tauri 2 + React,
            across several passes. This is the release the rest of this site
            describes.
          </p>
          <ul className="vh-fix-list">
            {CURRENT_FIXES.map((f) => (
              <li key={f.title}>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className="vh-entry retired">
          <div className="vh-entry-head">
            <span className="vh-badge retired">Retired</span>
            <h2>1.x — Electron + plain HTML</h2>
          </div>
          <p className="vh-entry-intro">
            The original build: Electron shell, plain HTML/CSS/JS pages, no
            component framework. Superseded entirely by the 2.0.0 rewrite —
            no further updates.
          </p>
        </article>
      </div>
    </div>
  );
};

export default VersionHistory;
