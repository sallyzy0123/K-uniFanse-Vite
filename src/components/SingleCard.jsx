import { Col, Card } from "react-bootstrap";
import { image_url } from "../variables/variables";
import '../css/ShopCard.css';
import PurpleButton from "./PurpleButton";
import { useMerchandise } from "../hooks/ApiHooks";
import { useLoaderData, Link } from "react-router-dom";
import {useContext, useState, useEffect} from "react";
import {MainContext} from "../contexts/MainContext";

export async function loader({params}) {
  const {getMerchandise} = useMerchandise();
  const merchandise = await getMerchandise(params.id);
  return { merchandise };
}

export default function SingleCard() {
  const {merchandise} = useLoaderData();
  const {user} = useContext(MainContext);
  const [isOwnPost, setIsOwnPost] = useState(false);
  console.log('merchandise owner:', merchandise.owner.id);
  console.log('logged in user:', user.id);

  useEffect(() => {
    if (merchandise.owner.id === user.id) {
      setIsOwnPost(true);
    }
  }, [])
    
    return (
        <div className="single-card-container d-flex flex-row gap-5 flex-wrap justify-content-around pt-3">
            <Col className="col-lg-6 col-md-6 col-sm-6">
                <Card className="border-0 rounded-5 shadow-sm">
                    <div className="d-flex justify-content-between">
                        <Card.Title className="px-4 pt-4 fs-2">
                            {merchandise.merchandise_name}
                        </Card.Title>
                        <Card.Title className="px-4 pt-4 fs-2">
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
                            {merchandise.owner.user_name}
                        </Card.Title>
                    </div>
                    <Card.Img
                        src={`${image_url}/${merchandise.filename}`}
                        alt={merchandise.merchandise_name}
                        className="px-4 pb-3 aspect-ratio-box"
                        fluid="true"
                    />
                    <Card.Text className="px-4">€{merchandise.price}</Card.Text>
                    <Card.Text className="px-4">{merchandise.description}</Card.Text>
                    <div className="px-4 pb-4 d-flex justify-content-end">
                        {/* {isOwnPost ? ( */}
                        <Link to={`/home/shop/${merchandise.id}/edit`}>
                            Edit
                        </Link>
                        {/* ) : ( */}
                            <PurpleButton text="Send a message"/>
                        {/* )} */}
                        
                    </div>
                </Card>
            </Col>
        </div>
    )
};