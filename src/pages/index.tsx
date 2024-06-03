import Head from "next/head";
import { fetchCategories, fetchPosts } from "../lib/api";
import Header from "@/components/Header/Header";
import cookie from "cookie";

export async function getServerSideProps(context) {
  const cookies = cookie.parse(context.req.headers.cookie || "");

  const language = cookies["lb-language"] || "fr";

  const posts = await fetchPosts(language);
  const categories = await fetchCategories(language);

  return {
    props: {
      posts,
      categories,
      language,
    },
  };
}

const HomePage = ({ posts, categories, language }) => {
  return (
    <div>
      <Header categories={categories} language={language} />
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <a href={`/posts/${post.slug}`}>{post.title.rendered}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
