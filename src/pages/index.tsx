import HomeComponent from "@/components/home-components/HomeComponent";
import getServerSideProps from "@/lib/HomeServerData";
import { HomeTypes } from "@/types/HomeTypes";
import Head from "next/head";
export { getServerSideProps };

const HomePage = (data: HomeTypes) => {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          integrity="sha384-k6RqeWeci5ZR/Lv4MR0sA0FfDOMA4gOZ6zAQlQH7aOcC2JwvjA4QZerTPB68DJVf"
          crossOrigin="anonymous"
        />
      </Head>{" "}
      <HomeComponent {...data} />
    </>
  );
};

export default HomePage;
