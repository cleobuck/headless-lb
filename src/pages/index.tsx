import Head from "next/head";
import { fetchCategories, fetchPosts } from "../lib/api";
import Header from "@/components/Header/Header";

export async function getServerSideProps() {
  const posts = await fetchPosts();
  const categories = await fetchCategories();
  return {
    props: {
      posts,
      categories,
    },
  };
}

const HomePage = ({ posts, categories }) => {
  return (
    <div>
      <Header categories={categories} />
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
