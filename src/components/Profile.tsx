import React, {useEffect} from "react";
import { useContext, useState } from "react";
import PurpleButton from "./PurpleButton";
import { MainContext } from "../contexts/MainContext";
import { useNavigate, Link } from "react-router-dom";
import { useUser, useMerchandise } from "../hooks/ApiHooks";
import MyModal from "./MyModal";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import {Row} from "react-bootstrap";
import { Card} from "react-bootstrap";
import { image_url } from "../variables/variables";

export default function Profile () {
    const { setIsLoggedIn, user } = useContext(MainContext);
    const navigate = useNavigate();
    const { deleteUser } = useUser();
    const [showModal, setShowModal] = useState(false);
    const { getMerchandisesByUser } = useMerchandise();
    const [ownerMerch, setOwnerMerch] = useState<Merchandise[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMerchByOwner = async () => {
        try {
            const merchResponse = await getMerchandisesByUser();
            console.log("merchResponse:", merchResponse);
            setOwnerMerch(merchResponse);
        } catch (error) {
            console.error("fetchMerchByOwner: ", error);
        }  finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMerchByOwner();
    }, []);

    const handleAddNewMerch = () => {
        navigate("/K-uniFanse-Vite/home/newMerchandise")
    };

    const handleEditAccount = () => {
        navigate("/K-uniFanse-Vite/home/profile/edit");
    };

    const handleDeleteAccount = async () => {
        console.log("delete account");
        try {
            const userResponse = await deleteUser();
            console.log("userResponse:", userResponse);
            if (userResponse.message === "User deleted") {
                await localStorage.removeItem("userToken");
                setIsLoggedIn(false);
                navigate("/K-uniFanse-Vite/");
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
            navigate("/K-uniFanse-Vite/"); 
        }, 1000);
    };

    return (
        <Container
            className="lg-8 md-8 sm-8 d-flex flex-row justify-content-around align-items-center fw-bold my-5 "
        >
            <Row className="bg-light text-black p-5 rounded-5 gap-3">
                <Col className="d-flex justify-content-between gap-5">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            className="bi bi-person-circle"
                            viewBox="0 0 16 16"
                        >
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path
                                fillRule="evenodd"
                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                            />
                        </svg>
                        <span className="fs-5">{" "}{user?.user_name}</span>
                    </div>
                    <Col className="d-flex justify-content-around gap-2" md={5} lg={5}>
                        <PurpleButton text="Edit Account" type="button" onClick={handleEditAccount} />
                        <PurpleButton text="delete Account" type="button" onClick={handleDeleteAccount} />
                    </Col>
                </Col>
                <Row>
                    <Col className="d-flex justify-content-between gap-5">
                        <PurpleButton text="Add new merchandise" type="button" onClick={handleAddNewMerch}/>
                        <PurpleButton text="log out" type="button" onClick={handleLogout} />
                    </Col>
                </Row>
                <hr style={{ backgroundColor: "black", height: 5 }}/>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                <Row>
                    {ownerMerch.map((merch) => (
                        <div key={merch.id} className="col-lg-2 col-md-4 col-sm-3">
                            <Link to={`/K-uniFanse-Vite/home/shop/${merch.id}`}>
                            <Card className="border-0 rounded-5 shadow-sm">
                                <Card.Title className="px-4 pt-2">
                                    {merch.merchandise_name}
                                </Card.Title>
                                
                                    <Card.Img
                                        src={`${image_url}/${merch.filename}`}
                                        alt={merch.merchandise_name}
                                        className="px-4 aspect-ratio-box"
                                        // fluid="true"
                                    />
                                
                                <Card.Body className="d-flex justify-content-between p-4">
                                    <Card.Text>€{merch.price}</Card.Text>
                                </Card.Body>
                            </Card>
                            </Link>
                        </div>
                    ))}
                </Row>
                )}
                
            </Row>
            {showModal && <MyModal text="Log out!" />}
        </Container>
    )
};