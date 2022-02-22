import React from "react";
import {Helmet} from "react-helmet";
import Header from "../components/Header";
import Headline from "../components/Headline";

export default function Product() {
    return (
        <>
            <Helmet>
                <title>Landing Page - all products</title>
                <meta name="description" content="Product" />
            </Helmet>
            <Header />
            <Headline />
            
            {/* <Footer /> */}
            
        </>
    );
};