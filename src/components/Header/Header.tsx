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

import CaretDown from "@/assets/images/icons/solid/caret-down.svg";
import Search from "../Search/Search";

type Props = {
  language: langType;
  categories: CategoryType[];
  hideNav?: () => void;
};

export default function Header({ categories, language }: Props) {
  const [isNavShown, showNav] = useState(false);
  const [isSearchShown, setSearch] = useState(false);

  const router = useRouter();

  return (
    <header
      className={`${styling.header} ${isNavShown ? styling.toggledHeader : ""}`}
    >
      <Image
        src={Logo}
        alt="ladbrokes logo"
        className={styling.logo}
        onClick={() => router.push("/")}
      />

      {isNavShown && (
        <Nav
          categories={categories}
          language={language}
          hideNav={() => showNav(false)}
        />
      )}

      <Bars
        onClick={() => showNav((isNavShown) => !isNavShown)}
        className={styling.bars}
      />
      <MagnifyingGlass
        onClick={() => setSearch((isSearchShown) => !isSearchShown)}
        className={styling.magnifyingGlass}
      />

      {isSearchShown && <Search close={() => setSearch(false)} />}
    </header>
  );
}

const Nav = ({ categories, language, hideNav }: Props) => {
  const [isLanguageMenuOpen, openLanguageMenu] = useState(false);

  return (
    <nav className={styling.nav}>
      <ul>
        {categories
          .filter((category) => ![1, 9].includes(category.id))
          .reverse()
          .map((category, index) => (
            <CategoryItem hideNav={hideNav!} key={index} category={category} />
          ))}

        <li className={styling.topNavItem}> Casino </li>
        <li className={styling.topNavItem}>
          {language === "fr" ? "Promotions" : "Promoties"}{" "}
        </li>
        <li className={styling.topNavItem}>
          {language === "fr" ? "S'identifier" : "Inloggen"}{" "}
        </li>
        <li className={`${styling.topNavItem} ${styling.highlightedLi}`}>
          <span className={styling.highlightedNavItem}>
            {language === "fr" ? "S'enregistrer" : "Registreren"}
          </span>
        </li>
        <li
          onClick={() =>
            openLanguageMenu((isLanguageMenuOpen) => !isLanguageMenuOpen)
          }
        >
          <div
            className={`${styling.topNavItem} ${
              isLanguageMenuOpen ? styling.topNavOpen : ""
            }`}
          >
            {language === "fr" ? "FR" : "NL"}
            <CaretDown className={styling.caretDown} />
          </div>

          {isLanguageMenuOpen && <LanguageMenu hideNav={hideNav!} />}
        </li>
      </ul>
    </nav>
  );
};

const LanguageMenu = ({ hideNav }: { hideNav: () => void }) => {
  const router = useRouter();

  return (
    <ul className={styling.secondaryLevelNav}>
      <li
        className={styling.secondaryNavItems}
        onClick={() => {
          hideNav();
          setLanguage("fr");
        }}
      >
        FR
      </li>
      <li
        className={styling.secondaryNavItems}
        onClick={() => {
          hideNav();
          setLanguage("nl");
        }}
      >
        NL
      </li>
    </ul>
  );
};

const CategoryItem = ({
  category,
  hideNav,
}: {
  category: CategoryType;
  hideNav: () => void;
}) => {
  const [isSecondNavOpen, showSecondNav] = useState(false);

  const router = useRouter();

  return (
    <>
      <li onClick={() => showSecondNav((isShown) => !isShown)}>
        <div
          className={`${styling.topNavItem} ${
            isSecondNavOpen ? styling.topNavOpen : ""
          }`}
        >
          {category.name} <CaretDown className={styling.caretDown} />
        </div>
        {category.children && isSecondNavOpen && (
          <ul className={styling.secondaryLevelNav}>
            {category.children.map((subCategory, index) => (
              <li
                className={styling.secondaryNavItems}
                key={index}
                onClick={() => {
                  router.push(
                    `/category/${category.slug}/${subCategory.slug}/`
                  );
                  hideNav();
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
