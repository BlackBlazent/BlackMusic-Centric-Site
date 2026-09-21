import { useState } from 'react';
import '../../styles/documentation.css';

type Tab = 'users' | 'developers';

const userSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'folders', label: 'Folders' },
  { id: 'local', label: 'Local' },
  { id: 'library', label: 'Library' },
  { id: 'online', label: 'Online' },
  { id: 'playground', label: 'Playground' },
  { id: 'settings', label: 'Settings' },
  { id: 'worth-knowing', label: 'Worth knowing' },
];

const devSections = [
  { id: 'stack', label: 'Stack' },
  { id: 'layout', label: 'Project layout' },
  { id: 'state', label: 'State' },
  { id: 'playback', label: 'PlaybackContext' },
  { id: 'scanning', label: 'Folder scanning' },
  { id: 'setup', label: 'Setup' },
  { id: 'env', label: 'Environment variables' },
  { id: 'redirects', label: 'OAuth redirects' },
  { id: 'building', label: 'Building for desktop' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'updates', label: 'Auto-updates' },
];

const Documentation = () => {
  const [tab, setTab] = useState<Tab>('users');
  const sections = tab === 'users' ? userSections : devSections;

  return (
    <div className="doc-container">
      <header className="doc-hero">
        <p className="doc-kicker mono">Documentation</p>
        <h1 className="doc-title">How BlackMusic works, and how it's built</h1>
        <p className="doc-sub">
          Two tracks: what the app does if you're using it, and how it's put
          together if you're building it from source.
        </p>
        <div className="doc-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={tab === 'users'}
            className={`doc-tab ${tab === 'users' ? 'active' : ''}`}
            onClick={() => setTab('users')}
          >
            For users
          </button>
          <button
            role="tab"
            aria-selected={tab === 'developers'}
            className={`doc-tab ${tab === 'developers' ? 'active' : ''}`}
            onClick={() => setTab('developers')}
          >
            For developers
          </button>
        </div>
      </header>

      <div className="doc-body">
        <nav className="doc-sidebar">
          <ul>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="doc-content">
          {tab === 'users' ? <UserDocs /> : <DevDocs />}
        </div>
      </div>
    </div>
  );
};

const UserDocs = () => (
  <>
    <section id="overview">
      <h2>Overview</h2>
      <p>
        BlackMusic is a desktop music player for the music you already have,
        plus the services you already use — in one place, without giving up
        control of either. It doesn't replace your files or your streaming
        accounts; it sits in front of both.
      </p>
    </section>

    <section id="folders">
      <h2>Folders</h2>
      <p>
        Add the folders on your machine where your music lives. BlackMusic
        watches them — removing a folder here removes its tracks from the
        app, not from your disk.
      </p>
    </section>

    <section id="local">
      <h2>Local</h2>
      <p>
        Every track found in your watched folders, sortable and filterable,
        with pin, sort, and select tools in the corner.
      </p>
    </section>

    <section id="library">
      <h2>Library</h2>
      <p>
        The same music organized by album, by artist, as playlists you
        build, or just your favorites.
      </p>
    </section>

    <section id="online">
      <h2>Online</h2>
      <p>
        Pick a connected service from the logo in the top-left of the
        sidebar; this page shows that service's content. Spotify needs a
        Premium account to actually play here — that's Spotify's own
        restriction on their Web Playback SDK, not something BlackMusic
        adds.
      </p>
    </section>

    <section id="playground">
      <h2>Playground</h2>
      <p>
        The full-screen "now playing" view. Toggle the lyrics overlay, set
        up a loop section to repeat part of a song, drop in a link to embed
        something, adjust playback speed.
      </p>
    </section>

    <section id="settings">
      <h2>Settings</h2>
      <p>Theme, per-integration on/off switches, account, and update checks.</p>
    </section>

    <section id="worth-knowing">
      <h2>A couple of things worth knowing</h2>
      <ul>
        <li>
          <b>Spotify playback requires Spotify Premium.</b> Free accounts can
          authorize the app but can't use the Web Playback SDK that makes
          in-app playback possible — this is Spotify's restriction, not
          BlackMusic's.
        </li>
        <li>
          <b>Video Mode and downloading from YouTube aren't implemented.</b>{' '}
          Downloading video off YouTube outside their official API sits in a
          legal gray area around their Terms of Service, so rather than
          quietly build it in, it's left as an open question — see the{' '}
          <a href="/features">Features page</a> for what else isn't built
          yet.
        </li>
        <li>
          Nothing about how you use BlackMusic is sent anywhere except to
          the services you explicitly connect, and only once you've
          connected them.
        </li>
      </ul>
    </section>
  </>
);

const DevDocs = () => (
  <>
    <section id="stack">
      <h2>Stack</h2>
      <ul>
        <li>
          <b>Tauri 2</b> (Rust shell) instead of Electron — smaller binaries,
          and Tauri 2 targets Android/iOS natively, so no separate mobile
          rewrite is needed later.
        </li>
        <li>
          <b>React 18 + React Router 6</b>, hash-based routing
          (<code>createHashRouter</code>) since the production build is
          loaded from disk inside the webview, not served by anything that
          resolves arbitrary paths.
        </li>
        <li><b>TypeScript</b> everywhere except a couple of config files.</li>
        <li>
          <b>Plain CSS</b> with a small design-token system
          (<code>src/styles/tokens.css</code>) — no CSS framework.
        </li>
        <li><b>pnpm</b> as the package manager.</li>
      </ul>
    </section>

    <section id="layout">
      <h2>Project layout</h2>
      <pre className="doc-code mono">{`src/
  app/
    layout/        Sidebar, TopBar, AppShell, GlobalPlaybackBar,
                    FloatingPlaygroundToggle, Footer, ServicesMenu,
                    NotificationsPopover, AccountModal, icon set
    context/        One React context per concern — see "State" below
    providers/      ThemeProvider (dark/light)
    components/     Shared UI (Tooltip, Skeleton, Switch, PagePlaceholder)
    router.tsx      Route table
  pages/
    home/ playground/ local/ online/ library/ folder/ search/ settings/
  lib/
    services/       Per-integration clients (spotifyClient,
                     spotifyPlayerBridge, audiusClient, lastfmClient,
                     serviceAuth, serviceDirectory, openInSystemBrowser)
    library/        scanFolder.ts — the folder walker + tag reader
    updater.ts, preferencesStore.ts, platform.ts,
    openInFileExplorer.ts, useClickOutside.ts
  styles/           tokens.css (design tokens), reset.css
  types/            Ambient TS declarations
src-tauri/          Rust shell: Cargo.toml, main.rs, tauri.conf.json,
                     capabilities/`}</pre>
    </section>

    <section id="state">
      <h2>State</h2>
      <p>Each concern is its own context, composed in App.tsx:</p>
      <table className="doc-table">
        <thead>
          <tr><th>Context</th><th>Owns</th></tr>
        </thead>
        <tbody>
          <tr><td>ThemeProvider</td><td>dark/light</td></tr>
          <tr><td>PaneContext</td><td>sidebar collapse/width</td></tr>
          <tr><td>AppSettingsContext</td><td>per-integration on/off toggles (Settings → Integrations)</td></tr>
          <tr><td>FoldersContext</td><td>the watched-folder list only — no scanning logic</td></tr>
          <tr><td>LibraryContext</td><td>the scanned track cache, delta scanning, Last.fm enrichment</td></tr>
          <tr><td>FavoritesContext</td><td>favorited track IDs</td></tr>
          <tr><td>PlaylistsContext</td><td>user-created playlists</td></tr>
          <tr><td>PlaybackHistoryContext</td><td>the play-event log Home's stats are computed from</td></tr>
          <tr><td>PlaybackContext</td><td>the actual transport — see below</td></tr>
          <tr><td>ServicesContext</td><td>which service is "active", connection state</td></tr>
          <tr><td>NotificationsContext</td><td>the notification list</td></tr>
          <tr><td>AuthContext</td><td>Supabase session, if configured</td></tr>
        </tbody>
      </table>
      <p>
        All of it persists through <code>src/lib/preferencesStore.ts</code>,
        which wraps the Tauri store plugin (falling back to localStorage
        when running in a plain browser via <code>pnpm dev</code>). Every
        write calls <code>store.save()</code> explicitly —{' '}
        <code>store.set()</code> alone only updates the in-memory store.
      </p>
    </section>

    <section id="playback">
      <h2>PlaybackContext — two engines, one set of state</h2>
      <p>
        Local files and Audius both play through a single{' '}
        <code>&lt;audio&gt;</code> element. Spotify tracks can't — their
        streams are DRM-protected and only play through Spotify's own Web
        Playback SDK (<code>src/lib/services/spotifyPlayerBridge.ts</code>).
        Rather than build a separate "Spotify player" UI, PlaybackContext
        routes every transport call (playTrack, togglePlay, seek, volume)
        to whichever engine the current track belongs to, and the SDK's{' '}
        <code>player_state_changed</code> event feeds the exact same
        position/duration/isPlaying state a local track would.
      </p>
      <p>
        What this does not do: give Spotify its own multi-track queue.
        next/previous still walk our own queue array — skipping through a
        mixed local/Spotify queue works, but Spotify's own{' '}
        <code>nextTrack()</code>/<code>previousTrack()</code> SDK methods
        are unused.
      </p>
    </section>

    <section id="scanning">
      <h2>Folder scanning</h2>
      <p>
        LibraryContext caches scanned tracks per folder. On launch, the
        cache loads and nothing gets rescanned. Adding a folder scans only
        that folder; removing one drops its cached tracks. The "Rescan"
        button does a full refresh of everything, on purpose.{' '}
        <code>scanFolder.ts</code> walks the directory tree first (cheap —
        just <code>readDir</code> calls) and then reads tag metadata for up
        to 8 files concurrently, streaming results into the UI in small
        batches as they're found.
      </p>
      <p>
        Paths are joined with <code>@tauri-apps/api/path</code>'s{' '}
        <code>join()</code>, not manual string concatenation — a watched
        folder on Windows is backslash-separated, and concatenating with a
        literal <code>/</code> produces a mixed-separator path that can
        silently fail to resolve.
      </p>
    </section>

    <section id="setup">
      <h2>Setup</h2>
      <p>
        Requires Node 18+, pnpm, and the Rust toolchain, plus Tauri's
        platform prerequisites for your OS.
      </p>
      <pre className="doc-code mono">{`pnpm install
cp .env.example .env   # fill in what you have; see the comments in the file
pnpm tauri:dev          # full app in the Tauri webview
pnpm dev                 # UI only, in a regular browser tab —
                          # no native APIs, useful for fast CSS/layout iteration`}</pre>
    </section>

    <section id="env">
      <h2>Environment variables</h2>
      <p>
        Every <code>VITE_</code>-prefixed variable is bundled straight into
        the app's JS and is recoverable by anyone who unzips the installer.
        That's fine for public client IDs and <code>api_key</code>-style
        values that services themselves treat as safe for client-side use
        (Spotify's client ID with PKCE, Audius' app API key, Last.fm's{' '}
        <code>api_key</code>). It is never fine for a true OAuth client
        secret — those need a server-side token exchange, which isn't
        built here. See <code>.env.example</code> for the full list and
        which category each one falls into.
      </p>
    </section>

    <section id="redirects">
      <h2>OAuth redirects</h2>
      <p>
        Every OAuth redirect uses the <code>blackmusic://</code> custom
        scheme (e.g. <code>blackmusic://spotify/callback</code>), in dev
        and in production alike — never <code>http://localhost</code>. The
        deep link is caught by the OS itself and handed to whichever
        running instance of the app registered the scheme. Register the
        exact URI in each provider's dashboard.
      </p>
    </section>

    <section id="building">
      <h2>Building for desktop</h2>
      <p>
        <code>pnpm tauri:build</code> produces a platform-native installer
        for whatever OS you run it on — Tauri doesn't cross-compile, so
        build on (or in CI for) each target platform separately.
      </p>
      <table className="doc-table">
        <thead><tr><th>Platform</th><th>Prerequisites</th><th>Output</th></tr></thead>
        <tbody>
          <tr>
            <td>Windows</td>
            <td>Rust (rustup) + "Desktop development with C++" (VS Build Tools)</td>
            <td>.msi and/or .exe (NSIS)</td>
          </tr>
          <tr>
            <td>macOS</td>
            <td>Xcode Command Line Tools + Rust</td>
            <td>.dmg and .app bundle — needs an Apple Developer ID to distribute outside the App Store</td>
          </tr>
          <tr>
            <td>Linux</td>
            <td>WebKitGTK, build-essential/gcc + Rust</td>
            <td>.deb, .rpm, and/or .AppImage</td>
          </tr>
        </tbody>
      </table>
      <p>
        Building from Windows for Mac/Linux isn't possible directly — the
        standard workaround is CI: a GitHub Actions workflow with a job per
        OS (<code>windows-latest</code>, <code>macos-latest</code>,{' '}
        <code>ubuntu-latest</code>), each running{' '}
        <code>pnpm tauri:build</code> on its own runner.
      </p>
    </section>

    <section id="mobile">
      <h2>Mobile</h2>
      <p>
        Tauri 2 supports Android and iOS from the same codebase, but
        neither has been tested against this codebase yet:
      </p>
      <pre className="doc-code mono">{`pnpm tauri android init   # first time only
pnpm tauri android dev

pnpm tauri ios init        # first time only, macOS + Xcode required
pnpm tauri ios dev`}</pre>
      <p>
        Expect to need to adjust things that assume a desktop window (the
        fixed size in <code>tauri.conf.json</code>, file-picker-based
        folder scanning) before this "just works."
      </p>
    </section>

    <section id="updates">
      <h2>Auto-updates</h2>
      <p>
        The Tauri updater plugin is wired in, but needs a real signing
        keypair and a real repo before it does anything:
      </p>
      <pre className="doc-code mono">{`pnpm tauri signer generate -w ~/.tauri/blackmusic.key`}</pre>
      <p>
        Put the printed public key in <code>tauri.conf.json</code>'s{' '}
        <code>updater.pubkey</code>, point <code>updater.endpoints</code> at
        your GitHub repo, and use{' '}
        <a href="https://github.com/tauri-apps/tauri-action" target="_blank" rel="noreferrer">
          tauri-apps/tauri-action
        </a>{' '}
        in a release workflow to build, sign, and publish installers plus a{' '}
        <code>latest.json</code> manifest on tag push. Store the private key
        and its password as CI secrets, never in the workflow file.
      </p>
      <p>
        For what actually shipped in the current release, see{' '}
        <a href="/version-history">Version History</a>.
      </p>
    </section>
  </>
);

export default Documentation;
