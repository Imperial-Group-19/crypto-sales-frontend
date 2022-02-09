import React from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MerchantHeader from "../components/MerchantHeader";


export default function Stores() {
    const stores = useSelector((state) => state.merchant.user.stores);
    const name = useSelector((state) => state.merchant.user.name);

    return (
        <>
            <MerchantHeader button="Logout" link="/logout" />
            <Container>
                <h1>Welcome, {name}</h1>
                <h2>My stores</h2>
                {stores.map(store => (
                    <Card key={store.id}>
                        <Card.Body>
                            <Card.Title>{store.name}</Card.Title>
                            <Card.Text>
                                {store.description}
                            </Card.Text>
                            <Link to={"/merchant/" + store.id} ><Button variant="primary" className="m-2">View Analytics</Button></Link>
                            <Link to={"/merchant/" + store.id + "/products"} ><Button variant="primary" className="m-2">View Products</Button></Link>
                        </Card.Body>
                    </Card>
                ))}
                <Card>
                    <Card.Body>
                        <Link to="/merchant/new-store"><Button variant="secondary">Add a new store</Button></Link>
                        
                    </Card.Body>
                </Card>
            </Container>

            
            
        </>
    );
};