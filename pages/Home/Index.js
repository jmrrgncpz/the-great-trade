import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import { CardStyleInterpolators } from "@react-navigation/stack";

// Pages
import ItemsView from "./ItemsView";
import CategorySelectionView from "./CategorySelectionView";
import ConditionSelectionView from "./ConditionSelectionView";
import DetailsView from "./DetailsView";
import AdditionalInfoView from "./AdditionalInfoView";
import NewItemImagesView from "./NewItemImagesView";
import SummaryView from "./SummaryView";

const Stack = createStackNavigator();
const navigatorScreenOptions = {
  headerTitleStyle: {
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
  },
  headerTitleAlign: "center",
  title: "New Item",
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

// components
const CloseIcon = () => (
  <Image
    style={{ width: 24, height: 24 }}
    source={require("../../assets/icons/close-outline.png")}
  />
);

const Home = () => {
  return (
    <Stack.Navigator screenOptions={navigatorScreenOptions}>
      <Stack.Screen
        name="ItemsViewPage"
        component={ItemsView}
        options={{
          title: "The Great Trade",
        }}
      />
      <Stack.Screen
        name="CategorySelectionView"
        component={CategorySelectionView}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerBackImage: CloseIcon,
        }}
      />
      <Stack.Screen
        name="ConditionSelectionView"
        component={ConditionSelectionView}
      />
      <Stack.Screen name="DetailsView">
        { (props) => <DetailsView {...props} onNextPressed={() => props.navigation.navigate('AdditionalInfoView')} /> }
      </Stack.Screen>
      <Stack.Screen name="AdditionalInfoView" component={AdditionalInfoView} />
      <Stack.Screen name="NewItemImagesView" component={NewItemImagesView} />
      <Stack.Screen name="SummaryView" component={SummaryView} />
    </Stack.Navigator>
  );
};

export default Home;
