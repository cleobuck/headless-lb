import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { fetchCategoryAndPosts } from "@/lib/api";
import styling from "./CategoryComponent.module.less";
import { CategoryPostType } from "@/types/PostTypes";

import { CategoryPageServerDataType } from "@/types/CategoryTypes";
import SocialNetworks from "@/components/social-networks/SocialNetworks";
import { processContent } from "@/lib/utils";
import Image from "next/image";

import DarkModeSwitch from "@/components/DarkModeSwitch/DarkModeSwitch";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import LoadMore from "@/components/LoadMore/LoadMore";
import Head from "next/head";

export default function CategoryComponent({
  categories,
  language,
  categoryAndPosts,
  bannerFlowScript,
  slug,
}: CategoryPageServerDataType) {
  const router = useRouter();

  const currentUrl = `${process.env.BASE_URL}${router.asPath}`;

  const [posts, setPosts] = useState(categoryAndPosts.posts);

  console.log(posts);

  const [page, setPage] = useState(2);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) {
      const script = document.createElement("script");
      script.src = bannerFlowScript;
      script.async = true;

      // Assuming 'myDiv' is the ID of the div where you want to append the script
      ref.current.appendChild(script);
    }
  }, []);

  return (
    <>
      <Head>
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <link
          rel="alternate"
          href={`${process.env.BASE_URL}${categoryAndPosts.category.yoast_meta.alternate_url}`}
          hrefLang={language === "fr" ? "nl" : "fr"}
        />

        <link
          rel="alternate"
          href={currentUrl}
          hrefLang={language === "nl" ? "nl" : "fr"}
        />

        <meta
          property="og:locale"
          content={language === "nl" ? "nl_BE" : "fr_FR"}
        />
        <meta
          property="og:locale:alternate"
          content={language === "fr" ? "nl_BE" : "fr_FR"}
        />

        <title>{categoryAndPosts.category.yoast_meta.wpseo_title}</title>

        <meta
          name="description"
          content={categoryAndPosts.category.yoast_meta.wpseo_desc}
        />

        <link
          rel="canonical"
          href={
            categoryAndPosts.category.yoast_meta.wpseo_canonical || currentUrl
          }
        />
        <meta property="og:image:width" content={"1200"} />
        <meta property="og:image:height" content={"675"} />

        <meta property="og:type" content="website" />

        <meta property="og:url" content={currentUrl} />

        <meta
          property="og:description"
          content={
            categoryAndPosts.category.yoast_meta.wpseo_opengraph_description
          }
        />

        <meta
          property="og:title"
          content={categoryAndPosts.category.yoast_meta.wpseo_opengraph_title}
        />

        <meta
          name="twitter:card"
          content={categoryAndPosts.category.yoast_meta.twitter_card}
        />
        <meta
          name="twitter:site"
          content={categoryAndPosts.category.yoast_meta.twitter_site}
        />
      </Head>
      <Header categories={categories} language={language} />
      <DarkModeSwitch />
      <section className={styling.content}>
        <div className={styling.listAndAside}>
          <div>
            <h2> {categoryAndPosts.category.parent_category}</h2>

            <h3> {categoryAndPosts.category.name} </h3>

            {posts.map((post) => (
              <Article post={post} key={post.id} />
            ))}

            <LoadMore
              language={language}
              onClick={async () => {
                const morePosts = await fetchCategoryAndPosts(
                  slug,
                  language,
                  page
                );

                setPosts((posts) => [...posts, ...morePosts.posts]);
                setPage((page) => page + 1);
              }}
            />
          </div>
          <aside ref={ref} className={styling.ad}></aside>
        </div>

        <p className={styling.content} />
        <aside
          className={styling.description}
          dangerouslySetInnerHTML={{
            __html: processContent(categoryAndPosts.category.description!),
          }}
        />
      </section>
      <SocialNetworks language={language} />
      <Footer language={language} />;
    </>
  );
}

const Article = ({ post }: { post: CategoryPostType }) => {
  const router = useRouter();
  return (
    <article
      onClick={() => {
        router.push(post.link);
      }}
      className={styling.article}
    >
      <figure className={styling.figure}>
        <Image
          className={styling.image}
          src={post["featured_image"]}
          alt=""
          fill={true}
        />
      </figure>

      <div className={styling.meta}>
        <h4> {post.title} </h4>

        <p> {post.excerpt} </p>

        <time className={styling.date}> {post.date} </time>
      </div>
    </article>
  );
};
