import { createContext } from "react";

export const AuthContext = createContext();
export const authState = {
  isSignout: false,
  isLoading: true,
  userToken: null,
  user: null,
};

export const reducer = (prevState, action) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...prevState,
        userToken: action.token,
      };
    case "SIGN_IN":
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      };
    case "SET_LOADING":
      return {
        ...prevState,
        isLoading: action.isLoading,
      };
  }
};
