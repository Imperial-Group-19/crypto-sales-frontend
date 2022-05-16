import React from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import ThankYou from "../components/ThankYou";

export default function Confirmation() {
  return (
    <>
      <Helmet>
        <title>Confirmation - successful payment</title>
        <meta name="description" content="Your payment has been successful." />
      </Helmet>
      <Header />
      <ThankYou />
      {/* <Footer /> */}
    </>
  );
}
