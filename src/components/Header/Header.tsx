import React, { useState } from "react";
import styling from "./Header.module.less";
import Logo from "@/assets/images/ladbrokes-logo.webp";
import Bars from "@/assets/images/icons/solid/bars.svg";
import MagnifyingGlass from "@/assets/images/icons/solid/magnifying-glass.svg";

import Image from "next/image";

type Props = {};

export default function Header({ categories }: Props) {
  const [isNavShown, showNav] = useState(false);
  return (
    <header
      className={`${styling.header} ${isNavShown ? styling.toggledHeader : ""}`}
    >
      <Image src={Logo} alt="ladbrokes logo" className={styling.logo} />

      {isNavShown && <Nav categories={categories} />}

      <Bars
        onClick={() => showNav((isNavShown) => !isNavShown)}
        className={styling.bars}
      />
      <MagnifyingGlass className={styling.magnifyingGlass} />
    </header>
  );
}

const Nav = ({ categories }) => {
  console.log(categories);
  return (
    <nav className={styling.nav}>
      <ul>
        {categories
          .filter((category) => category.id !== 1)
          .map((category) => (
            <li> {category.name} </li>
          ))}
      </ul>
    </nav>
  );
};
