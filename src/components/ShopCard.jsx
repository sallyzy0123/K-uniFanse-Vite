import React from "react";
import { Card} from "react-bootstrap";
import { image_url } from "../variables/variables";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import { Link } from "react-router-dom";
import '../css/ShopCard.css';

export default function ShopCard() {
    const { merchandises } = useContext(MainContext);

    return (
        <div className="shop-container d-flex flex-row gap-5 flex-wrap justify-content-around pt-3">
            {merchandises.map((merchandise) => (
                <div key={merchandise.id} className="col-lg-2 col-md-4 col-sm-3">
                <Card className="border-0 rounded-5 shadow-sm">
                    <Card.Title className="px-4 pt-2">
                        {merchandise.merchandise_name}
                    </Card.Title>
                    <Link to={`/shop/${merchandise.id}`}>
                        <Card.Img
                            src={`${image_url}/${merchandise.filename}`}
                            alt={merchandise.merchandise_name}
                            className="px-4 aspect-ratio-box"
                            fluid="true"
                        />
                    </Link>
                    <Card.Body className="d-flex justify-content-between p-4">
                        <Card.Text>€{merchandise.price}</Card.Text>
                        <Card.Text>{merchandise.location.coordinates}</Card.Text>
                    </Card.Body>
                </Card>
                </div>
            ))}
        </div>
    )
};