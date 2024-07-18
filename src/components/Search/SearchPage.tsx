import React, { useEffect } from "react";

type Props = { searchResults: any };

export default function SearchPage({ searchResults }: Props) {
  console.log(searchResults);
  return <div>SearchPage</div>;
}
