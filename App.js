import React, {
  useState,
  useEffect,
  useReducer,
  useMemo,
  createContext,
} from "react";
import {
  ApplicationProvider,
  IconRegistry,
  Modal,
  Card,
  Spinner,
} from "@ui-kitten/components";
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
import * as SecureStore from "expo-secure-store";
import { AuthContext, methods, authState, reducer } from "./AuthContext";
// Main Pages
import Main from "./Main";

// Registration Pages
import Landing from "./pages/Registration/Landing";
import RegisterPhoneNumberView from "./pages/Registration/RegisterPhoneNumber";
import ConfirmPhoneNumberView from "./pages/Registration/ConfirmPhoneNumber";

const RegistrationStack = createStackNavigator();
const MainStack = createStackNavigator();

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

  const [state, dispatch] = useReducer(reducer, authState);
  const authContextValue = useMemo(methods, []);

  // Check if user is signed in, set
  useEffect(() => {
    SecureStore.getItemAsync("userToken")
      .then((token) => {
        if (token != null) {
          dispatch({ type: "RESTORE_TOKEN", token });
        }
      })
      .catch((e) => {
        console.log("Restore token failed");
      });
  }, []);

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
        <AuthContext.Provider value={authContextValue}>
          <NavigationContainer>
            {state.isLoading ? (
              <Modal
                visible={true}
                backdropStyle={{ backgroundColor: "rgba(0,0,0,0.7)" }}
              >
                <Card disabled={true}>
                  <Spinner size="giant" />
                </Card>
              </Modal>
            ) : null}
            {state.userToken ? (
              <MainStack.Navigator screenOptions={{ headerShown: false }}>
                <MainStack.Screen name="Main" component={Main} />
              </MainStack.Navigator>
            ) : (
              <RegistrationStack.Navigator
                screenOptions={{
                  headerShown: false,
                  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
              >
                <RegistrationStack.Screen
                  name="Landing"
                  component={Landing}
                  options={{
                    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                  }}
                />
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
        </AuthContext.Provider>
      </ApplicationProvider>
    </>
  );
}
