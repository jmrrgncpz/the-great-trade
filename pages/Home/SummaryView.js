import {
  useTheme,
  Layout,
  Text,
  Button,
  Icon,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Page = ({ navigation }) => {
  const styles = useStyleSheet(themeStyles);

  return (
    <ScrollView>
      <Layout level="2" style={[styles.container]}>
        <Image
          id="images-container"
          style={[styles.imagesContainer, styles.stackItem]}
          source={require("../../assets/images/Images-rafiki.png")}
          resizeMode="contain"
        ></Image>

        <View style={[styles.itemHeader, styles.stackItem]}>
          <View>
            <Text category="h2">Item Name</Text>
            <Text category="c1">Category</Text>
          </View>
          <View style={[styles.statusContainer]}>
            <Text category="c1" style={[styles.tag, styles.status]}>
              Status
            </Text>
          </View>
        </View>

        <View id="description-container" style={[styles.stackItem]}>
          <Text category="p1" style={[styles.description]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque tempor auctor iaculis. Aliquam commodo aliquam mollis.
            Mauris consequat, dolor eu placerat tincidunt, dolor ipsum interdum
            odio, eu laoreet ante neque in quam Aliquam commodo aliquam mollis.
            Mauris consequat, dolor eu placerat tincidunt, dolor ipsum interdum
            odio, eu laoreet ante neque in quam
          </Text>
        </View>

        <View
          id="tags-container"
          style={[styles.stackItem, styles.tagsContainer]}
        >
          <Text category="c1" style={[styles.tag]}>Tag 1</Text>
          <Text category="c1" style={[styles.tag]}>Tag 2</Text>
          <Text category="c1" style={[styles.tag]}>Longer Tag</Text>
          <Text category="c1" style={[styles.tag]}>Tag 4</Text>
          <Text category="c1" style={[styles.tag]}>Tag 5</Text>
        </View>

        <View
          id="preferred-items-container"
          style={[styles.stackItem, styles.preferredItemsContainer]}
        >
          <Text category="h3" styles={[styles.stackSubItem]}>
            Preferred Items
          </Text>
          <View
            id="preferred-items-list-container"
            style={[styles.preferredItemsListContainer]}
          >
            {[
              "Nissin Noodols",
              "Nissin Noodols",
              "Nissin Noodols",
              "Nissin Noodols",
            ].map((itemName, i) => (
              <View
                key={`${i + 1}-${itemName}`}
                style={[styles.preferredItemItem]}
              >
                <Text category="h2" style={[styles.preferredItemRank]}>
                  {i + 1}
                </Text>
                <Text category="p1">{itemName}</Text>
              </View>
            ))}
          </View>
        </View>

        <Button
          status="success"
          size="giant"
          style={styles.submitButton}
          onPress={() => navigation.navigate("ItemsViewPage")}
        >
          Submit
        </Button>
      </Layout>
    </ScrollView>
  );
};

export default Page;

const themeStyles = StyleService.create({
  container: { padding: 25 },
  stackItem: {
    marginBottom: 24,
  },
  stackSubItem: {
    marginBottom: 12,
  },
  imagesContainer: {
    height: 360,
    flex: 1,
    alignSelf: "center",
  },
  submitButton: { alignSelf: "stretch" },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tag: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: ["color-primary-default"],
    color: "white",
    marginRight: 8,
    marginBottom: 8,
  },
  status: {
    marginRight: 0,
    backgroundColor: ["color-success-default"],
  },
  description: {
    letterSpacing: 1,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  preferredItemsListContainer: {},
  preferredItemItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  preferredItemRank: {
    marginRight: 12,
    color: ["color-info-default"]
  },
});
