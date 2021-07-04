import React, { useEffect, useState } from "react";
import { Text, StyleService, useStyleSheet } from "@ui-kitten/components";
import { Image, View, TouchableOpacity } from "react-native";
import Tag from "./tag";
import { getItemFirstImageURLAsync } from "../services/ItemService";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import { LinearGradient } from "expo-linear-gradient";

export default function Item({
  name,
  description,
  condition,
  category,
  tags,
  preferredItems,
  style: customStyle,
  id,
  // uploadTask and images
  // will come from newly added item
  uploadTask,
  images,
  variant = "default", // default | explore | view | select | offered
}) {
  const window = useWindowDimensions();
  const [imageURL, setImageURL] = useState(null);
  const sharedStyles = useStyleSheet(sharedStyleSheet);
  useEffect(() => {
    (async () => {
      const firstImageURL = await getItemFirstImageURLAsync(id);
      setImageURL(firstImageURL);
    })();
  }, [id]);

  switch (variant) {
    case "default":
      const defaultStyles = useStyleSheet(defaultStyleSheet);
      return (
        <TouchableOpacity style={[customStyle, defaultStyles.container]}>
          <View
            elevation={3}
            style={{
              flexDirection: "row",
            }}
          >
            {uploadTask ? (
              <Image
                style={defaultStyles.image}
                source={{ uri: images[0].uri }}
              />
            ) : (
              <Image style={defaultStyles.image} source={{ uri: imageURL }} />
            )}

            <View style={defaultStyles.details}>
              <View style={defaultStyles.itemHeader}>
                <View style={defaultStyles.headerLeft}>
                  <Text category="h3">{name}</Text>
                  <Text category="c1" style={defaultStyles.category}>
                    {category.name}
                  </Text>
                </View>
                <Tag
                  style={defaultStyles.condition}
                  text={condition.text}
                  status={condition.status}
                />
              </View>
              <View style={sharedStyles.tagsContainer}>
                {tags.map((tag, idx) => (
                  <Tag key={idx} text={tag} style={defaultStyles.tag} />
                ))}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    case "explore":
      const exploreStyles = useStyleSheet(exploreStyleSheet);
      return (
        <View
          style={[
            { width: window.width - 24, height: window.width - 24 },
            exploreStyles.container,
          ]}
        >
          <TouchableNativeFeedback style={exploreStyles.image}>
            <Image
              width={window.width - 24}
              height={window.width - 24}
              source={{ uri: imageURL }}
              style={exploreStyles.image}
            />
            <Tag
              style={exploreStyles.tag}
              text={condition.text}
              status={condition.status}
            />
            <LinearGradient
              style={[
                exploreStyles.overlay,
                { width: window.width - 24, maxHeight: window.width / 2 },
              ]}
              locations={[0, 1]}
              colors={["transparent", "rgba(0,0,0,0.7)"]}
            >
              <View style={exploreStyles.itemHeader}>
                <Text category="h2" style={{ color: "white" }}>
                  {name}
                </Text>
                <Text category="c1" style={{ color: "white" }}>
                  {category.name}
                </Text>
              </View>
              <View>
                <Text
                  category="p1"
                  style={exploreStyles.description}
                  numberOfLines={3}
                  ellipsizeMode="tail"
                >
                  {description}
                </Text>
              </View>
            </LinearGradient>
          </TouchableNativeFeedback>
        </View>
      );
  }
}

const sharedStyleSheet = StyleService.create({
  tagsContainer: {
    flexDirection: "row",
  },
});

const defaultStyleSheet = StyleService.create({
  image: {
    width: 80,
    height: 80,
    marginRight: 12,
    overflow: "visible",
  },
  container: {
    elevation: 2,
    boxSizing: "border-box",
    flexShrink: 0,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#ffffff",
    overflow: "visible",
  },
  more: {
    marginLeft: 8,
    color: ["color-info-default"],
  },
  details: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
    overflow: "visible",
  },
  itemHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  category: {},
  headerLeft: {
    marginBottom: 12,
  },
  condition: {},
  tag: {
    marginRight: 8,
    marginBottom: 8,
  },
  descriptionContainer: {},
});

const exploreStyleSheet = StyleService.create({
  container: {
    marginBottom: 12,
  },
  overlay: {
    bottom: 0,
    padding: 12,
    position: "absolute",
    borderRadius: 8,
  },
  tag: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  itemHeader: {
    marginBottom: 12,
  },
  image: {
    borderRadius: 8,
  },
  description: { color: "white" },
});
