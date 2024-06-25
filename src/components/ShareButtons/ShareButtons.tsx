import React from "react";
import Twitter from "@/assets/images/icons/brands/twitter.svg";
import Facebook from "@/assets/images/icons/brands/facebook-f.svg";
import Pinterest from "@/assets/images/icons/brands/pinterest.svg";

import Whatsapp from "@/assets/images/icons/brands/whatsapp.svg";
import styling from "./ShareButtons.module.less";
const ShareButtons = ({
  url,
  title,
  image,
}: {
  url: string;
  title: string;
  image: string;
}) => {
  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(title);
  const shareImage = encodeURIComponent(image);

  return (
    <div className={styling.shareButtons}>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&t=${shareTitle}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Facebook />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Twitter />
      </a>

      <a
        href={`https://pinterest.com/pin/create/button/?url=${shareUrl}&media=${shareImage}&description=${shareTitle}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Pinterest />
      </a>

      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title}: ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Whatsapp />
      </a>
    </div>
  );
};

export default ShareButtons;
