import { useEffect, useRef } from 'react';
import '../../styles/download.css';

/**
 * Real distribution links go here. Each is a project/listing page on that
 * store, not a direct per-OS binary — fill these in with your actual
 * project URLs on each platform.
 */
const STORE_LINKS = {
  github: 'https://github.com/REPLACE_ME/blackmusic/releases',
  sourceforge: 'https://sourceforge.net/projects/REPLACE_ME/',
  softonic: 'https://REPLACE_ME.en.softonic.com/',
  itch: 'https://REPLACE_ME.itch.io/blackmusic',
  softpedia: 'https://www.softpedia.com/get/REPLACE_ME/',
};

type OS = 'windows' | 'macos' | 'linux';

function detectOS(): OS | null {
  const platform = window.navigator.platform || '';
  const ua = window.navigator.userAgent || '';
  if (/Win/i.test(platform)) return 'windows';
  if (/Mac/i.test(platform) && !/iPhone|iPad|iPod/i.test(ua)) return 'macos';
  if (/Linux/i.test(platform)) return 'linux';
  return null;
}

export const Download = () => {
  const detected = useRef<OS | null>(null);
  useEffect(() => {
    detected.current = detectOS();
  }, []);

  return (
    <div className="dl-container">
      <video className="dl-bg-video" src="/assets/download.bg.mp4" autoPlay loop muted playsInline />
      <div className="dl-fade" />

      <div className="dl-inner">
        <p className="dl-kicker mono">v2.0.0 &nbsp;·&nbsp; Windows, macOS, Linux</p>
        <h1 className="dl-title">Download BlackMusic</h1>
        <p className="dl-subtitle">
          BlackMusic is listed on the stores below — pick whichever you trust,
          they all point to the same release.
        </p>

        <div className="dl-stores">
          <a className="dl-store-card" href={STORE_LINKS.github} target="_blank" rel="noreferrer">
            <span className="dl-store-name">GitHub Releases</span>
            <span className="dl-store-note">source + signed installers</span>
          </a>
          <a className="dl-store-card" href={STORE_LINKS.sourceforge} target="_blank" rel="noreferrer">
            <span className="dl-store-name">SourceForge</span>
            <span className="dl-store-note">project page</span>
          </a>
          <a className="dl-store-card" href={STORE_LINKS.softonic} target="_blank" rel="noreferrer">
            <span className="dl-store-name">Softonic</span>
            <span className="dl-store-note">listing</span>
          </a>
          <a className="dl-store-card" href={STORE_LINKS.itch} target="_blank" rel="noreferrer">
            <span className="dl-store-name">itch.io</span>
            <span className="dl-store-note">listing</span>
          </a>
          <a className="dl-store-card" href={STORE_LINKS.softpedia} target="_blank" rel="noreferrer">
            <span className="dl-store-name">Softpedia</span>
            <span className="dl-store-note">listing</span>
          </a>
        </div>

        <div className="dl-platforms">
          <div className={`dl-platform ${detected.current === 'windows' ? 'is-detected' : ''}`}>
            <img src="/assets/windows.png" alt="" />
            <span>Windows — .msi / .exe</span>
          </div>
          <div className={`dl-platform ${detected.current === 'macos' ? 'is-detected' : ''}`}>
            <img src="/assets/mac.png" alt="" />
            <span>macOS — .dmg</span>
          </div>
          <div className={`dl-platform ${detected.current === 'linux' ? 'is-detected' : ''}`}>
            <img src="/assets/linux.png" alt="" />
            <span>Linux — .deb / .rpm / .AppImage</span>
          </div>
        </div>

        <p className="dl-note">
          Building from source still works if you'd rather compile it yourself —
          see DEVELOPMENT.md in the repository for the Windows, macOS, and Linux
          build steps.
        </p>
      </div>
    </div>
  );
};
