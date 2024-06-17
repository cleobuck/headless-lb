import React, { useState } from "react";

type Props = { close: () => void };

import styling from "./Search.module.less";
import MagnifyingGlass from "@/assets/images/icons/solid/magnifying-glass.svg";
import Xmark from "@/assets/images/icons/solid/xmark.svg";

export default function Search({ close }: Props) {
  const [searchValue, setSearchValue] = useState("");
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
        <MagnifyingGlass
          onClick={() => console.log(` search for ${searchValue}`)}
          className={styling.icon}
        />
      </div>
    </div>
  );
}
