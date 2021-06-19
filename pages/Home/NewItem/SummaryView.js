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
import PreferredItem from "../../../components/preferred-item";

const Page = ({ navigation, route }) => {
  const styles = useStyleSheet(themeStyles);

  return (
    <ScrollView>
      <Layout level="2" style={[styles.container]}>
        <Image
          id="images-container"
          style={[styles.imagesContainer, styles.stackItem]}
          source={require("../../../assets/images/Images-rafiki.png")}
          resizeMode="contain"
        ></Image>

        <View style={[styles.itemHeader, styles.stackItem]}>
          <View>
            <Text category="h2">{route.params.itemName}</Text>
            <Text category="c1">{route.params.category.name}</Text>
          </View>
          <View style={[styles.statusContainer]}>
            <Text category="c1" style={[styles.tag, styles.status]}>
              {route.params.condition.text}
            </Text>
          </View>
        </View>

        <View id="description-container" style={[styles.stackItem]}>
          <Text category="p1" style={[styles.description]}>
            {route.params.itemDescription}
          </Text>
        </View>

        <View
          id="tags-container"
          style={[styles.stackItem, styles.tagsContainer]}
        >
          {route.params.tags.map((tag) => (
            <Text category="c1" style={[styles.tag]}>
              {tag}
            </Text>
          ))}
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
            {route.params.preferredItems.map((itemName, i) => (
              <PreferredItem priorityNo={i} itemName={itemName} />
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
});
