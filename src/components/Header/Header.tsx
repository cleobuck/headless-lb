import React, { useState } from "react";
import styling from "./Header.module.less";
import Logo from "@/assets/images/ladbrokes-logo.webp";
import Bars from "@/assets/images/icons/solid/bars.svg";
import MagnifyingGlass from "@/assets/images/icons/solid/magnifying-glass.svg";
import Image from "next/image";
import cookie from "cookie";
import { useLanguage } from "@/lib/utils";

type Props = {};

export default function Header({ categories, language }: Props) {
  const [isNavShown, showNav] = useState(false);

  return (
    <header
      className={`${styling.header} ${isNavShown ? styling.toggledHeader : ""}`}
    >
      <Image src={Logo} alt="ladbrokes logo" className={styling.logo} />

      {isNavShown && <Nav categories={categories} initialLanguage={language} />}

      <Bars
        onClick={() => showNav((isNavShown) => !isNavShown)}
        className={styling.bars}
      />
      <MagnifyingGlass className={styling.magnifyingGlass} />
    </header>
  );
}

const Nav = ({ categories, initialLanguage }) => {
  const [isLanguageMenuOpen, openLanguageMenu] = useState(false);

  const [language, setLanguage] = useLanguage(initialLanguage);

  // const [language, setLanguage] = useState();

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
          {isLanguageMenuOpen && (
            <ul>
              <li onClick={() => setLanguage("fr")}> FR </li>
              <li onClick={() => setLanguage("nl")}> NL </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

const CategoryItem = ({ category }) => {
  const [isSecondNavOpen, showSecondNav] = useState(false);
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
