import { useState, useEffect } from "react";

interface Video {
  id: number;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
}

const VideoPlaylist: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    // Fetch videos data from API
    const fetchVideos = async () => {
      try {
        const response = await fetch("YOUR_API_ENDPOINT");
        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="elementor-widget-container">
      <div className="e-tabs">
        <div className="e-tabs-main-area">
          <div className="e-tabs-wrapper">
            <div className="e-tabs-header">
              <h2 className="e-tabs-title">Playlist</h2>
              <div className="e-tabs-header-right-side">
                <span className="e-tabs-videos-count">
                  {videos.length} Videos
                </span>
                <i
                  aria-hidden="true"
                  className="e-tabs-toggle-videos-display-button rotate-down eicon-caret-down"
                ></i>
              </div>
            </div>
            <div className="e-tabs-items-wrapper">
              <div className="e-tabs-items" role="tablist">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className="e-tab-title e-tab-desktop-title"
                  >
                    <div className="e-tab-thumbnail">
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        loading="lazy"
                      />
                      <span className="icon-play">
                        <i
                          aria-hidden="true"
                          className="fas fa-play-circle"
                        ></i>
                      </span>
                      <span className="icon-watched">
                        <i
                          aria-hidden="true"
                          className="fas fa-check-circle"
                        ></i>
                      </span>
                    </div>
                    <h4 className="e-tab-title-text">
                      <a
                        href={video.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {video.title}
                      </a>
                    </h4>
                  </div>
                ))}
              </div>
              <div className="shadow shadow-top" aria-hidden="true"></div>
              <div className="shadow shadow-bottom" aria-hidden="true"></div>
            </div>
          </div>
          <div
            className="e-tabs-content-wrapper"
            role="tablist"
            aria-orientation="vertical"
          >
            {videos.map((video) => (
              <div key={video.id} className="e-tab-content elementor-clearfix">
                <iframe
                  src={video.videoUrl}
                  frameBorder="0"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title={video.title}
                  width="773"
                  height="360"
                ></iframe>
              </div>
            ))}
          </div>
        </div>
        <div className="e-tabs-inner-tabs"></div>
      </div>
    </div>
  );
};

export default VideoPlaylist;
