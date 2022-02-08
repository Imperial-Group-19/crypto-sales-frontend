import React from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MerchantHeader from "../components/MerchantHeader";


export default function Stores() {
    const stores = useSelector((state) => state.merchant.user.stores);
    const dispatch = useDispatch();

    return (
        <>
            <MerchantHeader button="Logout" link="/logout" />
            <Container>
                {stores.map(store => (
                    <Card key={store.id}>
                        <Card.Body>
                            <Card.Title>{store.name}</Card.Title>
                            <Card.Text>
                                With supporting text below as a natural lead-in to additional content.
                            </Card.Text>
                            <Link to={"/merchant/" + store.id} ><Button variant="primary" className="m-2">View Analytics</Button></Link>
                            <Link to={"/merchant/" + store.id + "/products"} ><Button variant="primary" className="m-2">View Products</Button></Link>
                        </Card.Body>
                    </Card>
                ))}
            </Container>

            
            
        </>
    );
};