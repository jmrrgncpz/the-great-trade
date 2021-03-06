import React, { useState, useContext } from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { Image, TouchableOpacity, View } from "react-native";
import { Icon, OverflowMenu, MenuItem, Button } from "@ui-kitten/components";
import { AuthContext } from "../../AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

// Pages
import HomeView from "./HomeView";
import ItemsView from "./ItemsView";
import NewItemPage from "./NewItem/NewItemView";

const HomeStack = createStackNavigator();
const HomePage = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { signOut } = useContext(AuthContext);

  // Components
  const verticalMenu = () => (
    <TouchableNativeFeedback
      onPress={() => setIsMenuVisible(!isMenuVisible)}
      background={TouchableNativeFeedback.Ripple("rgba(0,0,0,0.2)", true)}
    >
      <View style={{ height: 24, width: 24 }}>
        <Icon fill="black" name="more-vertical-outline" />
      </View>
    </TouchableNativeFeedback>
  );

  const CloseIcon = (props) => (
    <View style={{ marginLeft: 12 }}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("rgba(0,0,0,0.2)", true)}
      >
        <View style={{ height: 24, width: 24 }}>
          <Icon fill="black" name="close-outline" />
        </View>
      </TouchableNativeFeedback>
    </View>
  );

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 16,
          fontFamily: "Montserrat-SemiBold",
        },
        headerTitleAlign: "center",
      }}
    >
      <HomeStack.Screen
        name="HomeView"
        component={HomeView}
        options={({ navigation }) => {
          return {
            title: "The Great Trade",
            headerLeft: (props) => (
              <View style={{ marginLeft: 12 }}>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple(
                    "rgba(0,0,0,0.2)",
                    true
                  )}
                  onPress={() => {
                    navigation.navigate({
                      name: "ItemsView",
                      key: "ItemsView", // set this to go back to ItemsView when navigate to ItemsView is called again
                    });
                  }}
                >
                  <View style={{ height: 24, width: 24 }}>
                    <Icon {...props} fill="black" name="cube-outline" />
                  </View>
                </TouchableNativeFeedback>
              </View>
            ),
            headerRight: () => (
              <View style={{ marginRight: 12 }}>
                <OverflowMenu
                  visible={isMenuVisible}
                  anchor={verticalMenu}
                  onBackdropPress={() => setIsMenuVisible(false)}
                >
                  <MenuItem title="Sign out" onPress={signOut} />
                </OverflowMenu>
              </View>
            ),
          };
        }}
      />
      <HomeStack.Screen
        name="ItemsView"
        component={ItemsView}
        options={{
          title: "Your Items",
        }}
      />
      <HomeStack.Screen
        name="NewItemView"
        component={NewItemPage}
        options={({ navigation }) => {
          return {
            title: "New Item",
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            headerLeft: (props) => (
              <TouchableOpacity onPress={() => navigation.pop()}>
                <CloseIcon />
              </TouchableOpacity>
            ),
          };
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomePage;
