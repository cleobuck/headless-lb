import React from "react";
import FeaturedPosts from "@/components/home-components/featured-posts/FeaturedPosts";
import MostPopularPosts from "@/components/home-components/most-popular-posts/MostPopularPosts";
import MostRecentPosts from "@/components/home-components/most-recent-posts/MostRecentPosts";
import Trends from "@/components/Trends/Trends";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styling from "./HomeComponent.module.less";
type Props = {};

const HomeComponent = ({
  categories,
  language,
  featuredPosts,
  mostRecentPosts,
  mostPopularPosts,
  advertisementBanner,
}) => {
  return (
    <div>
      <Header categories={categories} language={language} />

      <div className="content">
        <FeaturedPosts featuredPosts={featuredPosts} language={language} />

        <section className={styling.postBlock}>
          <MostRecentPosts
            mostRecentPosts={mostRecentPosts}
            language={language}
          />
          <MostPopularPosts
            mostPopularPosts={mostPopularPosts}
            language={language}
          />

          <Trends language={language} />
        </section>
        {/* <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <a href={`/posts/${post.slug}`}>{post.title.rendered}</a>
          </li>
        ))}
      </ul> */}
      </div>

      <Footer language={language} />
    </div>
  );
};

export default HomeComponent;
