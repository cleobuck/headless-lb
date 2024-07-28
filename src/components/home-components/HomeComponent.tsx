import React, { useEffect } from "react";
import FeaturedPosts from "@/components/home-components/featured-posts/FeaturedPosts";
import MostPopularPosts from "@/components/home-components/most-popular-posts/MostPopularPosts";
import MostRecentPosts from "@/components/home-components/most-recent-posts/MostRecentPosts";
import Trends from "@/components/Trends/Trends";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styling from "./HomeComponent.module.less";

import { HomeTypes } from "@/types/HomeTypes";
import SocialNetworks from "../social-networks/SocialNetworks";
import AdBanner from "./ad-banner/AdBanner";
import DarkModeSwitch from "../DarkModeSwitch/DarkModeSwitch";
import FacebookFeed from "./facebook-feed/FacebookFeed";
import VideoPlaylist from "../VideoPlaylist/VideoPlaylist";

import SearchPage from "../Search/SearchPage";
import Head from "next/head";
import Description from "./description/Description";

const HomeComponent = ({
  categories,
  language,
  featuredPosts,
  mostRecentPosts,
  mostPopularPosts,
  advertisementBanner,
  facebookFeed,
  videos,
  searchResults,
  head,
}: HomeTypes) => {
  const {
    title,
    description,
    robots,
    canonical,
    og_title,
    og_description,
    og_url,
    og_site_name,
    og_image,
    twitter_card,
    twitter_site,
    schema,
    article_publisher,
    article_modified_time,
  } = head;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="robots"
          content={`${robots.index},${robots.follow},${robots["max-snippet"]},${robots["max-image-preview"]},${robots["max-video-preview"]}`}
        />

        <link rel="canonical" href={canonical} />
        <link rel="alternate" href={process.env.BASE_URL} hrefLang="fr"></link>

        <link
          rel="alternate"
          href={`${process.env.BASE_URL}/nl`}
          hrefLang="nl"
        ></link>

        <meta property="article:publisher" content={article_publisher} />
        <meta
          property="article:modified_time"
          content={article_modified_time}
        />
        {/* Open Graph tags */}
        <meta
          property="og:locale"
          content={language === "nl" ? "nl_BE" : "fr_FR"}
        />

        <meta
          property="og:locale:alternate"
          content={language === "fr" ? "nl_BE" : "fr_FR"}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={og_title} />
        <meta property="og:description" content={og_description} />
        <meta property="og:url" content={og_url} />
        <meta property="og:site_name" content={og_site_name} />
        {og_image && (
          <>
            <meta
              property="og:image:width"
              content={og_image[0].width.toString()}
            />
            <meta
              property="og:image:height"
              content={og_image[0].height.toString()}
            ></meta>

            <meta property="og:image:type" content={og_image[0].type}></meta>
            <meta property="og:image" content={og_image[0].url} />
          </>
        )}

        {/* Twitter Card tags */}
        <meta name="twitter:card" content={twitter_card} />
        <meta name="twitter:site" content={twitter_site} />

        {/* Structured data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          integrity="sha384-k6RqeWeci5ZR/Lv4MR0sA0FfDOMA4gOZ6zAQlQH7aOcC2JwvjA4QZerTPB68DJVf"
          crossOrigin="anonymous"
        />
      </Head>
      <Header categories={categories} language={language} />

      {searchResults ? (
        <SearchPage searchResults={searchResults} language={language} />
      ) : (
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
          {language === "fr" && <VideoPlaylist videos={videos} />}

          <FacebookFeed facebookFeed={facebookFeed} />

          <Description language={language} />
        </div>
      )}

      <SocialNetworks language={language} />
      <Footer language={language} />
    </>
  );
};

export default HomeComponent;
