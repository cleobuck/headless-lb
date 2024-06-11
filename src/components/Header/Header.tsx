import React, { useState } from "react";
import styling from "./Header.module.less";
import Logo from "@/assets/images/ladbrokes-logo.webp";
import Bars from "@/assets/images/icons/solid/bars.svg";
import MagnifyingGlass from "@/assets/images/icons/solid/magnifying-glass.svg";
import Image from "next/image";
import cookie from "cookie";
import { useLanguage } from "@/lib/utils";
import { useRouter } from "next/router";

type Props = {};

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

const Nav = ({ categories, language }) => {
  const [isLanguageMenuOpen, openLanguageMenu] = useState(false);

  return (
    <nav className={styling.nav}>
      <ul>
        {categories
          .filter((category) => ![1, 9].includes(category.id))
          .reverse()
          .map((category) => (
            <CategoryItem category={category} />
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
          {isLanguageMenuOpen && <LanguageMenu language={language} />}
        </li>
      </ul>
    </nav>
  );
};

const LanguageMenu = ({ language }) => {
  const router = useRouter();
  const setLanguage = (newLanguage) => {
    if (newLanguage !== language) {
      localStorage.setItem("lb-language", newLanguage);
      document.cookie = `lb-language=${newLanguage}; path=/`;
      if (router.pathname === "/" && newLanguage === "nl") {
        router.push("/nl");
      } else if (router.pathname === "/nl" && newLanguage === "fr") {
        router.replace("/");
      }
      window.location.reload();
    }
  };
  return (
    <ul>
      <li onClick={() => setLanguage("fr")}> FR </li>
      <li onClick={() => setLanguage("nl")}> NL </li>
    </ul>
  );
};

const CategoryItem = ({ category }) => {
  const [isSecondNavOpen, showSecondNav] = useState(false);

  const router = useRouter();

  return (
    <>
      <li onClick={() => showSecondNav((isShown) => !isShown)}>
        {category.name}
        {category.children && isSecondNavOpen && (
          <ul>
            {category.children.map((subCategory) => (
              <li
                onClick={() => {
                  window.location = `https://news.ladbrokes.be/category/category/${category.slug}/${subCategory.slug}/`;
                }}
              >
                {" "}
                {subCategory.name}{" "}
              </li>
            ))}
          </ul>
        )}
      </li>
    </>
  );
};
