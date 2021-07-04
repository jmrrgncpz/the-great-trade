import React from "react";
import { View } from "react-native";
import {
  Icon,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import {
  createStackNavigator,
} from "@react-navigation/stack";
import ExploreView from "./ExploreView";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

const ExploreStack = createStackNavigator();
export default function ExplorePage() {
  const styles = useStyleSheet(styleSheet);
  return (
    <ExploreStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 16,
          fontFamily: "Montserrat-SemiBold",
        },
        headerTitleAlign: "center",
      }}
    >
      <ExploreStack.Screen
        component={ExploreView}
        name="ExploreView"
        options={{
          title: "Explore",
          headerRight: (props) => (
            <TouchableNativeFeedback
              style={{ marginRight: 12 }}
              background={TouchableNativeFeedback.Ripple(
                "rgba(0,0,0,0.2)",
                true
              )}
              onPress={() => {}}
            >
              <View style={styles.headerRightIcon}>
                <Icon {...props} name="search-outline" fill="black" />
              </View>
            </TouchableNativeFeedback>
          ),
        }}
      ></ExploreStack.Screen>
    </ExploreStack.Navigator>
  );
}

const styleSheet = StyleService.create({
  headerRightIcon: { height: 24, width: 24 },
});
