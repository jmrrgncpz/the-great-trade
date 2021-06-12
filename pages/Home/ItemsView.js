import React, { useState } from "react";
import { Layout, Text, Button } from "@ui-kitten/components";
import { Image } from "react-native";

const ItemsList = ({ navigation }) => {
  const [items, setItems] = useState([]);

  return (
    <Layout style={{ display: "flex", flex: 1 }}>
      <Layout
        level="2"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        {items.length ? (
          <Layout>List</Layout>
        ) : (
          <Layout
            style={{
              backgroundColor: "rgba(0,0,0,0)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: 300,
                height: 300,
              }}
              source={require("../../assets/images/Empty-amico.png")}
            />
            <Text status="info" style={{ fontSize: 24, marginBottom: 12 }}>
              Wow, nothing's here.
            </Text>
            <Button onPress={() => navigation.navigate("CategorySelectionView")}>Add an Item</Button>
          </Layout>
        )}
      </Layout>
    </Layout>
  );
};

export default ItemsList;
