import React, { useEffect, useRef, useState } from "react";
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
  className: string;
};

export default function Header({
  categories,
  language,
}: {
  categories: CategoryType[];
  language: langType;
}) {
  const [isNavShown, showNav] = useState(false);
  const [isSearchShown, setSearch] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (router.query.s) {
      setSearch(false);
    }
  }, [router.query?.s]);

  return (
    <header
      id="header"
      className={`${styling.header} ${isNavShown ? styling.toggledHeader : ""}`}
    >
      <div className={styling.content}>
        <Image
          src={Logo}
          alt="ladbrokes logo"
          className={styling.logo}
          onClick={() => router.push("/")}
        />

        <Nav
          categories={categories}
          language={language}
          hideNav={() => showNav(false)}
          className={isNavShown ? styling.navShown : ""}
        />

        <Bars
          onClick={() => showNav((isNavShown) => !isNavShown)}
          className={styling.bars}
        />
        <MagnifyingGlass
          onClick={() => setSearch((isSearchShown) => !isSearchShown)}
          className={styling.magnifyingGlass}
        />
      </div>

      {isSearchShown && <Search close={() => setSearch(false)} />}
    </header>
  );
}

const Nav = ({ categories, language, hideNav, className }: Props) => {
  const [isLanguageMenuOpen, openLanguageMenu] = useState(false);
  const languageRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (window.innerWidth < 767) {
      languageRef.current!.addEventListener("click", () =>
        openLanguageMenu((isLanguageMenuOpen) => !isLanguageMenuOpen)
      );
    } else {
      languageRef.current!.addEventListener("mouseenter", () =>
        openLanguageMenu(true)
      );
      languageRef.current!.addEventListener("mouseleave", () =>
        openLanguageMenu(false)
      );
    }
  }, []);

  return (
    <nav className={`${className} ${styling.nav}`}>
      <ul className={styling.topNav}>
        {categories
          .filter((category) => ![1, 9].includes(category.id))
          .reverse()
          .map((category, index) => (
            <CategoryItem hideNav={hideNav!} key={index} category={category} />
          ))}

        <li className={styling.topNavItem}> Casino </li>
        <li className={`${styling.topNavItem}`}>
          {language === "fr" ? "Promotions" : "Promoties"}{" "}
        </li>

        <li aria-hidden={true} className={styling.separation}></li>

        <li className={styling.topNavItem}>
          {language === "fr" ? "S'identifier" : "Inloggen"}{" "}
        </li>
        <li className={`${styling.topNavItem} ${styling.highlightedLi}`}>
          <span className={styling.highlightedNavItem}>
            {language === "fr" ? "S'enregistrer" : "Registreren"}
          </span>
        </li>
        <li ref={languageRef}>
          <div
            className={`${styling.topNavItem} ${
              isLanguageMenuOpen ? styling.topNavOpen : ""
            }`}
          >
            {language === "fr" ? "FR" : "NL"}
            <CaretDown className={styling.caretDown} />
          </div>

          <LanguageMenu
            hideNav={hideNav!}
            isLanguageMenuOpen={isLanguageMenuOpen}
          />
        </li>
      </ul>
    </nav>
  );
};

const LanguageMenu = ({
  hideNav,
  isLanguageMenuOpen,
}: {
  hideNav: () => void;
  isLanguageMenuOpen: boolean;
}) => {
  const [isHover, setHover] = useState("");
  const nlRef = useRef<HTMLLIElement>(null);

  const frRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (window.innerWidth > 767) {
      nlRef.current!.addEventListener("mouseenter", () => setHover("nl"));
      nlRef.current!.addEventListener("mouseleave", () => setHover(""));
      frRef.current!.addEventListener("mouseenter", () => setHover("fr"));
      frRef.current!.addEventListener("mouseleave", () => setHover(""));
    }
  }, []);

  return (
    <ul
      className={`${isLanguageMenuOpen ? styling.secondaryNavVisible : ""} ${
        styling.secondaryLevelNav
      }`}
    >
      <li
        ref={frRef}
        className={`${styling.secondaryNavItems} ${
          isHover == "fr" ? styling.secondaryNavItemHover : ""
        }`}
        onClick={() => {
          hideNav();
          setLanguage("fr");
        }}
      >
        FR
      </li>
      <li
        ref={nlRef}
        className={`${styling.secondaryNavItems} ${
          isHover == "nl" ? styling.secondaryNavItemHover : ""
        }`}
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
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (window.innerWidth >= 767) {
      ref.current!.addEventListener("mouseenter", () => showSecondNav(true));
      ref.current!.addEventListener("mouseleave", () => showSecondNav(false));
    }
  }, []);

  return (
    <>
      <li
        ref={ref}
        onClick={() => {
          if (
            (window.innerWidth < 767 && isSecondNavOpen) ||
            window.innerWidth >= 767
          ) {
            router.push(`/category/${category.slug}`);
            hideNav();
          } else {
            showSecondNav((isShown) => !isShown);
          }
        }}
      >
        <div
          className={`${styling.topNavItem} ${
            isSecondNavOpen ? styling.topNavOpen : ""
          }`}
        >
          {category.name} <CaretDown className={styling.caretDown} />
        </div>
        {category.children && (
          <ul
            className={`${styling.secondaryLevelNav} ${
              isSecondNavOpen ? styling.secondaryNavVisible : ""
            }`}
          >
            {category.children.map((subCategory, index) => (
              <SecondaryNavItem
                key={index}
                slug={`${category.slug}/${subCategory.slug}/`}
                name={subCategory.name}
                hideNav={hideNav}
              />
            ))}
          </ul>
        )}
      </li>
    </>
  );
};

const SecondaryNavItem = ({
  slug,
  name,
  hideNav,
}: {
  slug: string;
  name: string;
  hideNav: () => void;
}) => {
  const router = useRouter();

  const [isHover, setHover] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (window.innerWidth > 767) {
      ref.current!.addEventListener("mouseenter", () => setHover(true));
      ref.current!.addEventListener("mouseleave", () => setHover(false));
    }
  }, []);

  return (
    <li
      ref={ref}
      className={`${styling.secondaryNavItems} ${
        isHover ? styling.secondaryNavItemHover : ""
      }`}
      onClick={() => {
        router.push(`/category/${slug}`);
        hideNav();
      }}
    >
      {name}
    </li>
  );
};
