import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  Layout,
  Text,
  Button,
  StyleService,
  useStyleSheet,
  useTheme,
  ListItem,
  Icon,
} from "@ui-kitten/components";
import {
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { List } from "@ui-kitten/components";
import Item from "../../components/item";
import { getUserItems } from "../../services/ItemService";
import { AuthContext } from "../../AuthContext";

const ItemsList = ({ navigation, route }) => {
  const styles = useStyleSheet(styleSheet);
  const theme = useTheme();
  const [items, setItems] = useState([]);
  const [isItemsLoading, setIsItemsLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);

  // initialize items
  useEffect(() => {
    if (currentUser) {
      getUserItems(currentUser)
        .then((_items) => {
          if (_items) {
            setItems(_items);
          }
        })
        .finally(() => {
          setIsItemsLoading(false);
        });
    }
  }, [currentUser]);

  // new item observer
  useEffect(() => {
    // add an item if an item is submitted from NewItemView.js
    if (route.params && route.params.isItemSubmitted) {
      debugger;
      const { item, uploadTask } = route.params;
      setItems([...items, { ...item, uploadTask}]);
    }
  }, [navigation, route]);

  const navigateToNewItemView = useCallback(
    () => navigation.navigate("NewItemView"),
    []
  );

  if (!currentUser || isItemsLoading) {
    return (
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator
          size="large"
          color={theme["color-primary-default"]}
        />
      </Layout>
    );
  }

  return (
    <Layout level="2" style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainerStyle}>
        {items.length ? (
          <View style={{ flex: 1 }}>
            <View style={styles.itemsHeader}>
              <Text category="h2">Your items</Text>
              <TouchableOpacity
                style={styles.newItemBtn}
                onPress={navigateToNewItemView}
              >
                <Icon
                  fill="#000"
                  style={styles.newItemBtnIcon}
                  name="plus-outline"
                />
              </TouchableOpacity>
            </View>

            <List
              style={styles.listContainer}
              data={items}
              renderItem={({ item }) => (
                <Item key={item.id} {...item} style={{ marginBottom: 8 }} />
              )}
            />
          </View>
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
            <Button onPress={navigateToNewItemView}>Add an Item</Button>
          </Layout>
        )}
      </ScrollView>
    </Layout>
  );
};

export default ItemsList;

const styleSheet = StyleService.create({
  scrollContainerStyle: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 12,
  },
  itemsHeader: {
    marginBottom: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
  },
  newItemBtn: {},
  newItemBtnIcon: {
    height: 24,
    width: 24,
  },
});
