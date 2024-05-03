import { getAllCategoriesQuery } from "../queries/categoryQuery";
import { api_url } from "../variables/variables";
import {
  loginMutation,
  registerMutation,
  deleteUserMutation,
} from "../queries/userQuery";
import {
  MerchandisesQuery,
  addMerchandiseQuery,
  MerchandiseQuery,
} from "../queries/merchandiseQuery";

const doGraphQLFetch = async (url, query, variables, includeToken) => {
  let headers = {
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
    throw new Error(error.message);
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

  const getMerchandise = async (id) => {
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

  const postMerchandise = async (merchandise) => {
    console.log("merchandise:", merchandise);
    try {
      const merchandiseResponse = await doGraphQLFetch(
        api_url,
        addMerchandiseQuery,
        merchandise,
        true
      );
      // console.log("merchandiseResponse:", merchandiseResponse);
      return merchandiseResponse.addMerchandise;
    } catch (error) {
      console.error("postMerchandise: ", error);
    }
  };
  return { getMerchandises, getMerchandise, postMerchandise };
};

const useUser = () => {
  const postUser = async (userCredentials) => {
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
      console.error("postUser: ", error);
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
      console.log("userResponse:", userResponse.deleteUser);
      return userResponse.deleteUser;
    } catch (error) {
      console.error("deleteUser: ", error);
    }
  };

  return { postUser, deleteUser };
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
      return categoriesResponse.categories;
    } catch (error) {
      console.error("getCateogories failed", error);
    }
    return null;
  };

  return { getCategories };
};

const useAuthentication = () => {
  const postLogin = async (userCredentials) => {
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