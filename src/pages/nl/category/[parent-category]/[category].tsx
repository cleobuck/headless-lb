import CategoryComponent from "@/components/category-component/CategoryComponent";
import getServerSideProps from "@/lib/CategoryData";
import { CategoryPageServerDataType } from "@/types/CategoryTypes";
export { getServerSideProps };

const CategoryPage = (data: CategoryPageServerDataType) => {
  return <CategoryComponent {...data} />;
};

export default CategoryPage;
