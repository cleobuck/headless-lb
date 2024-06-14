import { loadScript } from "@/lib/utils";
import { langType } from "@/types/generalTypes";
import React, { useEffect, useRef } from "react";

type Props = {
  language: langType;
};

export default function Trends({ language }: Props) {
  const topMatchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to dynamically load the external script
    const loadTopMatchWidgetScript = async () => {
      try {
        await loadScript("https://ccp.lmms.be/top-match/top-match.js");
        if (topMatchContainerRef.current) {
          // Initialize the TopMatchWidget after the script has loaded

          // @ts-ignore
          new TopMatchWidget({
            language,
            targetElementId: "top-match-container",
          });
        } else {
          console.error("Top-match-container is not rendered yet.");
        }
      } catch (error) {
        console.error("Failed to load the script", error);
      }
    };

    // Load the script only if the top-match-container is rendered
    if (topMatchContainerRef.current) {
      loadTopMatchWidgetScript();
    }
  }, [language]);

  return <div id="top-match-container" ref={topMatchContainerRef}></div>;
}
