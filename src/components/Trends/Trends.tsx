import { useEffect, useRef } from "react";
import { loadScript } from "@/lib/utils";
import { langType } from "@/types/generalTypes";

type Props = {
  language: langType;
};

export default function Trends({ language }: Props) {
  const topMatchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to dynamically load the external script
    const loadTopMatchWidgetScript = async () => {
      try {
        console.log("Loading script...");
        await loadScript("https://ccp.lmms.be/top-match/top-match.js");
        console.log("Script loaded");

        if (topMatchContainerRef.current) {
          console.log("Initializing TopMatchWidget...");
          // @ts-ignore
          if (typeof TopMatchWidget !== "undefined") {
            // @ts-ignore
            new TopMatchWidget({
              language,
              targetElementId: topMatchContainerRef.current.id,
            });
            console.log("TopMatchWidget initialized");
          } else {
            console.error("TopMatchWidget is not defined");
          }
        } else {
          console.error("Top-match-container is not rendered yet.");
        }
      } catch (error) {
        console.error("Failed to load the script", error);
      }
    };

    loadTopMatchWidgetScript();
  }, [language]);

  return <div id="top-match-container" ref={topMatchContainerRef}></div>;
}
