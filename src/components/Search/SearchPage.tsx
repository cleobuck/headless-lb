import React from "react";
import styling from "./Search.module.less";
import Image from "next/image";
import { SearchResult } from "@/types/HomeTypes";
import { createArticleLink, timeStampToDate } from "@/lib/utils";
import { langType } from "@/types/generalTypes";
import DarkModeSwitch from "../DarkModeSwitch/DarkModeSwitch";

type Props = { searchResults: any; language: langType };

export default function SearchPage({ searchResults, language }: Props) {
  return (
    <section className={styling.searchPage}>
      <DarkModeSwitch />

      <div className={styling.searchList}>
        {searchResults.map((searchItem: SearchResult) => (
          <a
            href={createArticleLink(
              searchItem.title,
              timeStampToDate(searchItem.date),
              language
            )}
            key={searchItem.title}
          >
            <article>
              <figure>
                <Image
                  src={searchItem.featuredImage}
                  alt={searchItem.featuredImageAlt}
                  width={500}
                  height={300}
                />
              </figure>
              <h2>{searchItem.title}</h2>
              <p>{searchItem.excerpt}</p>
            </article>
          </a>
        ))}
      </div>
    </section>
  );
}
