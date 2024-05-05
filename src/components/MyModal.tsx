import React from "react";
import Modal from "react-bootstrap/Modal";

type MyModalProps = {
  text: string;
};

const MyModal: React.FC<MyModalProps> = ({ text }) => {
  return (
    <>
      <Modal show={true}>
        <Modal.Body>{text}</Modal.Body>
      </Modal>
    </>
  );
};

export default MyModal;