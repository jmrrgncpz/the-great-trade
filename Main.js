import React, { useState, useEffect } from "react";
import {
  Layout,
  Text,
  Button,
  Icon,
  BottomNavigation,
  BottomNavigationTab,
} from "@ui-kitten/components";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import useKeyboardBehavior from "./custom-hooks/view-keyboard-behavior";
// Tab Contents
import HomePage from "./pages/Home/HomePage.js";
import Explore from "./pages/Explore/Explore.js";

const HomeIcon = (props) => <Icon {...props} name="home-outline" />;
const ExploreIcon = (props) => <Icon {...props} name="compass-outline" />;
const TradeIcon = (props) => <Icon {...props} name="swap-outline" />;
const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({
  navigation,
  state,
  selectedIndex,
  setSelectedIndex,
}) => (
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

const Main = () => {
  useKeyboardBehavior(() => setIsTabsHidden(true), () => setIsTabsHidden(false))
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isTabsHidden, setIsTabsHidden] = useState(false);

  return (
    <Navigator
      tabBar={(props) =>
        isTabsHidden ? null : (
          <BottomTabBar
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            {...props}
          />
        )
      }
    >
      <Screen name="Home" component={HomePage} />
      <Screen name="Explore" component={Explore} />
    </Navigator>
  );
};

export default Main;
