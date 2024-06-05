import Head from "next/head";
import { fetchCategories, fetchFeaturedPosts, fetchPosts } from "../lib/api";
import Header from "@/components/Header/Header";
import cookie from "cookie";
import Footer from "@/components/Footer/Footer";

export async function getServerSideProps(context) {
  const cookies = cookie.parse(context.req.headers.cookie || "");

  const language = cookies["lb-language"] || "fr";

  const posts = await fetchPosts(language);
  const categories = await fetchCategories(language);

  const featuredPosts = await fetchFeaturedPosts(language);

  return {
    props: {
      posts,
      categories,
      language,
      featuredPosts,
    },
  };
}

const HomePage = ({ posts, categories, language, featuredPosts }) => {
  console.log(
    featuredPosts ? featuredPosts.map((featuredPost) => featuredPost.title) : ""
  );
  return (
    <div>
      <Header categories={categories} language={language} />
      <h1>Blog</h1>
      {/* <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <a href={`/posts/${post.slug}`}>{post.title.rendered}</a>
          </li>
        ))}
      </ul> */}

      <Footer language={language} />
    </div>
  );
};

export default HomePage;
