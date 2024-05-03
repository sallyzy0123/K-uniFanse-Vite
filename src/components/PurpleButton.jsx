import Button from "react-bootstrap/Button";
import "../css/PurpleButton.css";

function PurpleButton({ text, type, onClick }) {
  return (
    <Button bsPrefix="btn-purple" type={type} onClick={onClick}>
      {text}
    </Button>
  );
}

export default PurpleButton;
