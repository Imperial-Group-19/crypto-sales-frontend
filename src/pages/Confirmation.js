import React from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import ThankYou from "../components/ThankYou";
import { useSelector } from "react-redux";

export default function Confirmation() {
  const products = useSelector((state) => state.shop.addedProducts);

  return (
    <>
      <Helmet>
        <title>Confirmation - successful payment</title>
        <p>Click here to download your product: {products[0].productLink} </p>
        <meta name="description" content="Your payment has been successful." />
      </Helmet>
      <Header />
      <ThankYou />
      {/* <Footer /> */}
    </>
  );
}
