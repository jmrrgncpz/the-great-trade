import React, { useState } from "react";
import { Layout, Text, Button, Icon, StyleService, useStyleSheet } from "@ui-kitten/components";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { ScrollView } from 'react-native';
const CategorySelectionView = ({ navigation }) => {
  const categories = [
    {
      name: "Home and Garden",
      subcategories: [
        {
          name: "Tools",
          icon: "tools",
        },
        {
          name: "Furniture",
          icon: "couch",
        },
        {
          name: "Garden",
          icon: "seedling",
        },
        {
          name: "Appliances",
          icon: "tv",
        },
      ],
    },
    {
      name: "Entertainment",
      subcategories: [
        {
          name: "Video Games",
          icon: "gamepad",
        },
        {
          name: "Books, Movies, and Music",
          icon: "book",
        },
      ],
    },
    {
      name: "Clothing and Accessories",
      subcategories: [
        {
          name: "Bags and Luggage",
          icon: "suitcase-rolling",
        },
        {
          name: "Women's Clothing & Shoes",
          icon: "female",
        },
        {
          name: "Men's Clothing & Shoes",
          icon: "male",
        },
        {
          name: "Jewelry & Accessories",
          icon: ["far", "gem"],
        },
      ],
    },
    {
      name: "Family",
      subcategories: [
        {
          name: "Health and Beauty",
          icon: "heartbeat",
        },
        {
          name: "Pet Supplies",
          icon: "paw",
        },
        {
          name: "Baby & Kids",
          icon: "baby",
        },
        {
          name: 'Toys & Games',
          icon: "puzzle-piece"
        }
      ],
    },
    {
      name: "Electronics",
      subcategories: [
        {
          name: "Electronics & Computers",
          icon: "laptop",
        },
        {
          name: "Mobile Phones",
          icon: "mobile-alt",
        },
      ],
    },
    {
      name: "Hobbies",
      subcategories: [
        {
          name: "Bicycles",
          icon: "bicycle",
        },
        {
          name: "Arts & Crafts",
          icon: "paint-brush",
        },
        {
          name: "Sports & Outdoors",
          icon: "basketball-ball",
        },
        {
          name: "Auto Parts",
          icon: "car",
        },
        {
          name: "Musical Instruments",
          icon: "guitar",
        },
        {
          name: "Antiques & Collectibles",
          icon: "camera-retro",
        },
      ],
    },
    {
      name: "Others",
      subcategories: [
        {
          name: "Others",
          icon: "cube",
        },
      ],
    },
  ];

  const styles = useStyleSheet(themedStyles)

  const Subcategory = ({ icon, name }) => (
    <Button
      class="subcategory"
      style={{
        shadowColor: 'color-info-default',
        elevation: 3,
        shadowOffset: { width: 5, height: 5 },
        shadowRadius: 0,
        shadowOpacity: 0.1,
        backgroundColor: "#ffffff",
        overflow: "visible",
        borderRadius: 12,
        borderWidth: 0,
        marginRight: 12,
      }}
      onPress={() => navigation.navigate('ConditionSelectionView', { category: { name }})}
      accessoryLeft={() => (
        <FontAwesomeIcon
          color="rgb(2, 152, 239)"
          icon={icon}
          size={24}
          style={styles.icon}
        />
      )}
    >
      <Text style={{ fontSize: 16 }}> {name}</Text>
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
          paddingVertical: 25
        }}
      >
        <Text
          category="h1"
          style={{
            marginBottom: 24,
            marginLeft: 25
          }}
        >
          Category
        </Text>

        {categories.map((category) => (
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
                marginLeft: 25
              }}
            >
              {category.name}
            </Text>
            <ScrollView
              contentContainerStyle={{
                justifyContent: "flex-start",
                alignItems: "center",
                paddingVertical: 5,
                paddingHorizontal: 25
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
                <Subcategory key={`btn-${subcategory.name}-subcategory`} {...subcategory}></Subcategory>
              ))}
            </ScrollView>
          </Layout>
        ))}
      </ScrollView>
    </Layout>
  );
};

export default CategorySelectionView;

const themedStyles = StyleService.create({
  icon: {
    marginRight: 12
  }
})