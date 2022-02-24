import React from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import Headline from "../components/Headline";

export default function Landing() {
  return (
    <>
      <Helmet>
        <title>Landing Page - all products</title>
        <meta
          name="description"
          content="Shows a landing page for all the products in a specific store."
        />
      </Helmet>
      <Header />
      <Headline />
      {/* <Footer /> */}
    </>
  );
}
