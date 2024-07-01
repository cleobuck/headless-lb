import React, { useEffect } from "react";
import FeaturedPosts from "@/components/home-components/featured-posts/FeaturedPosts";
import MostPopularPosts from "@/components/home-components/most-popular-posts/MostPopularPosts";
import MostRecentPosts from "@/components/home-components/most-recent-posts/MostRecentPosts";
import Trends from "@/components/Trends/Trends";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styling from "./HomeComponent.module.less";
import { langType } from "@/types/generalTypes";
import { AdBannerType, ArticleType } from "@/types/PostTypes";
import { HomeTypes } from "@/types/HomeTypes";
import SocialNetworks from "../social-networks/SocialNetworks";
import AdBanner from "./ad-banner/AdBanner";
import DarkModeSwitch from "../DarkModeSwitch/DarkModeSwitch";
import { getHeaderWidth } from "@/lib/utils";
import FacebookFeed from "./facebook-feed/FacebookFeed";

const HomeComponent = ({
  categories,
  language,
  featuredPosts,
  mostRecentPosts,
  mostPopularPosts,
  advertisementBanner,
  facebookFeed,
}: HomeTypes) => {
  useEffect(() => {
    console.log(getHeaderWidth());
  }, []);

  console.log(facebookFeed);

  return (
    <>
      <Header categories={categories} language={language} />
      <div className={styling.home}>
        <div className="content">
          <DarkModeSwitch />
          <AdBanner ads={advertisementBanner} />
          <FeaturedPosts featuredPosts={featuredPosts} language={language} />

          <section className={styling.postBlock}>
            <MostRecentPosts
              mostRecentPosts={mostRecentPosts}
              language={language}
            />

            <div>
              <MostPopularPosts
                mostPopularPosts={mostPopularPosts}
                language={language}
              />

              <Trends language={language} />
            </div>
          </section>
        </div>
      </div>

      <FacebookFeed facebookFeed={facebookFeed} />

      <SocialNetworks language={language} />
      <Footer language={language} />
    </>
  );
};

export default HomeComponent;
