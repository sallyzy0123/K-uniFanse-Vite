import React from "react";
import { useContext, useState } from "react";
import PurpleButton from "./PurpleButton";
import { MainContext } from "../contexts/MainContext";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/ApiHooks";
import MyModal from "./MyModal";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

export default function Profile () {
    const { setIsLoggedIn } = useContext(MainContext);
    const navigate = useNavigate();
    const { deleteUser } = useUser();
    const [showModal, setShowModal] = useState(false);

    const handleDeleteAccount = async () => {
        console.log("delete account");
        try {
            const userResponse = await deleteUser();
            console.log("userResponse:", userResponse);
            if (userResponse.message === "User deleted") {
                await localStorage.removeItem("userToken");
                setIsLoggedIn(false);
                navigate("/login");
            }
        } catch (error) {
            console.error("deleteUser: ", error);
        }
    };

    const handleLogout = async () => {
        console.log("logout");
        await localStorage.removeItem("userToken");
        setIsLoggedIn(false);
        setShowModal(true);
        setTimeout(() => {
            navigate("/login"); 
        }, 1000);
    };

    return (
        <Container fluid
            className="d-flex flex-row justify-content-around align-items-center fw-bold my-5"
        >
            <Col md={8} lg={8}
                className="bg-light text-black p-5 rounded-5"
            >
                <Link to="/home/profile/edit">Edit Account</Link>
                <PurpleButton text="log out" type="button" onClick={handleLogout} />
                <Link to="/home/newMerchandise" className="purple-button">Add Merchandise</Link>
                <PurpleButton text="delete My Account" type="button" onClick={handleDeleteAccount} />
                {showModal && <MyModal text="Log out!" />}
            </Col>
        </Container>
    )
};