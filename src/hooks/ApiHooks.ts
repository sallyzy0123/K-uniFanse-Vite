import { getAllCategoriesQuery } from "../queries/categoryQuery";
import { api_url } from "../variables/variables";
import {
  loginMutation,
  registerMutation,
  deleteUserMutation,
  checkTokenQuery,
  updateUserMutation,
} from "../queries/userQuery";
import {
  MerchandisesQuery,
  addMerchandiseMutation,
  MerchandiseQuery,
  modifyMerchandiseMutation,
  DeleteMerchandiseMutation,
  MerchandisesByOwnerQuery,
} from "../queries/merchandiseQuery";
import {LoginData} from "../components/LoginBox";
import {RegisterData} from "../components/RegisterBox";
import {MerchandiseInput} from "../components/NewMerchandise";
import {UserData} from "../components/EditAccount";

const doGraphQLFetch = async (
  url: string, 
  query: string, 
  variables: object, 
  includeToken: boolean
) => {
  let headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (includeToken) {
    const token = localStorage.getItem("userToken");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.errors) {
      throw new Error(JSON.stringify(json.errors));
    }

    return json.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const useMerchandise = () => {
  const getMerchandises = async () => {
    try {
      const merchandisesResponse = await doGraphQLFetch(
        api_url,
        MerchandisesQuery,
        {},
        false
      );
      // console.log("response,", merchandisesResponse.merchandises);
      return merchandisesResponse.merchandises;
    } catch (error) {
      console.error("getMerchandises failed", error);
    }
  };

  const getMerchandise = async (id: string) => {
    try {
      const merchandiseResponse = await doGraphQLFetch(
        api_url,
        MerchandiseQuery,
        { merchandiseId: id },
        false
      );
      // console.log("response,", merchandiseResponse.merchandise);
      return merchandiseResponse.merchandise;
    } catch (error) {
      console.error("getMerchandise failed", error);
    }
  };

  const getMerchandisesByUser = async () => {
    try {
      const merchandiseResponse = await doGraphQLFetch(
        api_url,
        MerchandisesByOwnerQuery,
        {},
        true
      );
      // console.log("response,", merchandiseResponse.merchandisesByOwner);
      return merchandiseResponse.merchandisesByOwner;
    } catch (error) {
      console.error("getMerchandiseByUser failed", error);
    }
  };

  const postMerchandise = async (merchandise: MerchandiseInput) => {
    try {
      const merchandiseResponse = await doGraphQLFetch(
        api_url,
        addMerchandiseMutation,
        merchandise,
        true
      );
      // console.log("merchandiseResponse:", merchandiseResponse);
      return merchandiseResponse.addMerchandise;
    } catch (error) {
      console.error("postMerchandise failed: ", error);
    }
  };

  const updateMerchandise = async (
    id: string, 
    merchandise: Pick<Merchandise, 'merchandise_name' | 'description' | 'price' | 'category'>
  ) => {
    try {
      const merchandiseResponse = await doGraphQLFetch(
        api_url,
        modifyMerchandiseMutation,
        { modifyMerchandiseId: id, input: merchandise },
        true
      );
      // console.log("merchandiseResponse:", merchandiseResponse);
      return merchandiseResponse.modifyMerchandise;
    } catch (error) {
      console.error("updateMerchandise failed: ", error);
    }
  };

  const deleteMerchandise = async (id: string) => {
    try {
      const merchandiseResponse = await doGraphQLFetch(
        api_url,
        DeleteMerchandiseMutation,
        { deleteMerchandiseId: id },
        true
      );
      // console.log("merchandiseResponse:", merchandiseResponse);
      return merchandiseResponse.deleteMerchandise;
    } catch (error) {
      console.error("deleteMerchandise failed: ", error);
    }
  };

  return {
    getMerchandises,
    getMerchandise,
    getMerchandisesByUser,
    postMerchandise,
    updateMerchandise,
    deleteMerchandise,
  };
};

const useUser = () => {
  const postUser = async (userCredentials: RegisterData) => {
    try {
      const userResponse = await doGraphQLFetch(
        api_url,
        registerMutation,
        userCredentials,
        false
      );
      console.log("userResponse:", userResponse.register);
      return userResponse.register;
    } catch (error) {
      console.error("postUser error: ", error);
    }
  };

  const updateUser = async (userData: UserData) => {
    try {
      const userResponse = await doGraphQLFetch(
        api_url,
        updateUserMutation,
        userData,
        true
      );
      console.log("userResponse:", userResponse.updateUser);
      return userResponse.updateUser;
    } catch (error) {
      console.error("updateUser error: ", error);
    }
  };

  const deleteUser = async () => {
    try {
      const userResponse = await doGraphQLFetch(
        api_url,
        deleteUserMutation,
        {},
        true
      );
      // console.log("userResponse:", userResponse.deleteUser);
      return userResponse.deleteUser;
    } catch (error) {
      console.error("deleteUser: ", error);
    }
  };

  const checkToken = async () => {
    try {
      const userResponse = await doGraphQLFetch(
        api_url,
        checkTokenQuery,
        {},
        true
      );
      // console.log("userResponse:", userResponse.checkToken);
      return userResponse.checkToken;
    } catch (error) {
      console.error("checkToken: ", error);
    }
  };

  return { postUser, updateUser, deleteUser, checkToken };
};

const useCategory = () => {
  const getCategories = async () => {
    try {
      const categoriesResponse = await doGraphQLFetch(
        api_url,
        getAllCategoriesQuery,
        {},
        false
      );
      console.log("categoriesResponse:", categoriesResponse);
      return categoriesResponse.categories;
    } catch (error) {
      console.error("getCateogories failed", error);
    }
  };

  return { getCategories };
};

const useAuthentication = () => {
  const postLogin = async (userCredentials: LoginData) => {
    try {
      const loginResponse = await doGraphQLFetch(
        api_url,
        loginMutation,
        userCredentials,
        false
      );
      // console.log("loginResponse:", loginResponse);
      return loginResponse.login;
    } catch (error) {
      console.error("postLogin: ", error);
    }
  };

  return { postLogin };
};

export { useMerchandise, useUser, useCategory, useAuthentication };
