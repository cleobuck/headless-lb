import HomeComponent from "@/components/home-components/HomeComponent";
import getServerSideProps from "@/lib/HomeServerData";
import { HomeTypes } from "@/types/HomeTypes";
import Head from "next/head";
export { getServerSideProps };

const HomePage = (data: HomeTypes) => {
  return (
    <>
      <HomeComponent {...data} />
    </>
  );
};

export default HomePage;
