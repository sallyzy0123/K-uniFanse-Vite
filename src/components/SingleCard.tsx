import React from "react";
import { Col, Card } from "react-bootstrap";
import { image_url } from "../variables/variables";
import '../css/ShopCard.css';
import PurpleButton from "./PurpleButton";
import { useMerchandise, useUser } from "../hooks/ApiHooks";
import { useNavigate, useLoaderData, Params } from "react-router-dom";
import {useContext, useState, useEffect} from "react";
import {MainContext} from "../contexts/MainContext";
import MyModal from "./MyModal";
import {useChat} from "../hooks/chatHooks";

export type LoaderData = {
    merchandise: Merchandise;
}

export async function loader({ params }: { params: Params }): Promise<LoaderData> {
  const id = params.id ?? "";
  const {getMerchandise} = useMerchandise();
  const merchandise = await getMerchandise(id);
  return { merchandise };
}

const SingleCard: React.FC = () => {
const { merchandise } = useLoaderData() as LoaderData;
  const {user} = useContext(MainContext);
  const [isOwnPost, setIsOwnPost] = useState(false);
//   console.log('merchandise owner:', merchandise.owner.id);
//   console.log('logged in user:', user?.id);
  const {deleteMerchandise} = useMerchandise();
  const [showModal, setShowModal] = useState(false);
  const [showEditFailModal, setShowEditFailModal] = useState(false);
  const navigate = useNavigate();
  const { checkToken } = useUser();
  const { createChatRoom } = useChat();

  const handleNaviChatRoom = async () => {
    try {
        const chatResponse = await createChatRoom((user as User).id, merchandise.owner.id);
        if (chatResponse._id) {
            const chatId = chatResponse._id;
            navigate(`/home/shop/message/${chatId}`);
        }
    } catch (error) {
        console.error("createChatRoom failed: ", error);
    };
  };

  const handleEditMerch = async () => {
    try {
        const userResponse = await checkToken();
        if (userResponse.message === "Token is valid") {
            navigate(`/K-uniFanse-Vite/home/shop/${merchandise.id}/edit`);
        } else {
            setShowEditFailModal(true);
        }
    } catch (error) {
        console.error("checkToken failed: ", error);
    };
  };

  const handleDeleteMerch = async () => {
    try {
        const deleteResponse = await deleteMerchandise(merchandise.id);
        if (deleteResponse.message === "Merchandise deleted") {
            setShowModal(true);
        
            setTimeout(() => {
                setShowModal(false);
                navigate('/K-uniFanse-Vite/home/shop');
            }, 1000);
        }
    } catch (error) {
        console.error("deleteMerch failed: ", error);
    }
  };

  useEffect(() => {
    if (user && merchandise.owner.id === user.id) {
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
                        // fluid="true"
                    />
                    <Card.Text className="px-4">€{merchandise.price}</Card.Text>
                    <Card.Text className="px-4">{merchandise.description}</Card.Text>
                    <div className="px-4 pb-4 d-flex justify-content-end">
                        {isOwnPost ? (
                            <>
                                <PurpleButton text="Edit" onClick={handleEditMerch} />
                                <PurpleButton text="delete" onClick={handleDeleteMerch}/>
                            </>
                        ) : (
                            <PurpleButton text="Send a message" onClick={handleNaviChatRoom}/>
                        )}
                        
                    </div>
                </Card>
            </Col>
            {showModal && <MyModal text="Merchandise deleted." />}
            {showEditFailModal && <MyModal text="You can't edit this merchandise." />}
        </div>
    )
};

export default SingleCard;