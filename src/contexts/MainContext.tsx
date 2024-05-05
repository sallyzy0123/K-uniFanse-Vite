import React, { useState, useEffect } from "react";
import { useMerchandise } from "../hooks/ApiHooks";

type MainContextType = {
  isLoggedIn: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  setIsLoggedIn: (value: boolean) => void;
  merchandises: Merchandise[];
  fetchMerchandises: () => void;
}

const defaultContext: MainContextType = {
  isLoggedIn: false,
  user: null,
  setUser: () => {},
  setIsLoggedIn: () => {},
  merchandises: [],
  fetchMerchandises: () => {},
};


const MainContext = React.createContext(defaultContext);

const MainProvider = (props: React.PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { getMerchandises } = useMerchandise();
  const [merchandises, setMerchandises] = useState<Merchandise[]>([]);

  const fetchMerchandises = async () => {
    try {
      const merchandisesResponse = await getMerchandises();
      console.log("Merchandises in MainContext: ", merchandisesResponse);
      if (!merchandisesResponse) {
        return ;
      }
      setMerchandises(merchandisesResponse);
    } catch (error) {
      console.log("fetchMerchandises error: ", error);
    }
  };

  useEffect(() => {
    fetchMerchandises();
  }, []);

  const value: MainContextType = {
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
