import HomeComponent from "@/components/home-components/HomeComponent";
import getServerSideProps from "@/lib/HomeServerData";
export { getServerSideProps };

const HomePage = (data) => {
  return <HomeComponent {...data} />;
};

export default HomePage;
