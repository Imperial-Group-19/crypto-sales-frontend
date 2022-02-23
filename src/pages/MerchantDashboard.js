import React from "react";
import {Helmet} from "react-helmet";
import { useParams } from 'react-router-dom';

export default function MerchantDashboard() {
    const params = useParams();
    return (
        <>
            <Helmet>
                <title>Merchant Dashboard - analytics</title>
                <meta name="description" content="Dashboard showing analytics to the merchant" />
            </Helmet>
            <h1>Dashboard for Shop {params.shopId}</h1>
            <ul>
                
            </ul>
        </>
    )
}