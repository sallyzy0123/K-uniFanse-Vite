import Modal from "react-bootstrap/Modal";

export default function MyModal({ text }) {
  return (
    <>
      <Modal show={true}>
        <Modal.Body>{text}</Modal.Body>
      </Modal>
    </>
  );
};
