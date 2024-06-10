import React from "react";
import styling from "./FeaturedPosts.module.less";
type Props = {};
import Image from "next/image";
import { createArticleLink } from "@/lib/utils";

export default function FeaturedPosts({ featuredPosts, language }: Props) {
  return (
    <>
      <h2 className={styling.featuredImagesTitle}>
        {language === "fr" ? "A la une" : "Uitgelichte artikelen"}
      </h2>
      <section className={styling.featuredPosts}>
        <Article article={featuredPosts[0]} first key={0} />

        <div className={styling.secondaryArticlesContainer}>
          {featuredPosts.map((article, index) => {
            if (index !== 0) {
              return <Article article={article} key={index} />;
            }
          })}
        </div>
      </section>
    </>
  );
}

const Article = ({ article, first = false }) => {
  return (
    <article
      id={article.id}
      className={`${styling.featuredItem} ${
        first ? styling.firstFeaturedItem : styling.secondaryFeaturedItem
      }`}
      onClick={() => {
        window.location.href = createArticleLink(article);
      }}
    >
      <header className={styling.metaData}>
        <span className={styling.category}>{article.category}</span>
        <h3>{article.title}</h3>
        <time className={styling.date} dateTime="2024-06-04">
          {article.date}
        </time>
      </header>
      <figure className={styling.figure}>
        <Image
          src={article.featured_image}
          alt={article.image_alt}
          className={styling.featuredImage}
          fill={true}
        />
      </figure>
    </article>
  );
};
