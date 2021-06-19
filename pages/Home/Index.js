import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

// Pages
import ItemsView from "./ItemsView";
import NewItemPage from "./NewItem/NewItemPage";

const HomeStack = createStackNavigator();
const Home = () => {
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
