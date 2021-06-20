import {
  useTheme,
  Layout,
  Text,
  Button,
  Icon,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import PreferredItem from "../../../components/preferred-item";
import PagerView from "react-native-pager-view";

const Page = ({ navigation, route }) => {
  const styles = useStyleSheet(themeStyles);
  const window = useWindowDimensions();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const onPageSelected = (e) => {
    setSelectedImageIndex(e.nativeEvent.position);
  }

  return (
    <ScrollView>
      <Layout level="2" style={[styles.container]}>
        <View
          style={{
            height: window.width - 50,
            width: window.width - 50,
            overflow: "hidden",
            borderRadius: 12,
            marginBottom: 24,
          }}
        >
          <PagerView
            style={{ width: "100%", height: "100%" }}
            showPageIndicator={true}
            onPageSelected={onPageSelected}
          >
            {route.params.images.map((image, i) => (
              <View
                key={`${i + 1}`}
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Image
                  resizeMode="cover"
                  style={{ width: "100%", flex: 1 }}
                  source={{ uri: image.uri }}
                />
              </View>
            ))}
          </PagerView>
          {Platform.OS === "ios" ? null : (
            <Text
              category="c1"
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                left: 0,
                textAlign: "center",
                backgroundColor: "rgba(0,0,0, 0.7)",
                color: "white",
                padding: 12,
              }}
            >
             { selectedImageIndex + 1 } / {route.params.images.length}
            </Text>
          )}
        </View>

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
