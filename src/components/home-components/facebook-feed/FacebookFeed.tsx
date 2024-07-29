import React from "react";

type Props = { facebookFeed: string };

export default function FacebookFeed({ facebookFeed }: Props) {
  return (
    <div
      className="facebook-feed"
      dangerouslySetInnerHTML={{ __html: facebookFeed }}
      suppressHydrationWarning
    />
  );
}
