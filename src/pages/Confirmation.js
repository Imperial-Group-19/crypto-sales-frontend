import React from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import ThankYou from "../components/ThankYou";

import { useSelector } from "react-redux";

export default function Confirmation() {
  const mainProduct = useSelector((state) =>
    state.shop.products.find((product) => product.productType === 0)
  );
  const storeId = mainProduct.storeAddress;

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
