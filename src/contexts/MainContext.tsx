import React, { useState, useEffect } from "react";
import { useMerchandise, useUser } from "../hooks/ApiHooks";

type MainContextType = {
  isLoggedIn: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  setIsLoggedIn: (value: boolean) => void;
  merchandises: Merchandise[];
  fetchMerchandises: () => void;
  saveToken: (key: string | null) => void;
}

const defaultContext: MainContextType = {
  isLoggedIn: false,
  user: null,
  setUser: () => {},
  setIsLoggedIn: () => {},
  merchandises: [],
  fetchMerchandises: () => {},
  saveToken: () => {},
};


const MainContext = React.createContext(defaultContext);

const MainProvider = (props: React.PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { getMerchandises } = useMerchandise();
  const [merchandises, setMerchandises] = useState<Merchandise[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const { checkToken } = useUser();

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
    if (isLoggedIn) {
      fetchMerchandises();
    }
  }, [isLoggedIn, user]);

  const saveToken = async (token: string | null) => {
    if (!token) {
      await localStorage.removeItem('userToken');
      setToken(null);
      return;
    }
    await localStorage.setItem('userToken', token);
    setToken(token);
  };

  const getUserByToken = async () => {
    try {
      const userResponse = await checkToken();
      if (userResponse.message !== "Token is valid") {
        return;
      };
      return userResponse.user;
    } catch (error) {
      console.error("getUserByToken failed: ", error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('userToken');
    if (storedToken !== null) {
      setToken(storedToken);
      setIsLoggedIn(true);
      getUserByToken().then((user) => {
        setUser(user);
      })
    }
  }, []);

  useEffect(() => {
    setIsLoggedIn(token !== null);
  }, [token]);

  const value: MainContextType = {
    isLoggedIn,
    user,
    setUser,
    setIsLoggedIn,
    merchandises,
    fetchMerchandises,
    saveToken,
  };

  return (
    <MainContext.Provider value={value}>{props.children}</MainContext.Provider>
  );
};

export { MainContext, MainProvider };
