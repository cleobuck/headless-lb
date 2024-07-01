import { useState, useEffect } from "react";
import styling from "./VideoPlaylist.module.less";

interface Video {
  id: number;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
}

// GET YOUTUBE API
// FETCH LATEST VIDEOS

//

// CREATE A RELOADER TO SYNC VIDEOS TO DATABASE
// CREATE CUSTOM endpoint to fetch those

const VideoPlaylist: React.FC = ({ videos }) => {
  console.log(videos);

  return (
    <div className={styling.container}>
      {/* <div className={styling.sidebar}>
        <ul id="video-list">
          {videos.map((video) => (
            <li onClick={() => setActiveVideo(video.url)}> {video.title} </li>
          ))}
        </ul>
      </div>
      <div className={styling.mainContent}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/OhabdDhiiPs?si=rVSmW-WxfPjbFoVO"
          title="YouTube video player"
        ></iframe>
      </div> */}
    </div>
  );
};

export default VideoPlaylist;
