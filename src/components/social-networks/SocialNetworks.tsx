import React from "react";
import styling from "./SocialNetworks.module.less";
import { langType } from "@/types/generalTypes";

import Twitter from "@/assets/images/icons/brands/twitter.svg";
import Facebook from "@/assets/images/icons/brands/facebook-f.svg";
import Youtube from "@/assets/images/icons/brands/youtube.svg";
import Twitch from "@/assets/images/icons/brands/twitch.svg";

import Instagram from "@/assets/images/icons/brands/instagram.svg";

type Props = { language: langType };

import { socialMediaData } from "./SocialNetworkData";

export default function SocialNetworks({ language }: Props) {
  const data = socialMediaData[language];
  return (
    <section className={styling.socialNetworks}>
      <h2> {data.heading.toUpperCase()}</h2>

      <nav aria-label="Social Media Links">
        <ul className={styling.list}>
          <li>
            <a
              href={data.links[0].url}
              title="Follow us on Twitter"
              target="_blank"
            >
              <Twitter />
            </a>
          </li>
          <li>
            <a
              href={data.links[1].url}
              title="Follow us on Facebook"
              target="_blank"
            >
              <Facebook />
            </a>
          </li>
          <li>
            <a
              href={data.links[2].url}
              title="Follow us on YouTube"
              target="_blank"
            >
              <Youtube />
            </a>
          </li>
          <li>
            <a
              href={data.links[3].url}
              title="Follow us on Twitch"
              target="_blank"
            >
              <Twitch />
            </a>
          </li>
          <li>
            <a
              href={data.links[4].url}
              title="Follow us on Instagram"
              target="_blank"
            >
              <Instagram />
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
}
