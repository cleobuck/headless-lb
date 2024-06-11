import Head from "next/head";
import {
  fetchAdvertisementBanner,
  fetchCategories,
  fetchFeaturedPosts,
  fetchMostPopularPosts,
  fetchMostRecentPosts,
} from "../lib/api";
import Header from "@/components/Header/Header";
import cookie from "cookie";
import Footer from "@/components/Footer/Footer";

import styling from "./index.module.less";
import FeaturedPosts from "@/components/home-components/featured-posts/FeaturedPosts";
import MostPopularPosts from "@/components/home-components/most-popular-posts/MostPopularPosts";
import MostRecentPosts from "@/components/home-components/most-recent-posts/MostRecentPosts";
import Trends from "@/components/Trends/Trends";
export async function getServerSideProps(context) {
  const cookies = cookie.parse(context.req.headers.cookie || "");

  const language = cookies["lb-language"] || "fr";

  // const posts = await fetchPosts(language);
  const categories = await fetchCategories(language);

  const featuredPosts = await fetchFeaturedPosts(language);

  const mostRecentPosts = await fetchMostRecentPosts(language);

  const mostPopularPosts = await fetchMostPopularPosts(language);

  const advertisementBanner = await fetchAdvertisementBanner(language);

  return {
    props: {
      categories,
      language,
      featuredPosts,
      mostRecentPosts,
      mostPopularPosts,
      advertisementBanner,
    },
  };
}

const HomePage = ({
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

export default HomePage;
