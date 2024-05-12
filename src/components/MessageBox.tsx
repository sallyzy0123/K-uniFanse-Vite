import React, {useEffect, useState, useContext} from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import {useUser} from "../hooks/ApiHooks";
import { Row, Form, Button } from "react-bootstrap";
import {useChat, useMessage} from "../hooks/chatHooks";
import {MainContext} from "../contexts/MainContext";
import '../css/Message.css';
import moment from 'moment';
import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from '../types/Socket';


function MessageBox () {
    const {chatId} = useParams();
    const {getUserById} = useUser();
    console.log("chatId in MessageBox: ", chatId);
    const [owner, setOwner] = useState<User | null>(null);
    const {getMessagesByChatId, createMessage} = useMessage();
    const {getChatRoomById} = useChat();
    const {user} = useContext(MainContext);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
            import.meta.env.VITE_SOCKET_URL
        );

        return () => {
            socket.disconnect();
        };
    }, [messages]);
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!user) {
                console.error("User not authenticated");
                return;
            }

            const messageData: MessageInput = {
                chatId: chatId as string,
                senderId: user.id,
                text: newMessage,
                timestamp: new Date(),
            };

            await createMessage(messageData); // Call the function to send the message
            // Clear the input field after sending the message
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const fetchUserById = async (ownerId: string): Promise<User | null> => {
        try {
            const owner: User = await getUserById(ownerId);
            console.log("data in fetchUserById: ", owner);
            return owner;
        } catch (error) {
            console.error("fetchUserById error: ", error);
            return null;
        };
    };

    const fetchReceiver = async () => {
        try {
            const chatRoom = await getChatRoomById(chatId as string);

            if (user) {
                const currentUser = user.id;
                const receiverId = chatRoom.members.filter((member: string) => 
                    member !== currentUser
                )[0];
                const ownerData = await fetchUserById(receiverId);
                setOwner(ownerData);
            }
        } catch (error) {
            console.error("fetchReceiver error: ", error);
        };
    };

    const fetchHistory = async () => {
        try {
            const messages = await getMessagesByChatId(chatId as string);
            console.log("messages in fetchHistory: ", messages);
            if (!messages) {
                return;
            }
            setMessages(messages);
        } catch (error) {
            console.error("fetchHistory error: ", error);
        }
    };


    useEffect(() => {
        fetchReceiver();
        fetchHistory();
    }, [newMessage])

    return (
        <Container fluid className="d-flex flex-row justify-content-around align-items-center fw-bold my-5">
            <Col md={8} lg={8} className="bg-light text-black p-5 rounded-5">
                {owner ? (
                    <>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            className="bi bi-person-circle me-2"
                            viewBox="0 0 16 16"
                        >
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path
                                fillRule="evenodd"
                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                            />
                        </svg>
                        <span>{owner.user_name}</span>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
                <hr style={{ backgroundColor: "black", height: 5 }}/>
                <Row className="gap-3 p-3">
                    {messages.map((message) => (
                        <Row
                            className={`row-lg-auto rounded-5 ${
                                message.senderId === user?.id ? "text-end align-items-center message-right" : "message-left"
                            }`}
                            key={message.id}
                        >
                            <p className="m-auto">{message.text}</p>
                            <span>{moment(message.createdAt).calendar()}</span>
                        </Row>
                    ))}
                </Row>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicMessage">
                    <Form.Control
                      type="text"
                      placeholder="Enter your message"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Send
                  </Button>
                </Form>
            </Col>
        </Container>
    )
};

export default MessageBox;