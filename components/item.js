import React, { useEffect, useState } from "react";
import { Text, StyleService, useStyleSheet } from "@ui-kitten/components";
import { Image, View, TouchableOpacity } from "react-native";
import Tag from "./tag";
import { getItemFirstImageURLAsync } from "../services/ItemService";

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
}) {
  const styles = useStyleSheet(stylesheet);
  const [imageURL, setImageURL] = useState(null);
  useEffect(() => {
    (async () => {
      const firstImageURL = await getItemFirstImageURLAsync(id);
      setImageURL(firstImageURL);
    })();
  }, [id]);
  return (
    <TouchableOpacity style={[customStyle, styles.container]}>
      <View
        elevation={3}
        style={{
          flexDirection: "row",
        }}
      >
        {uploadTask ? (
          <Image style={styles.image} source={{ uri: images[0].uri }} />
        ) : (
          <Image style={styles.image} source={{ uri: imageURL }} />
        )}

        <View style={styles.details}>
          <View style={styles.itemHeader}>
            <View style={styles.headerLeft}>
              <Text category="h3">{name}</Text>
              <Text category="c1" style={styles.category}>
                {category.name}
              </Text>
            </View>
            <Tag
              style={styles.condition}
              text={condition.text}
              status={condition.status}
            />
          </View>
          <View style={styles.tagsContainer}>
            {tags.map((tag, idx) => (
              <Tag key={idx} text={tag} style={styles.tag} />
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const stylesheet = StyleService.create({
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
  tagsContainer: {
    flexDirection: "row",
  },
  descriptionContainer: {},
});
