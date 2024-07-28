import { getLanguage } from "./utils";
import { fetchAuthors, fetchCategories } from "./api";
import { GetServerSidePropsContext } from "next";

export default async function getServerSideProps(
  context: GetServerSidePropsContext
) {
  const language = getLanguage(context);

  const categories = await fetchCategories(language);

  const authors = await fetchAuthors();

  return {
    props: {
      categories,
      language,
      authors,
    },
  };
}
