import React from "react";
import { footerData, lawStatement } from "./FooterData";
import styling from "./Footer.module.less";

import { FooterLinkType, FooterSection } from "./types";
import { langType } from "@/types/generalTypes";

type Props = { language: langType };

const Footer = ({ language }: Props) => {
  return (
    <footer className={styling.footer}>
      <div className={styling.footerContent}>
        <>
          {footerData[language].map((column, index) => (
            <FooterColumn
              key={index}
              title={column.title}
              links={column.links}
            />
          ))}
        </>
        <p className={styling.statement}> {lawStatement}</p>
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, links }: FooterSection) => (
  <div className={styling.column}>
    <h4 className={styling.columnHeader}>{title}</h4>

    <ul className={styling.columnList}>
      {links.map((link, index) => (
        <FooterLink key={index} href={link.href} text={link.text} />
      ))}
    </ul>
  </div>
);

const FooterLink = ({ href, text }: FooterLinkType) => (
  <li>
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styling.footerLink}
    >
      {text}
    </a>
  </li>
);

export default Footer;
