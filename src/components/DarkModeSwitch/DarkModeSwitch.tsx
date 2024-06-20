import React, { useEffect, useState } from "react";
import styles from "./DarkModeSwitch.module.less";

import Circle from "@/assets/images/icons/solid/circle.svg";
import Sun from "@/assets/images/icons/solid/sun.svg";

import Moon from "@/assets/images/icons/solid/moon.svg";

const DarkModeSwitch = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("lb-mode") === "dark";
    setDarkMode(savedDarkMode);

    if (savedDarkMode) {
      document.body.classList.add("bodyDarkMode");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((darkMode) => !darkMode);
    localStorage.setItem("lb-mode", darkMode ? "light" : "dark");
    document.body.classList.toggle("bodyDarkMode");
  };

  return (
    <div
      className={`${styles.darkModeSwitch} ${
        darkMode ? styles.darkModeOn : ""
      }`}
      onClick={toggleDarkMode}
    >
      {darkMode ? (
        <div id="nightIcons" className={styles.icons}>
          <Circle />
          <Moon className={styles.faMoon} />
        </div>
      ) : (
        <div id="dayIcons" className={styles.icons}>
          <Sun />
          <Circle />
        </div>
      )}
    </div>
  );
};

export default DarkModeSwitch;
