import React from "react";
import styling from "./MostPopularPosts.module.less";
import { useRouter } from "next/router";
import { langType } from "@/types/generalTypes";
import { ArticleType } from "@/types/PostTypes";
type Props = { language: langType; mostPopularPosts: ArticleType[] };

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

const Article = ({ article }: { article: ArticleType }) => {
  const router = useRouter();
  return (
    <article
      onClick={() => {
        router.push(article.link);
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
