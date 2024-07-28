import React from "react";
import styling from "./ContactComponent.module.less";
import { ContactPageTypes } from "@/types/ContactTypes";
import Head from "next/head";
import SocialNetworks from "../social-networks/SocialNetworks";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Image from "next/image";
import LinkedIn from "@/assets/images/icons/brands/linkedin.svg";
import DarkModeSwitch from "../DarkModeSwitch/DarkModeSwitch";

export default function ContactComponent({
  categories,
  language,
  authors,
}: ContactPageTypes) {
  console.log(authors);
  return (
    <>
      <Head>
        <title>Contact</title>
      </Head>
      <Header categories={categories} language={language} />

      <section className={styling.contact}>
        <DarkModeSwitch />
        <h1> Contact </h1>

        <div className={styling.authorList}>
          {authors.map((author) => (
            <article key={author.email} className={styling.authorItem}>
              <figure className={styling.authorImg}>
                <Image src={author.avatar} alt={author.name} fill={true} />
              </figure>
              {/* <a href={author.url}>
                <h2 className={styling.authorName}>{author.name}</h2>
              </a> */}

              <h2 className={styling.authorName}>{author.name}</h2>

              <a
                className={styling.authorEmail}
                href={`mailto:${author.email}`}
              >
                {author.email}
              </a>

              <p className={styling.authorBio}>{author.bio}</p>
              <a
                href={author.linkedIn}
                className={styling.linkedIn}
                target="_blank"
              >
                <LinkedIn />
              </a>
            </article>
          ))}
        </div>
      </section>

      <SocialNetworks language={language} />
      <Footer language={language} />
    </>
  );
}
