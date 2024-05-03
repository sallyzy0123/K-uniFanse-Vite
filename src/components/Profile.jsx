import { useContext } from "react";
import PurpleButton from "./PurpleButton";
import { MainContext } from "../contexts/MainContext";
import { Link, useNavigate } from "react-router-dom";

export default function Profile () {
    const { setIsLoggedIn } = useContext(MainContext);
    const navigate = useNavigate();

    const handleDeleteAccount = async () => {
        console.log("delete account");
    };

    const handleLogout = async () => {
        console.log("logout");
        await localStorage.removeItem("userToken");
        setIsLoggedIn(false);
        navigate("/login"); 
    };

    return (
        <div className="profile-page">
            <PurpleButton text="log out" type="button" onClick={handleLogout} />
            <Link to="/newMerchandise" className="purple-button">Add Merchandise</Link>
            <PurpleButton text="delete My Account" type="button" onClick={handleDeleteAccount} />
        </div>
    )
};