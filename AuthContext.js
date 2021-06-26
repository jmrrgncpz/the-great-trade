import { createContext } from "react";

export const AuthContext = createContext();
export const methods = () => ({
  signIn: async (signInFn) => {
    dispatch({ type: "SET_LOADING", isLoading: true });

    try {
      const { token, type } = await signInFn();
      await SecureStore.setItemAsync("userToken", token);

      dispatch({ type: "SIGN_IN", token });
    } catch {
      // TODO: define a state to show a failed login modal
      console.log("Sign in failed");
    } finally {
      dispatch({ type: "SET_LOADING", isLoading: false });
    }
  },
  signOut: async () => {
    dispatch({ type: "SET_LOADING", isLoading: true });

    // set token null early
    // to transition page immediately
    // from secured page to landing
    dispatch({ type: "SIGN_OUT" });

    // keep loading til
    // signout from firebase
    // and remove token in localstorage is done
    Promise.all([signOut(), SecureStore.deleteItemAsync("userToken")]).then(
      () => dispatch({ type: "SET_LOADING", isLoading: false })
    );
  },
});
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
