import { useState } from "react";
import { Search } from "lucide-react";

export default function BlackMusicExtensionStore() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Example music player extensions
  const extensions = [
    {
      id: 1,
      name: "Equalizer Pro",
      icon: "🎛️",
      publisher: "SoundTech",
      version: "2.4.7",
      downloads: "3.2M",
      rating: 5,
      category: "Audio Processing"
    },
    {
      id: 2,
      name: "Lyrics Finder",
      icon: "🎵",
      publisher: "MusicMetadata",
      version: "1.8.5",
      downloads: "2.7M",
      rating: 4,
      category: "Content Enhancement"
    },
    {
      id: 3,
      name: "Audio Visualizer",
      icon: "📊",
      publisher: "WaveGraphics",
      version: "3.1.2",
      downloads: "1.9M",
      rating: 5,
      category: "Visual Effects"
    },
    {
      id: 4,
      name: "Format Converter",
      icon: "🔄",
      publisher: "AudioCodec",
      version: "2.0.3",
      downloads: "1.5M",
      rating: 4,
      category: "Utilities"
    },
    {
      id: 5,
      name: "Music Library Organizer",
      icon: "📚",
      publisher: "DataSort",
      version: "4.2.1",
      downloads: "1.1M",
      rating: 5,
      category: "Organization"
    },
    {
      id: 6,
      name: "Streaming Integration",
      icon: "☁️",
      publisher: "CloudAudio",
      version: "1.7.9",
      downloads: "895K",
      rating: 4,
      category: "Connectivity"
    }
  ];

  return (
    <div className="container">
      <div className="overlay">
        <div className="overlay-wrapper">
      {/* Header */}
      <header className="header">
        <div className="logo-container">
          <div className="logo-extension">
            <img style={{display: "none"}} className="extension-logo" src=""/>
          </div>
          <div className="app-name">BlackMusic Store</div>
          <div className="version-hash">RavenSYNTHA</div>
        </div>
        <div className="nav-extension">
          <a href="#" className="nav-link">Documentation</a>
          <a href="#" className="nav-link">Supporting Tools</a>
          <a href="#" className="nav-link">Sponsor</a>
          <a href="#" className="nav-link">About</a>
          <button className="publish-button">PUBLISH</button>
          <div className="user-icon">
            <div className="user-icon-wrapper">
              <img className="user-icon-img" src="./src/assets/user-icon.png" alt="" />
            </div>
          </div>
        </div>
      </header>
      
      {/* Announcement Banner */}
      <div className="banner">
        <div className="banner-content">
          <div className="info-icon">i</div>
          <div>We’re working on extensions system to make BlackMusic even more personal –  <a href="#" className="banner-link">coming soon!</a>.</div>
        </div>
        <button className="got-it-button">GOT IT</button>
      </div>
      
      {/* Main Content */}
      <main className="main-extension">
        <h1 className="title">Extensions for BlackMusic Player</h1>
        
        {/* Search Bar */}
        <div className="search-container">
          <div className="search-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by Name, Tag, or Description" 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-button">
              <Search size={20} />
            </button>
          </div>
          <select className="category-select">
            <option>All Categories</option>
            <option>Audio Processing</option>
            <option>Visual Effects</option>
            <option>Content Enhancement</option>
            <option>Utilities</option>
            <option>Organization</option>
            <option>Connectivity</option>
          </select>
        </div>
        
        {/* Results Count and Sort */}
        <div className="results-header">
          <div className="results-count">Unavailable</div>
          <div className="sort-container">
            <span className="sort-label">Sort by</span>
            <select className="sort-select">
              <option>Relevance</option>
              <option>Downloads</option>
              <option>Rating</option>
              <option>Recently Updated</option>
            </select>
            <span className="sort-arrow">↓</span>
          </div>
        </div>
        
        {/* Extensions Grid */}
        <div className="extensions-grid">
          {extensions.map(ext => (
            <div key={ext.id} className="extension-card">
              <div className="extension-content">
                <div className="extension-icon">{ext.icon}</div>
                <h3 className="extension-name">{ext.name}</h3>
                <div className="extension-meta">
                  <span>{ext.publisher}</span>
                  <span>{ext.version}</span>
                </div>
                <div className="rating-container">
                  {Array(5).fill(0).map((_, i) => (
                    <span 
                      key={i} 
                      className={`star ${i < ext.rating ? "filled" : ""}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div className="downloads-container">
                  <span className="download-icon">↓</span>
                  <span>{ext.downloads}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      </div>
      </div>
    </div>
  );
}