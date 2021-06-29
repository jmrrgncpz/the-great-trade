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

const Page = ({
  condition,
  name,
  description,
  category,
  tags,
  preferredItems,
  images,
}) => {
  const styles = useStyleSheet(themeStyles);
  const window = useWindowDimensions();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const onPageSelected = (e) => {
    setSelectedImageIndex(e.nativeEvent.position);
  };

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
            {images.map((image, i) => (
              <View
                key={`image-${i + 1}`}
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
              { selectedImageIndex + 1 } / {images.length}
            </Text>
          )}
        </View>

        <View style={[styles.itemHeader, styles.stackItem]}>
          <View>
            <Text category="h2">{name}</Text>
            <Text category="c1">{category.name}</Text>
          </View>
          <View style={[styles.statusContainer]}>
            <Text category="c1" style={[styles.tag, styles.status]}>
              { condition.text }
            </Text>
          </View>
        </View>

        <View id="description-container" style={[styles.stackItem]}>
          <Text category="p1" style={[styles.description]}>
            {description}
          </Text>
        </View>

        <View
          id="tags-container"
          style={[styles.stackItem, styles.tagsContainer]}
        >
          {tags.map((tag, i) => (
            <Text key={`summary-tag-${i}`} category="c1" style={[styles.tag]}>
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
            {preferredItems.map((itemName, i) => (
              <PreferredItem key={`summary-preferred-item-${i}`} priorityNo={i} itemName={itemName} />
            ))}
          </View>
        </View>
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
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
