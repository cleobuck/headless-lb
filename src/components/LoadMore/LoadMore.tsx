import React from "react";
import styles from "./LoadMore.module.less";

type Props = { onClick: () => void; language: string };

export default function LoadMore({ onClick, language }: Props) {
  return (
    <button onClick={onClick} className={styles.loadMore}>
      {language === "fr" ? "Voir plus" : "Zie meer"}
    </button>
  );
}
