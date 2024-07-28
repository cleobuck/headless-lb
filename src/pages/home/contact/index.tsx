import React from "react";
import getServerSideProps from "@/lib/ContactPageData";
import { ContactPageTypes } from "@/types/ContactTypes";
import ContactComponent from "@/components/contact-component/ContactComponent";
export { getServerSideProps };

export default function Contact(data: ContactPageTypes) {
  return <ContactComponent {...data} />;
}
