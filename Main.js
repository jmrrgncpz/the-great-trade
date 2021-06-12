import React, { useState, useEffect } from "react";
import {
  Layout,
  Text,
  Button,
  Icon,
  BottomNavigation,
  BottomNavigationTab,
} from "@ui-kitten/components";
import { default as theme } from "./custom-theme.json";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

// Tab Contents
import Home from "./pages/Home/Index.js";
import Explore from "./pages/Explore/Explore.js";

const Main = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const FacebookIcon = (props) => <Icon name="facebook" {...props}></Icon>;
  const HomeIcon = (props) => <Icon {...props} name="grid-outline" />;
  const ExploreIcon = (props) => <Icon {...props} name="compass-outline" />;
  const TradeIcon = (props) => <Icon {...props} name="swap-outline" />;

  const fbStyle = { backgroundColor: theme["color-info-500"] };
  const FBLoginButton = () => (
    <Button accessoryLeft={FacebookIcon} style={fbStyle}>
      Login with Facebook
    </Button>
  );

  const { Navigator, Screen } = createBottomTabNavigator();
  const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
      selectedIndex={selectedIndex}
      onSelect={(index) => {
        setSelectedIndex(index);
        navigation.navigate(state.routeNames[index]);
      }}
      indicatorStyle={{ backgroundColor: "rgba(0,0,0,0)" }}
    >
      <BottomNavigationTab title="Home" icon={HomeIcon} />
      <BottomNavigationTab title="Explore" icon={ExploreIcon} />
      <BottomNavigationTab title="Trade" icon={TradeIcon} />
    </BottomNavigation>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
          <Screen name="Home" component={Home} />
          <Screen name="Explore" component={Explore} />
        </Navigator>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Main;
