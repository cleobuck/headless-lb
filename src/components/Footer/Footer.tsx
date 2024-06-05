import React from "react";
import { footerData, lawStatement } from "./FooterData";
import styling from "./Footer.module.less";

type Props = { language: string };

const Footer = ({ language }) => {
  return (
    <footer className={styling.footer}>
      <>
        {footerData[language].map((column, index) => (
          <FooterColumn key={index} title={column.title} links={column.links} />
        ))}
      </>
      <p className={styling.statement}> {lawStatement}</p>
    </footer>
  );
};

const FooterColumn = ({ title, links }) => (
  <div className={styling.column}>
    <h4 className={styling.columnHeader}>{title}</h4>

    <ul className={styling.columnList}>
      {links.map((link, index) => (
        <FooterLink key={index} href={link.href} text={link.text} />
      ))}
    </ul>
  </div>
);

const FooterLink = ({ href, text }) => (
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
