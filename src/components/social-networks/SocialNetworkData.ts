import { langType } from "@/types/generalTypes";

export const socialMediaData: {
  [key in langType]: {
    heading: string;
    links: {
      name: string;
      url: string;
    }[];
  };
} = {
  fr: {
    heading: "Nos réseaux",
    links: [
      {
        name: "Twitter",
        url: "https://twitter.com/ladbrokes_live",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/Ladbrokes.live",
      },
      {
        name: "YouTube",
        url: "https://www.youtube.com/@LadbrokesLive",
      },
      {
        name: "Twitch",
        url: "https://m.twitch.tv/ladbrokeslive/home",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/ladbrokes.live/",
      },
    ],
  },
  nl: {
    heading: "Onze Sociale Media",
    links: [
      {
        name: "Twitter",
        url: "https://twitter.com/ladbrokes_live",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/Ladbrokes.livenl/",
      },
      {
        name: "YouTube",
        url: "https://www.youtube.com/@LadbrokesLive",
      },
      {
        name: "Twitch",
        url: "https://m.twitch.tv/ladbrokeslive/home",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/ladbrokes.live/",
      },
    ],
  },
};
