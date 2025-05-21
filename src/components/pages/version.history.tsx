import React from 'react';

const VersionHistory: React.FC = () => {
  // Data for the version history rows
  const versions = [
    {
      id: 1,
      iconPath: "https://iili.io/3rXF8LF.png",
      version: "1.1.01.001.0001",
      features: "READ HERE",
      date: "JAN 20, 2025",
      time: "4:01 AM"
    }
  ];

  return (
    <div className="ver-history-page">
      {/* Header row */}
      <div className="ver-table-container">
        <div className="table-wrapper">
          <div className="table-head">
            <div className="head-row">
              <div className="head-cell icon-col">
                <span className="head-text">ICON</span>
              </div>
              <div className="head-cell version-col">
                <span className="head-text">VERSION</span>
              </div>
              <div className="head-cell features-col">
                <span className="head-text">RELEASE FEATURES</span>
              </div>
              <div className="head-cell date-col">
                <span className="head-text">RELEASED DATE</span>
              </div>
            </div>
          </div>
          
          {/* Data rows */}
          <div className="table-body">
            {versions.map((version) => (
              <div key={version.id} className="body-row">
                <div className="body-cell icon-app-img">{/*icon-col*/}
                  <div className="icon-wrapper">
                    <img src={version.iconPath} alt="Version Icon" className="version-icon" />
                  </div>
                </div>
                <div className="body-cell app-version-img"> {/*version-col*/}
                  <div className="version-text">{version.version}</div>
                </div>
                <div className="body-cell background-t"> {/*features-col*/}
                  <div className="features-text">{version.features}</div>
                </div>
                <div className="body-cell date-background-t"> {/*date-col*/}
                  <div className="date-wrapper">
                    <div className="release-date">{version.date}</div>
                    <div className="release-time">{version.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VersionHistory;