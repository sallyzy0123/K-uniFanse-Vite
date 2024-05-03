import React, { useState, useEffect } from "react";
import { useMerchandise } from "../hooks/ApiHooks";

const MainContext = React.createContext();

const MainProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const { getMerchandises } = useMerchandise();
  const [merchandises, setMerchandises] = useState([]);

  const fetchMerchandises = async () => {
    try {
      const merchandisesResponse = await getMerchandises();
      console.log("Merchandises in MainContext: ", merchandisesResponse);
      setMerchandises(merchandisesResponse);
      return merchandises;
    } catch (error) {
      console.log("fetchMerchandises error: ", error);
    }
  };

  useEffect(() => {
    fetchMerchandises();
  }, []);

  const value = {
    isLoggedIn,
    user,
    setUser,
    setIsLoggedIn,
    merchandises,
    fetchMerchandises,
  };

  return (
    <MainContext.Provider value={value}>{props.children}</MainContext.Provider>
  );
};

export { MainContext, MainProvider };
