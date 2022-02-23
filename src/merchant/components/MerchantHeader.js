import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import { Container, Navbar, Button } from "react-bootstrap";

import { useWeb3Context } from "../features/Web3Context";


export default function MerchantHeader(props) {

    const { handleDisconnectWallet } = useWeb3Context();

    return (
        <Container fluid>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand href="landing">Crypto Sales Funnel</Navbar.Brand>
                    <Button variant="outline-secondary" onClick={handleDisconnectWallet}>{props.button}</Button>
                </Container>
            </Navbar>
        </Container>

    )
}