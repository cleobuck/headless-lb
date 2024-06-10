import React from "react";
import styling from "./MostPopularPosts.module.less";
type Props = {};

export default function MostPopularPosts({
  mostPopularPosts,
  language,
}: Props) {
  return (
    <section className={styling.mostPopularPosts}>
      <h2>
        {language === "fr" ? "Les plus populaires" : "De populairste artikels"}
      </h2>

      {mostPopularPosts?.map((article, index) => (
        <Article article={article} key={index} />
      ))}
    </section>
  );
}

const Article = ({ article }) => {
  return (
    <article
      onClick={() => {
        window.location.href = article.permalink;
      }}
      className={styling.article}
    >
      <figure className={styling.number}>
        <span>{article.count}</span>
      </figure>
      <header className={styling.metaData}>
        <span className={styling.category}>{article.category} </span>
        <h3 className={styling.title}>{article.title} </h3>
        <time className={styling.date}>{article.date}</time>
      </header>
    </article>
  );
};
