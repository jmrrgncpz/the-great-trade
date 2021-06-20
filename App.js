import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useMemo,
} from "react";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import * as Facebook from "expo-facebook";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import * as eva from "@eva-design/eva";
import { default as theme } from "./custom-theme.json";
import { default as mapping } from "./mapping.json";
import { registerIcons } from "./fontawesome";

// Main Pages
import Main from "./Main";
import CameraView from "./pages/Home/NewItem/NewItemImagesView/CameraView";
import NewImagePreviewView from "./pages/Home/NewItem/NewItemImagesView/NewImagePreviewView";

// Registration Pages
import Landing from "./pages/Registration/Landing";
import RegisterPhoneNumberView from "./pages/Registration/RegisterPhoneNumber";
import ConfirmPhoneNumberView from "./pages/Registration/ConfirmPhoneNumber";
export default function App() {
  const [fontsLoaded] = useFonts({
    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
    "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
  });
  const [isFBReady, setIsFBReady] = useState(false);

  useEffect(() => {
    registerIcons();
    Facebook.initializeAsync({
      appId: "1039613316566966",
      appName: "The Great Trade",
    }).then(() => {
      setIsFBReady(true);
    });
  }, []);

  const RegistrationStack = createStackNavigator();
  const MainStack = createStackNavigator();
  const AuthContext = React.createContext();
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "SIGN_IN":
          return {
            ...prevState,
            isSignedIn: true,
          };
      }
    },
    {
      isSignedIn: true,
    }
  );

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({ type: "SIGN_IN" });
      },
    }),
    []
  );

  if (!fontsLoaded || !isFBReady) {
    return <AppLoading />;
  }

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.light, ...theme }}
        customMapping={mapping}
      >
        {/* <AuthContext.Provider value={authContext}> */}
        <NavigationContainer>
          {state.isSignedIn ? (
            <MainStack.Navigator
              screenOptions={{ headerShown: false }}
              mode="modal"
            >
              <MainStack.Screen name="Main" component={Main} />
              {/* Modals */}
              <MainStack.Screen
                name="CameraView"
                component={CameraView}
                options={{
                  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                }}
              />
              <MainStack.Screen
                name="NewImagePreviewView"
                component={NewImagePreviewView}
                options={{
                  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                }}
              />
            </MainStack.Navigator>
          ) : (
            <RegistrationStack.Navigator
              screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            >
              <RegistrationStack.Screen name="Landing" component={Landing} />
              <RegistrationStack.Screen
                name="RegisterPhoneNumber"
                component={RegisterPhoneNumberView}
              />
              <RegistrationStack.Screen
                name="ConfirmPhoneNumber"
                component={ConfirmPhoneNumberView}
              />
            </RegistrationStack.Navigator>
          )}
        </NavigationContainer>
        {/* </AuthContext.Provider> */}
      </ApplicationProvider>
    </>
  );
}
