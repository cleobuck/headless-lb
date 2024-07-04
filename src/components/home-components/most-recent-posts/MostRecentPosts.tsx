import React, { useState } from "react";
import styling from "./MostRecentPosts.module.less";
type Props = { language: langType; mostRecentPosts: ArticleType[] };
import Image from "next/image";
import { useRouter } from "next/router";
import { langType } from "@/types/generalTypes";
import { ArticleType } from "@/types/PostTypes";
import { fetchMostRecentPosts } from "@/lib/api";
import LoadMore from "@/components/LoadMore/LoadMore";

export default function MostRecentPosts({ mostRecentPosts, language }: Props) {
  const [posts, setPosts] = useState(mostRecentPosts);

  const [page, setPage] = useState(2);

  return (
    <section className={styling.mostRecentPosts}>
      <h2>
        {language === "fr" ? "Les plus récents" : "De meest recente artikels"}
      </h2>

      {posts.map((post, index) => (
        <Post post={post} key={index} />
      ))}

      <LoadMore
        onClick={async () => {
          const morePosts = await fetchMostRecentPosts(language, page);

          setPosts((posts) => [...posts, ...morePosts]);
          setPage((page) => page + 1);
        }}
      />
    </section>
  );
}

const Post = ({ post }: { post: ArticleType }) => {
  const router = useRouter();
  return (
    <article
      onClick={() => {
        router.push(post.link);
      }}
      className={styling.postItem}
    >
      <figure className={styling.figure}>
        <Image src={post["featured_image"]} alt="" fill={true} />
      </figure>
      <div className={styling.metaData}>
        <header className={styling.titleAndCategory}>
          <span className={styling.category}> {post.category} </span>
          <h3 className={styling.title}> {post.title} </h3>
        </header>
        <p className={styling.excerpt}> {post.excerpt} </p>
        <time className={styling.date}> {post.date} </time>
      </div>
    </article>
  );
};
