import { useEffect, useRef } from "react";
import { loadScript } from "@/lib/utils";
import { langType } from "@/types/generalTypes";
import { TopMatchWidget } from "./Trends.utils";
type Props = {
  language: langType;
};

export default function Trends({ language }: Props) {
  const topMatchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    new TopMatchWidget({
      language,
      targetElementId: topMatchContainerRef.current.id,
    });
  }, []);

  return <div id="top-match-container" ref={topMatchContainerRef}></div>;
}
