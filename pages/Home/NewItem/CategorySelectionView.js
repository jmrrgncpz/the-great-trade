import React, { useState, useEffect, useCallback } from "react";
import {
  Layout,
  Text,
  Button,
  Icon,
  StyleService,
  useStyleSheet,
  useTheme,
  Select,
  SelectGroup,
  SelectItem,
} from "@ui-kitten/components";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { ScrollView } from "react-native";

const CategorySelectionView = ({ selectedCategory, setCategory }) => {
  const theme = useTheme();

  const [selectedCategoryProxy, setSelectedCategoryProxy] = useState("");

  const onCategoryPress = useCallback(
    (category) => {
      setSelectedCategoryProxy(category);
      setCategory(category);
    },
    [selectedCategoryProxy]
  );

  const Subcategory = ({ icon, name }) => (
    <Button
      class="subcategory"
      style={[
        {
          backgroundColor:
            selectedCategoryProxy.name == name
              ? theme["color-info-100"]
              : "#fff",
        },
        styles.subcategory,
      ]}
      onPress={() => onCategoryPress({ icon, name })}
      accessoryLeft={(props) => (
        <FontAwesomeIcon
          color="rgb(2, 152, 239)"
          icon={icon}
          size={24}
          style={styles.icon}
        />
      )}
    >
      <Text
        style={{ fontWeight: "700", color: theme["color-primary-default"] }}
      >
        {name}
      </Text>
    </Button>
  );

  return (
    <Layout
      id="category-selection-view"
      level="2"
      style={{ display: "flex", flex: 1 }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 25,
        }}
      >
        

        {/* {categories.map((category) => (
          <Layout
            key={`section-${category.name}-category`}
            class="category-section"
            level="2"
            style={{ marginBottom: 24, overflow: "visible" }}
          >
            <Text
              category="h2"
              style={{
                marginBottom: 8,
                marginLeft: 25,
              }}
            >
              {category.name}
            </Text>
            <ScrollView
              contentContainerStyle={{
                justifyContent: "flex-start",
                alignItems: "center",
                paddingVertical: 5,
                paddingHorizontal: 25,
              }}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "transparent",
              }}
            >
              {category.subcategories.map((subcategory) => (
                <Subcategory
                  key={`btn-${subcategory.name}-subcategory`}
                  {...subcategory}
                ></Subcategory>
              ))}
            </ScrollView>
          </Layout>
        ))} */}
      </ScrollView>
    </Layout>
  );
};

export default CategorySelectionView;

const themedStyles = StyleService.create({
  icon: {
    marginRight: 12,
  },
  subcategory: {
    shadowColor: "color-info-default",
    elevation: 3,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 0,
    shadowOpacity: 0.1,
    overflow: "visible",
    borderRadius: 12,
    borderWidth: 0,
    marginRight: 12,
  },
});
