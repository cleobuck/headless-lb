import React from "react";
import styling from "./SimilarArticles.module.less";
import { ArticleType } from "@/types/PostTypes";
import { langType } from "@/types/generalTypes";
import Image from "next/image";
import { useRouter } from "next/router";
type Props = { similarArticles: ArticleType[]; language: langType };

export default function SimilarArticles({ similarArticles, language }: Props) {
  const router = useRouter();
  return (
    <section className={styling.similarArticles}>
      <h2>
        {language === "fr" ? "Articles similaires" : "soortgelijke artikelen"}
      </h2>
      <div className={styling.articles}>
        {similarArticles
          .filter((_, index) => index < 3)
          .map((article) => (
            <article onClick={() => router.push(article.link)}>
              <figure className={styling.figure}>
                <Image
                  src={article.featured_image}
                  alt={""}
                  className={styling.featuredImage}
                  fill={true}
                />
              </figure>

              <h3>{article.title}</h3>
            </article>
          ))}
      </div>
    </section>
  );
}
