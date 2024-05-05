import React from "react";
import Button from "react-bootstrap/Button";
import "../css/PurpleButton.css";

type PurpleButtonProps = {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

const PurpleButton: React.FC<PurpleButtonProps> = ({ text, type, onClick }) => {
  return (
    <Button bsPrefix="btn-purple" type={type} onClick={onClick}>
      {text}
    </Button>
  );
}

export default PurpleButton;
