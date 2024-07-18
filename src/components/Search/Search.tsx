import React, { useEffect, useRef, useState } from "react";

type Props = { close: () => void };

import styling from "./Search.module.less";
import MagnifyingGlass from "@/assets/images/icons/solid/magnifying-glass.svg";
import Xmark from "@/assets/images/icons/solid/xmark.svg";
import { useRouter } from "next/router";

export default function Search({ close }: Props) {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState("");

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const enterSearch = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (buttonRef?.current) buttonRef.current.click();
      }
    };

    window.addEventListener("keydown", enterSearch);

    return () => window.removeEventListener("keydown", enterSearch);
  }, []);
  return (
    <div className={styling.searchModal}>
      <Xmark className={styling.xMark} onClick={() => close()} />
      <div className={styling.inputWrapper}>
        <input
          type="text"
          placeholder="search"
          value={searchValue}
          className={styling.input}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <button
          ref={buttonRef}
          onClick={() => {
            router.push(`/?s=${searchValue} `);
          }}
        >
          <MagnifyingGlass className={styling.icon} />
        </button>
      </div>
    </div>
  );
}
