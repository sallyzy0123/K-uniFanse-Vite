import React from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PurpleButton from "./PurpleButton";
import { useUser } from "../hooks/ApiHooks";
import { useState } from "react";
import MyModal from "./MyModal";

export type RegisterData = {
  user: {
    user_name: string;
    email: string;
    password: string;
  }
}

function RegisterBox() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { postUser } = useUser();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userCredentials: RegisterData = {
        user: {
          user_name: username,
          email: email,
          password: password,
        },
      };
      const registerResponse = await postUser(userCredentials);
      if (registerResponse.message === "User added") {
        setShowModal(true);
        console.log("Register successful:", registerResponse);
        setTimeout(() => {
          setShowModal(false);
          navigate("/K-uniFanse-Vite/");
        }, 1000);

      }
      
      // return registerResponse;
    } catch (error) {
      console.error("Register failed:", error);
    }
  };

  return (
    <Form className="text-center" onSubmit={handleSubmit}>
      <h2 className="mb-4">Sign Up</h2>
      <Form.Group className="mb-3 text-start" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="username"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-4 text-start" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <PurpleButton text="Register" />
      </Form.Group>
      <Form.Group>
        <Form.Text className="d-inline-flex align-items-center">
          Have the account? &nbsp;
          <Link
            to="/K-uniFanse-Vite/"
            className="text-decoration-none text-purple fw-bold"
          >
            Login
          </Link>{" "}
          &nbsp; here.
        </Form.Text>
      </Form.Group>
      {showModal && <MyModal text="Register successfully!" />}
    </Form>
  );
}
export default RegisterBox;
