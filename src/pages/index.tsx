import HomeComponent from "@/components/home-components/HomeComponent";
import getServerSideProps from "@/lib/HomeServerData";
import { HomeTypes } from "@/types/HomeTypes";
import Head from "next/head";
export { getServerSideProps };

const HomePage = (data: HomeTypes) => {
  const {
    title,
    description,
    robots,
    canonical,
    og_locale,
    og_type,
    og_title,
    og_description,
    og_url,
    og_site_name,
    og_image,
    twitter_card,
    twitter_site,
    schema,
  } = data.head;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="robots"
          content={`${robots.index},${robots.follow},${robots["max-snippet"]},${robots["max-image-preview"]},${robots["max-video-preview"]}`}
        />
        <link rel="canonical" href={canonical} />

        {/* Open Graph tags */}
        <meta property="og:locale" content={og_locale} />
        <meta property="og:type" content={og_type} />
        <meta property="og:title" content={og_title} />
        <meta property="og:description" content={og_description} />
        <meta property="og:url" content={og_url} />
        <meta property="og:site_name" content={og_site_name} />
        {og_image && <meta property="og:image" content={og_image[0].url} />}

        {/* Twitter Card tags */}
        <meta name="twitter:card" content={twitter_card} />
        <meta name="twitter:site" content={twitter_site} />

        {/* Structured data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          integrity="sha384-k6RqeWeci5ZR/Lv4MR0sA0FfDOMA4gOZ6zAQlQH7aOcC2JwvjA4QZerTPB68DJVf"
          crossOrigin="anonymous"
        />
      </Head>
      <HomeComponent {...data} />
    </>
  );
};

export default HomePage;
