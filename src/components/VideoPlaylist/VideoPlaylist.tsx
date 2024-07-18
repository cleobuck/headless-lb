import { useState, useEffect, useRef } from "react";
import styling from "./VideoPlaylist.module.less";
import Image from "next/image";
import { VideoType } from "./Videotypes";

const VideoPlaylist = ({ videos }: { videos: VideoType[] }) => {
  const [scrollPosition, setScrollPosition] = useState("top");

  const [activeVideo, setActiveVideo] = useState(0);

  return (
    <div className={styling.container}>
      <div className={styling.videoList}>
        <h3>
          Playlist <span> {videos.length} videos </span>
        </h3>
        <div
          className={styling.scrollVideoList}
          onScroll={(e) => {
            const scrollTop = e.currentTarget.scrollTop;
            const scrollHeight = e.currentTarget.scrollHeight;
            const clientHeight = e.currentTarget.clientHeight;

            if (scrollTop === 0) {
              setScrollPosition("top");
            } else if (scrollTop + clientHeight >= scrollHeight) {
              setScrollPosition("bottom");
            } else {
              setScrollPosition("middle");
            }
          }}
        >
          <ul>
            {videos.map((video, index) => (
              <li key={index} onClick={() => setActiveVideo(index)}>
                <figure>
                  <Image
                    src={video.thumbnail_url}
                    alt={video.title}
                    fill={true}
                  />
                </figure>
                <h4> {video.title} </h4>
              </li>
            ))}
          </ul>
        </div>
        {scrollPosition !== "top" && (
          <div className={styling.topShadow} aria-hidden={true}></div>
        )}

        {scrollPosition !== "bottom" && (
          <div className={styling.bottomShadow} aria-hidden={true}></div>
        )}
      </div>

      <iframe
        height="430"
        src={`https://www.youtube.com/embed/${videos[activeVideo].video_id}`}
      ></iframe>
    </div>
  );
};

export default VideoPlaylist;
