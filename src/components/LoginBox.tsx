import React from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PurpleButton from "./PurpleButton";
import { useContext, useState } from "react";
import { useAuthentication } from "../hooks/ApiHooks";
import { MainContext } from "../contexts/MainContext";
import MyModal from "./MyModal";

export type LoginData = {
  credentials: {
    username: string;
    password: string;
  }
}

function LoginBox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { postLogin } = useAuthentication();
  const { setIsLoggedIn, setUser } = useContext(MainContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userCredentials: LoginData = {
        credentials: {
          username: email,
          password: password,
        },
      };
      const loginResponse = await postLogin(userCredentials);
      const loginToken = loginResponse.token;

      await localStorage.setItem("userToken", loginToken);
      setUser(loginResponse.user);
      setIsLoggedIn(true);
      setShowModal(true);
      setTimeout(() => {
        navigate("/home/shop");
      }, 1000);
      console.log("Login successful:", loginResponse);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Form className="text-center" onSubmit={handleSubmit}>
      <h2 className="mb-4">Login</h2>
      <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-5 text-start" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <PurpleButton text="Login" type="submit" />
      </Form.Group>
      <Form.Group>
        <Form.Text className="d-inline-flex align-items-center">
          No account yet? &nbsp;
          <Link
            to="/register"
            className="text-decoration-none text-purple fw-bold"
          >
            Register
          </Link>
          &nbsp; here.
        </Form.Text>
      </Form.Group>
      {showModal && <MyModal text="Login successfully!" />}
    </Form>
    
  );
}
export default LoginBox;
