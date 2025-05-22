export const Download = () => {
    return <div className="download-container">
      <div className="download-content">
        <div className="app-download-wrapper">
          <div className="download-sec-background">
            <div className="download-sec-wrapper">
              <video src="/assets/download.bg.mp4" autoPlay loop muted />
            </div>
          </div>
          <div className="download-sec-content">
            <div className="download-sec-wrapper-context">
              <span className="download-sec-title">Download<i>BlackMusic</i></span>
              <span className="download-sec-subtitle">Download the latest version of BlackMusic</span>
            </div>
          </div>
          <div className="download-all-platforms-container">
            <div className="download-all-platforms-wrapper">
              <div className="download-all-platforms-container-wrapper">
                <div id="macOSCard" className="this-platform-card">
                  <div className="macOSCardWrapper">
                    <img className="macOsBanner-Tile" src="/assets/mac.png"/>
                  </div>
                  <div id="macOsLatestIndicatorWrapper" className="version-latest-banner">
                    <img id="macOsLatestIndicator" className="latest-indicator" src="/assets/latest.gif"/>
                  </div>
                </div>
                <div id="windowsCard" className="this-platform-card">
                  <div className="windowsCardWrapper">
                    <img className="windowsBanner-Tile" src="/assets/windows.png"/>
                  </div>
                  <div id="windowsLatestIndicatorWrapper" className="version-latest-banner">
                    <img id="" className="latest-indicator" src="/assets/latest.gif"/>
                  </div>
                </div>
                <div id="linuxCard" className="this-platform-card">
                  <div className="linuxCardWrapper">
                    <img className="linuxBanner-Tile" src="/assets/linux.png"/>
                  </div>
                  <div id="linuxLatestIndicatorWrapper" className="version-latest-banner">
                    <img id="linuxLatestIndicator" className="latest-indicator" src="/assets/latest.gif"/>
                  </div>
                </div>
              </div>
              <div className="other-platforms-container">
                <div className="other-platforms-wrapper">
                  <div className="other-platforms-container-wrapper">
                    <div id="androidCard" className="other-platform-card this-platform-card">
                      <div className="androidCardWrapper">
                        <img className="androidBanner-Tile" src="/assets/android.png"/>
                      </div>
                      <div id="androidLatestIndicatorWrapper" className="version-latest-banner-other">
                    <img id="androidLatestIndicator" className="latest-indicator" src="/assets/latest.gif"/>
                  </div>
                    </div>
                    <div id="iosCard" className="other-platform-card this-platform-card">
                      <div className="iosCardWrapper">
                        <img className="iosBanner-Tile" src="/assets/ios.png"/>
                      </div>
                      <div id="iosLatestIndicatorWrapper" className="version-latest-banner-other">
                    <img id="iosLatestIndicator" className="latest-indicator" src="/assets/latest.gif"/>
                  </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }