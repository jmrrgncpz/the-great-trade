import React, { useState, useContext } from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { Image } from "react-native";
import { Icon, OverflowMenu, MenuItem, Button } from "@ui-kitten/components";
import { AuthContext } from "../../AuthContext";
import { TouchableOpacity } from "react-native-gesture-handler";

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
    <Button
      appearance="ghost"
      onPress={() => setIsMenuVisible(!isMenuVisible)}
      accessoryLeft={(props) => (
        <Icon {...props} fill="#000" name="more-vertical-outline" />
      )}
    />
  );

  const CloseIcon = (props) => (
    <Image
      style={{ marginLeft: 12, width: 24, height: 24 }}
      source={require("../../assets/icons/close-outline.png")}
    />
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
        options={{
          title: "The Great Trade",
          headerRight: () => (
            <OverflowMenu
              visible={isMenuVisible}
              anchor={verticalMenu}
              onBackdropPress={() => setIsMenuVisible(false)}
            >
              <MenuItem title="Sign out" onPress={signOut} />
            </OverflowMenu>
          ),
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
