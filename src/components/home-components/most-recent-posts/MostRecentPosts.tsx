import React from "react";
import styling from "./MostRecentPosts.module.less";
type Props = {};
import Image from "next/image";

export default function MostRecentPosts({ mostRecentPosts, language }: Props) {
  return (
    <section className={styling.mostRecentPosts}>
      <h2>
        {language === "fr" ? "Les plus récents" : "De meest recente artikels"}
      </h2>

      {mostRecentPosts.map((post, index) => (
        <Post post={post} key={index} />
      ))}
    </section>
  );
}

const Post = ({ post }) => {
  return (
    <article
      onClick={() => {
        window.location.href = post.permalink;
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
