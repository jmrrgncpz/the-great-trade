import React, { useState, useContext } from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { Icon, OverflowMenu, MenuItem, Button } from "@ui-kitten/components";

// Pages
import ItemsView from "./ItemsView";
import NewItemPage from "./NewItem/NewItemPage";
import { AuthContext } from "../../AuthContext";

const HomeStack = createStackNavigator();
const Home = () => {
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
        name="ItemsViewPage"
        component={ItemsView}
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
        name="NewItemPage"
        component={NewItemPage}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};

export default Home;
