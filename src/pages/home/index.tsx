import Head from "next/head";
import {
  fetchCategories,
  fetchFeaturedPosts,
  fetchMostPopularPosts,
  fetchMostRecentPosts,
} from "../../lib/api";
import Header from "@/components/Header/Header";
import cookie from "cookie";
import Footer from "@/components/Footer/Footer";
import MostPopularPosts from "./most-popular-posts/MostPopularPosts";
import FeaturedPosts from "./featured-posts/FeaturedPosts";
import styling from "./index.module.less";
import MostRecentPosts from "./most-recent-posts/MostRecentPosts";
export async function getServerSideProps(context) {
  const cookies = cookie.parse(context.req.headers.cookie || "");

  const language = cookies["lb-language"] || "fr";

  // const posts = await fetchPosts(language);
  const categories = await fetchCategories(language);

  const featuredPosts = await fetchFeaturedPosts(language);

  const mostRecentPosts = await fetchMostRecentPosts(language);

  const mostPopularPosts = await fetchMostPopularPosts(language);

  return {
    props: {
      categories,
      language,
      featuredPosts,
      mostRecentPosts,
      mostPopularPosts,
    },
  };
}

const HomePage = ({
  categories,
  language,
  featuredPosts,
  mostRecentPosts,
  mostPopularPosts,
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
