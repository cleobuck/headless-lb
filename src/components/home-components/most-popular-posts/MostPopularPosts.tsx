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
  const listColumnLength = 3;
  return (
    <section className={styling.mostPopularPosts}>
      <h2>
        {language === "fr" ? "Les plus populaires" : "De populairste artikels"}
      </h2>

      <div className={styling.articleList}>
        <div className={styling.articleColumn}>
          {mostPopularPosts
            ?.slice(0, listColumnLength)
            .map((article, index) => (
              <Article article={article} key={index} />
            ))}
        </div>

        <div className={styling.articleColumn}>
          {mostPopularPosts?.slice(-listColumnLength).map((article, index) => (
            <Article article={article} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

const Article = ({ article }: { article: ArticleType }) => {
  const router = useRouter();

  console.log(article);
  return (
    <article
      onClick={() => {
        router.push(article.link);
      }}
      className={styling.article}
    >
      <figure className={styling.number}>
        <span>{article.number}</span>
      </figure>
      <header className={styling.metaData}>
        <span className={styling.category}>{article.category} </span>
        <h3 className={styling.title}>{article.title} </h3>
        <time className={styling.date}>{article.date}</time>
      </header>
    </article>
  );
};
