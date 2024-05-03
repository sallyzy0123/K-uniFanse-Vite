import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import {Outlet} from "react-router-dom";

export default function Auth () {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
        }, 1000); // 1 seconds
    };

    return (
        <Container fluid
            className="d-flex flex-row justify-content-around align-items-center fw-bold mt-5"
        >
            <Col md={5} lg={5} className="text-white p-5 rounded-5">
                <h1>K-uniFanse</h1>
                <h1 className="mt-5">
                    Connect with <br />
                    your K-pop peers!
                </h1>
            </Col>
            <Col md={5} lg={5} className="bg-light text-black p-5 rounded-5">
                <Outlet />
            </Col>
        </Container>
    );
};