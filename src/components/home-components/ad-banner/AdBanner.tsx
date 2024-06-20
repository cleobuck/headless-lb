import React, { useEffect, useState, useRef } from "react";
import styling from "./AdBanner.module.less";
import { AdBannerType } from "@/types/PostTypes";
import Image from "next/image";

type Props = { ads: AdBannerType[] };

export default function AdBanner({ ads }: Props) {
  const [activeBanner, setActiveBanner] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBanner((activeBanner) =>
        activeBanner === ads.length - 1 ? 0 : activeBanner + 1
      );
    }, 10000);
    return () => clearInterval(interval);
  }, [ads.length]);

  useEffect(() => {
    if (bannerRef.current) {
      const bannerWidth = bannerRef.current.clientWidth;
      bannerRef.current.scrollTo({
        left: bannerWidth * activeBanner,
        behavior: "smooth",
      });
    }
  }, [activeBanner]);

  return (
    <>
      <div className={styling.adBanner} ref={bannerRef}>
        {ads.map((ad, index) => (
          <figure key={index} className={styling.figure}>
            <Image src={ad.image} fill={true} alt={`Ad ${index + 1}`} />
          </figure>
        ))}
      </div>
      <div className={styling.dotsContainer}>
        {ads.map((_, index) => (
          <div
            key={index}
            className={`${styling.dot} ${
              index === activeBanner ? styling.active : ""
            }`}
            onClick={() => setActiveBanner(index)}
          />
        ))}
      </div>
    </>
  );
}
