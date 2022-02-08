import React from "react";
import { useParams } from 'react-router-dom';

export default function MerchantDashboard() {
    const params = useParams();
    return (
        <>
            <h1>Dashboard for Shop {params.shopId}</h1>
            <ul>
                
            </ul>
        </>
    )
}