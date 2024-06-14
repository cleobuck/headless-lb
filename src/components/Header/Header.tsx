import React, { useState } from "react";
import styling from "./Header.module.less";
import Logo from "@/assets/images/ladbrokes-logo.webp";
import Bars from "@/assets/images/icons/solid/bars.svg";
import MagnifyingGlass from "@/assets/images/icons/solid/magnifying-glass.svg";
import Image from "next/image";
import { setLanguage } from "@/lib/utils";
import { useRouter } from "next/router";
import { langType } from "@/types/generalTypes";
import { CategoryType } from "@/types/CategoryTypes";

type Props = { language: langType; categories: CategoryType[] };

export default function Header({ categories, language }: Props) {
  const [isNavShown, showNav] = useState(false);

  return (
    <header
      className={`${styling.header} ${isNavShown ? styling.toggledHeader : ""}`}
    >
      <Image src={Logo} alt="ladbrokes logo" className={styling.logo} />

      {isNavShown && <Nav categories={categories} language={language} />}

      <Bars
        onClick={() => showNav((isNavShown) => !isNavShown)}
        className={styling.bars}
      />
      <MagnifyingGlass className={styling.magnifyingGlass} />
    </header>
  );
}

const Nav = ({ categories, language }: Props) => {
  const [isLanguageMenuOpen, openLanguageMenu] = useState(false);

  return (
    <nav className={styling.nav}>
      <ul>
        {categories
          .filter((category) => ![1, 9].includes(category.id))
          .reverse()
          .map((category, index) => (
            <CategoryItem key={index} category={category} />
          ))}

        <li> Casino </li>
        <li> {language === "fr" ? "Promotions" : "Promoties"} </li>
        <li> {language === "fr" ? "S'identifier" : "Inloggen"} </li>
        <li> {language === "fr" ? "S'enregistrer" : "Registreren"} </li>
        <li
          onClick={() =>
            openLanguageMenu((isLanguageMenuOpen) => !isLanguageMenuOpen)
          }
        >
          {language === "fr" ? "FR" : "NL"}
          {isLanguageMenuOpen && <LanguageMenu />}
        </li>
      </ul>
    </nav>
  );
};

const LanguageMenu = () => {
  const router = useRouter();

  return (
    <ul>
      <li onClick={() => setLanguage("fr")}> FR </li>
      <li onClick={() => setLanguage("nl")}> NL </li>
    </ul>
  );
};

const CategoryItem = ({ category }: { category: CategoryType }) => {
  const [isSecondNavOpen, showSecondNav] = useState(false);

  const router = useRouter();

  return (
    <>
      <li onClick={() => showSecondNav((isShown) => !isShown)}>
        {category.name}
        {category.children && isSecondNavOpen && (
          <ul>
            {category.children.map((subCategory, index) => (
              <li
                key={index}
                onClick={() => {
                  router.push(
                    `/category/${category.slug}/${subCategory.slug}/`
                  );
                }}
              >
                {subCategory.name}
              </li>
            ))}
          </ul>
        )}
      </li>
    </>
  );
};
