import React from "react";
import { Card} from "react-bootstrap";
import { image_url } from "../variables/variables";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import { Link } from "react-router-dom";
import '../css/ShopCard.css';
import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from '../types/Socket';

export default function ShopCard() {
    const { merchandises, fetchMerchandises } = useContext(MainContext);

    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
        import.meta.env.VITE_SOCKET_URL
    );

    socket.on("addMerchandise", (message) => {
        console.log("message: ", message);
        fetchMerchandises();
    });

    socket.on("modifyMerchandise", (message) => {
        console.log("message: ", message);
        fetchMerchandises();
    });

    socket.on("deleteMerchandise", (message) => {
        console.log("message: ", message);
        fetchMerchandises();
    });

    return (
        <div className="shop-container d-flex flex-row gap-5 flex-wrap justify-content-around pt-3">
            {merchandises.map((merchandise) => (
                <div key={merchandise.id} className="col-lg-2 col-md-4 col-sm-3">
                <Card className="border-0 rounded-5 shadow-sm">
                    <Card.Title className="px-4 pt-2">
                        {merchandise.merchandise_name}
                    </Card.Title>
                    <Link to={`/home/shop/${merchandise.id}`}>
                        <Card.Img
                            src={`${image_url}/${merchandise.filename}`}
                            alt={merchandise.merchandise_name}
                            className="px-4 aspect-ratio-box"
                            // fluid="true"
                        />
                    </Link>
                    <Card.Body className="d-flex justify-content-between p-4">
                        <Card.Text>€{merchandise.price}</Card.Text>
                    </Card.Body>
                </Card>
                </div>
            ))}
        </div>
    )
};