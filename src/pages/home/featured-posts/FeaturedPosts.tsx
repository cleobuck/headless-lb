import React from "react";
import styling from "./FeaturedPosts.module.less";
type Props = {};

export default function FeaturedPosts({ featuredPosts }: Props) {
  return (
    <section className={styling.featuredPosts}>
      <Article article={featuredPosts[0]} first={true} />

      <div className={styling.secondaryArticlesContainer}>
        {featuredPosts.map((article, index) => {
          if (index !== 0) {
            return <Article article={article} />;
          }
        })}
      </div>
    </section>
  );
}

const Article = ({ article, first = false }) => {
  console.log(article);
  return (
    <article id={article.id}>
      <a href={article.permalink}>
        <header>
          <span>{article.category}</span>
          <h3>{article.title}</h3>
          <time dateTime="2024-06-04">{article.date}</time>
        </header>
        <figure>
          <img src={article.featured_image} alt="Vincent Kompany image" />
        </figure>
      </a>
    </article>
  );
};
