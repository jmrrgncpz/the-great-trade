import React from "react";
import {
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { View, ScrollView } from "react-native";
import ItemsList from "./ItemsView";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function HomeView({ navigation, route }) {
  const styles = useStyleSheet(styleSheet);
  return (
    <Layout level="2" style={{ flex: 1 }}>
      <ScrollView style={styles.scrollContainer}>
        <Layout level="2" style={styles.styleSheet}>
          <View style={styles.tradeRequestSection}>
            <Text category="h3" style={styles.tradeRequestTitle}>
              Trade Requests
            </Text>

            <View>
              <Text category="h4" style={styles.tradeRequestTitle}>
                Incoming Requests
              </Text>
              <View></View>
            </View>

            <View>
              <Text category="h4" style={styles.tradeRequestTitle}>
                Sent Requests
              </Text>
            </View>
          </View>
          <View style={styles.yourItemsSection}>
            <Text category="h3" style={styles.yourItemsTitle}>
              Your Items
            </Text>
            <ItemsList navigation={navigation} route={route} isSummary={true} />
            <TouchableOpacity
              style={styles.btnSeeAllOwnItemsContainer}
              onPress={() => navigation.navigate("ItemsView")}
            >
              <Text
                category="p1"
                style={styles.btnSeeAllOwnItems}
                status="info"
              >
                See all
              </Text>
            </TouchableOpacity>
          </View>
        </Layout>
      </ScrollView>
    </Layout>
  );
}

const styleSheet = StyleService.create({
  scrollContainer: {
    paddingVertical: 12,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  homeTitle: {
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  tradeRequestSection: {
    marginBottom: 24,
  },
  yourItemsTitle: {
    paddingHorizontal: 12,
  },
  yourItemsSection: {
    marginBottom: 24,
  },
  btnSeeAllOwnItemsContainer: {
    elevation: 2,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  btnSeeAllOwnItems: {
    fontFamily: "Lato-Bold",
  },
  tradeRequestTitle: {
    paddingHorizontal: 12,
  },
});
