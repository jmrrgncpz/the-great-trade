import { Text, Layout, useTheme } from "@ui-kitten/components";
import React, { useEffect, useState, useContext, useReducer } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { getExploreItems } from "../../services/ItemService";
import { AuthContext } from "../../AuthContext";
import Item from "../../components/item";

export default function ExploreView() {
  const theme = useTheme();
  const [items, setItems] = useState(null);
  // status: loading | loaded | empty | error
  const [exploreItemsStatus, setExploreItemsStatus] = useState("loading");
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      getExploreItems(currentUser)
        .then((items) => {
          setItems(items);
        })
        .catch((e) => {
          setExploreItemsStatus("error");
        });
    }
  }, [currentUser]);

  useEffect(() => {
    if (items != null) {
      if (items && items.length) {
        setExploreItemsStatus("loaded");
      } else {
        setExploreItemsStatus("empty");
      }
    }
  }, [items]);

  switch (exploreItemsStatus) {
    case "loading":
      return (
        <ActivityIndicator
            style={{ flex: 1}}
          size="large"
          color={theme["color-primary-default"]}
        />
      );
    case "empty":
      return <Text>Empty</Text>;
    case "error":
      return <Text>Error</Text>;
    case "loaded":
      return (
        <Layout level="2" style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ padding: 12 }}>
            {items.map((item, idx) => (
              <Item
                key={item.id}
                {...item}
                style={{ marginBottom: 8 }}
                variant="explore"
              />
            ))}
          </ScrollView>
        </Layout>
      );
  }
}
