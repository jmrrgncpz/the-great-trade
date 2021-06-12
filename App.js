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
import { NavigationContainer, StackActions } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import * as eva from "@eva-design/eva";
import { default as theme } from "./custom-theme.json";
import { default as mapping } from "./mapping.json";
import { registerIcons } from './fontawesome';

registerIcons();

// Pages
import Landing from "./pages/Registration/Landing";
import Main from "./Main";
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
    Facebook.initializeAsync({
      appId: "1039613316566966",
      appName: "The Great Trade",
    }).then(() => {
      setIsFBReady(true);
    });
  }, []);

  const Stack = createStackNavigator();
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
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {state.isSignedIn ? (
              <Stack.Screen
                name="Main"
                component={Main}
                options={{
                  cardStyleInterpolator:
                    CardStyleInterpolators.forHorizontalIOS,
                }}
              />
            ) : (
              <>
                <Stack.Screen
                  name="Landing"
                  component={Landing}
                  options={{
                    cardStyleInterpolator:
                      CardStyleInterpolators.forHorizontalIOS,
                  }}
                />
                <Stack.Screen
                  name="RegisterPhoneNumber"
                  component={RegisterPhoneNumberView}
                  options={{
                    cardStyleInterpolator:
                      CardStyleInterpolators.forHorizontalIOS,
                  }}
                />
                <Stack.Screen
                  name="ConfirmPhoneNumber"
                  component={ConfirmPhoneNumberView}
                  options={{
                    cardStyleInterpolator:
                      CardStyleInterpolators.forHorizontalIOS,
                  }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
        {/* </AuthContext.Provider> */}
      </ApplicationProvider>
    </>
  );
}
