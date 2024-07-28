import React from "react";
import styling from "./Description.module.less";
import { langType } from "@/types/generalTypes";

type Props = { language: langType };

export default function Description({ language }: Props) {
  const link =
    language === "fr"
      ? "https://www.ladbrokes.be/fr/sports/?_gl=1*1uu1isx*_gcl_au*MjAwMTg0MDE1NC4xNzIxODI2MzI3*_ga*NDgzNTE4MjA0LjE3MjE4MjYzMjc.*_ga_PBFHM7T8JB*MTcyMjEwMDI1OS44LjEuMTcyMjEwMDk3MC4wLjAuMA..#!"
      : "https://www.ladbrokes.be/nl/sports/?_gl=1*1cs4qwq*_gcl_au*MjAwMTg0MDE1NC4xNzIxODI2MzI3*_ga*NDgzNTE4MjA0LjE3MjE4MjYzMjc.*_ga_PBFHM7T8JB*MTcyMjEwMDI1OS44LjEuMTcyMjEwMTI2OC4wLjAuMA..#!/";
  return (
    <section className={styling.description}>
      <h2>
        {language === "fr"
          ? "Ladbrokes.be news, le site de l'actualité sportive et paris sportifs"
          : "Ladbrokes.be news, dé website voor sportweddenschappen"}
      </h2>
      {language === "fr" ? (
        <>
          <p>
            Bienvenue sur Ladbrokes.be News, notre site d’actualité sportive et
            <a href={link}> paris sportifs </a>– votre source incontournable
            pour tout ce qui touche au monde passionnant du sport et des{" "}
            <a href={link}>paris en ligne </a>! Que vous soyez un amateur de
            sport, un parieur averti ou simplement curieux des dernières
            nouvelles sportives, nous sommes là pour vous tenir informés,
            divertis et bien plus encore
          </p>
          <p>
            Plongez dans un océan d’articles riches en contenu, couvrant les
            <a href={link}> derniers événements sportifs</a>, les résultats en
            direct, les analyses approfondies, et les entrevues exclusives avec
            les athlètes et les experts du domaine. Notre équipe de rédacteurs
            passionnés est dévouée à vous fournir des informations pertinentes
            et actualisées, vous permettant de rester connecté avec l’actualité
            sportive du monde entier.
          </p>

          <p>
            {" "}
            En matière de <a href={link}>paris sportifs</a>, nous vous offrons
            une expérience unique en son genre. Que vous soyez un débutant ou un
            parieur chevronné, notre section dédiée aux paris sportifs vous
            propose des conseils avisés, des prédictions éclairées et des
            astuces pour améliorer vos chances de réussite. Nous couvrons une
            vaste gamme de sports, des plus populaires aux plus nichés, pour que
            vous puissiez parier sur vos équipes préférées avec confiance et
            stratégie.
          </p>

          <p>
            Notre site est conçu pour être convivial et accessible, avec une
            navigation fluide et une interface intuitive. Vous pouvez facilement
            parcourir les actualités, trouver les informations dont vous avez
            besoin et <a href={link}> placer vos paris </a> en quelques clics
            seulement.
          </p>

          <p>
            En nous rejoignant, vous rejoignez une communauté de passionnés de
            sport et de paris qui partagent les mêmes intérêts que vous.
            Discutez des dernières rencontres, échangez des pronostics avec
            d’autres membres, et profitez d’une expérience sociale unique autour
            du sport
          </p>

          <p>
            Que vous cherchiez à rester à la pointe de l’actualité sportive ou à
            améliorer vos compétences de parieur, notre site d’actualité
            sportive et <a href={link}>paris sportifs</a> est votre destination
            ultime. Rejoignez-nous dès maintenant pour une expérience immersive,
            informative et divertissante qui vous fera vivre le sport comme
            jamais auparavant.
          </p>
        </>
      ) : (
        <>
          <p>
            {" "}
            Welkom bij Ladbrokes.be News, onze nieuwssite voor sport en
            sportweddenschappen. Dit is jouw bron voor alles wat te maken heeft
            met de spannende wereld van online sport en sportweddenschappen! Of
            je nu een sportfanaat bent, een ervaren gokker of gewoon
            nieuwsgierig naar het laatste sportnieuws, wij zijn er om je te
            informeren en te vermaken.
          </p>
          <p>
            {" "}
            Duik in een zee van inhoudelijke artikels over de laatste
            sportevenementen, live uitslagen, diepgaande analyses en exclusieve
            interviews met atleten en experts op dit gebied. Ons team van
            gepassioneerde redacteurs is er alles aan gelegen om je te voorzien
            van relevante- en actuele informatie, zodat je op de hoogte blijft
            van sportnieuws uit de hele wereld.
          </p>
          <p>
            Op het gebied van <a href={link}> sportweddenschappen</a> bieden wij
            een unieke ervaring. Of je nu een beginner bent of een
            doorgewinterde gokker, onze speciale sectie over sportweddenschappen
            biedt deskundig advies, voorspellingen en tips om je kansen op
            succes te verbeteren. We dekken een breed scala aan sporten, van de
            <a href="https://news.ladbrokes.be/nl/category/voetbal-nl/">
              {" "}
              populairste{" "}
            </a>
            tot de
            <a href="https://news.ladbrokes.be/nl/category/andere-sporten/">
              {" "}
              meest niche sporten
            </a>
            , zodat je met vertrouwen en strategie kunt genieten van
            sportweddenschappen op je favoriete teams- en sporten.{" "}
          </p>
          <p>
            Onze site is gebruiksvriendelijk en toegankelijk ontworpen, met een
            soepele navigatie en een intuïtieve interface. Je kunt gemakkelijk
            door het nieuws bladeren, de informatie vinden die je nodig hebt en
            je sportweddenschappen plaatsen in slechts een paar klikken.
          </p>
          <p>
            Of je nu op de hoogte wilt blijven van het sportnieuws of je
            wedvaardigheden wilt verbeteren, onze site voor sportnieuws en
            sportweddenschappen is je ultieme bestemming. Sluit je nu bij ons
            aan voor een meeslepende, informatieve en vermakelijke ervaring die
            je sport en sportweddenschappen als nooit tevoren laat beleven.{" "}
          </p>
        </>
      )}
    </section>
  );
}
