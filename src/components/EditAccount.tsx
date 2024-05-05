import React, {FormEvent, useContext} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useUser} from "../hooks/ApiHooks";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import MyModal from "./MyModal";
import { useNavigate } from "react-router-dom";
import {MainContext} from "../contexts/MainContext";

export type UserData = {
    user: {
      user_name: string;
    }
}

export default function EditAccount () {
  const [showModal, setShowModal] = useState(false);
  const {user} = useContext(MainContext);
  const { updateUser } = useUser();
  const [updatedUser, setUpdatedUser] = useState({
    user_name: "",
  })
//   const {merchandise} = useLoaderData() as LoaderData;
  const navigate = useNavigate();

  // post the merchandise via graphql sesrver to the database
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData: UserData = {
        user: {
            user_name: updatedUser.user_name,
        }
    };
    try {
        const response = await updateUser(userData);

        if (response.message === "User updated") {
            setShowModal(true);
        
            setTimeout(() => {
                setShowModal(false);
                navigate(`/home/profile`);
            }, 1000); 
        }
    } catch (error) {
        console.log("handleSubmit in EditAccount error: ", error);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Name changed:", e.target.value);
    setUpdatedUser({
      ...updatedUser,
      user_name: e.target.value,
    });
  };

  useEffect(() => {
    setUpdatedUser({
        user_name: (user as User).user_name,
    })
  }, [user])

    return (
      <Container fluid
        className="d-flex flex-row justify-content-around align-items-center fw-bold my-5"
      >
        <Col md={8} lg={8}
          className="bg-light text-black p-5 rounded-5"
        >
          <Form 
            className="text-center" onSubmit={handleSubmit}>
            <h2 className="mb-4">Edit your info</h2>
            <Form.Group className="mb-3 text-start"
              controlId="formBasicUsername"                  
            >
              <Form.Label>User name</Form.Label>
                <Form.Control
                  type="username"
                  placeholder="Enter username"
                  value={updatedUser.user_name}
                  onChange={handleNameChange}
                />
            </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              </Form>
            </Col>
            {showModal && <MyModal text="User info updated." />}
        </Container>
    )
};