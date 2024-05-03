import { Col, Card } from "react-bootstrap";
import { image_url } from "../variables/variables";
import '../css/ShopCard.css';
import PurpleButton from "./PurpleButton";
import { useMerchandise } from "../hooks/ApiHooks";
import { useLoaderData } from "react-router-dom";

export async function loader({params}) {
  const {getMerchandise} = useMerchandise();
  const merchandise = await getMerchandise(params.id);
  return { merchandise };
}

export default function SingleCard() {
  const {merchandise} = useLoaderData();
    
    return (
        <div className="single-card-container d-flex flex-row gap-5 flex-wrap justify-content-around pt-3">
            <Col className="col-lg-6 col-md-6 col-sm-6">
                <Card className="border-0 rounded-5 shadow-sm">
                    <Card.Title className="px-4 pt-2">
                        {merchandise.merchandise_name}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 px-4">
                        @{merchandise.owner.user_name}
                    </Card.Subtitle>
                        <Card.Img
                            src={`${image_url}/${merchandise.filename}`}
                            alt={merchandise.merchandise_name}
                            className="px-4 pb-4 aspect-ratio-box"
                            fluid="true"
                        />
                        <Card.Text className="px-4">€{merchandise.price}</Card.Text>
                    <Card.Text className="px-4">{merchandise.description}</Card.Text>
                    <div className="px-4 pb-4">
                    <PurpleButton text="Send a message" />
                    </div>
                    
                </Card>
            </Col>
        </div>
    )
};