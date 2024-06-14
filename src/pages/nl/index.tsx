import HomeComponent from "@/components/home-components/HomeComponent";
import getServerSideProps from "@/lib/HomeServerData";
import { HomeTypes } from "@/types/HomeTypes";
export { getServerSideProps };

const HomePage = (data: HomeTypes) => {
  return <HomeComponent {...data} />;
};

export default HomePage;
