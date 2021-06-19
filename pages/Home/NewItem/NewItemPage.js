import React, { useState } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { Icon } from '@ui-kitten/components';
import { Image } from 'react-native';

// Pages
import CategorySelectionView from "./CategorySelectionView";
import ConditionSelectionView from "./ConditionSelectionView";
import DetailsView from "./DetailsView";
import AdditionalInfoView from "./AdditionalInfoView";
import NewItemImagesView from "./NewItemImagesView/Index";
import SummaryView from "./SummaryView";

// components
const CloseIcon = (props) => (
  <Image
    style={{ width: 24, height: 24 }}
    source={require("../../../assets/icons/close-outline.png")}
  />
);

const ItemCreationStack = createStackNavigator();
const NewItemPage = () => {
  return <ItemCreationStack.Navigator
    screenOptions={{
      headerTitleStyle: {
        fontSize: 16,
        fontFamily: "Montserrat-SemiBold",
      },
      headerTitleAlign: "center",
      title: "New Item",
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}
  >
    <ItemCreationStack.Screen
      name="CategorySelectionView"
      component={CategorySelectionView}
      options={{
        headerBackImage: CloseIcon,
      }}
    />
    <ItemCreationStack.Screen
      name="ConditionSelectionView"
      component={ConditionSelectionView}
    />
    <ItemCreationStack.Screen name="DetailsView" component={DetailsView} />
    <ItemCreationStack.Screen
      name="AdditionalInfoView"
      component={AdditionalInfoView}
    />
    <ItemCreationStack.Screen
      name="NewItemImagesView"
      component={NewItemImagesView}
      options={({ route }) => {
        headerShown: getFocusedRouteNameFromRoute(route) == "CameraView"
          ? true
          : false;
      }}
    />
    <ItemCreationStack.Screen name="SummaryView" component={SummaryView} />
  </ItemCreationStack.Navigator>;
};

export default NewItemPage;
