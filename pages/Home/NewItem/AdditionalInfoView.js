import {
  useTheme,
  Layout,
  Text,
  Button,
  Icon,
  useStyleSheet,
  StyleService,
} from "@ui-kitten/components";
import React, { useState, useContext } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  TextInput,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import PreferredItem from "../../../components/preferred-item";
import NewItemContext from "./new-item-context";

const Page = ({ tags, preferredItems }) => {
  const {setItemState} = useContext(NewItemContext);
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const [currentInputText, setCurrentInputText] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);

  const [currentInputTarget, setCurrentInputTarget] = useState("");

  const onNewBtnPressed = (inputTarget) => {
    setCurrentInputTarget(inputTarget);
    setIsInputVisible(true);
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{ padding: 25 }}>
            <Text category="h1" style={{ marginBottom: 24 }}>
              Additional Information
            </Text>

            <View id="tags-section" style={{ marginBottom: 24 }}>
              <Text category="h2" style={{ marginBottom: 12 }}>
                Tags
              </Text>
              <View style={styles.tagsContainer}>
                {tags.map((tag, i) => (
                  <Text
                    key={`tag-${i}`}
                    status="control"
                    category="c1"
                    style={[styles.tag]}
                    onPress={() => setItemState({ tags: tags.filter(t => t != tag)})}
                  >
                    {tag}
                  </Text>
                ))}
                <Button
                  style={styles.newButton}
                  appearance="ghost"
                  status="info"
                  onPress={() => onNewBtnPressed("tag")}
                  accessoryLeft={(props) => (
                    <Icon {...props} name="plus-outline" />
                  )}
                >
                  <Text style={{ color: theme["color-info-default"] }}>
                    Add a tag
                  </Text>
                </Button>
              </View>
            </View>

            <View id="preferred-items-section" style={{ marginBottom: 24 }}>
              <Text category="h2" style={{ marginBottom: 12 }}>
                Preferred Items
              </Text>
              <View>
                {preferredItems.map((preferredItem, i) => (
                  <PreferredItem
                    key={`preferred-item-${i}`}
                    itemName={preferredItem}
                    priorityNo={i}
                    removeFn={() => {
                      setItemState({
                        preferredItems: preferredItems.filter((i) => i != preferredItem)
                      });
                    }}
                  />
                ))}
                {preferredItems.length < 3 ? (
                  <Button
                    style={[styles.newButton, { marginTop: 12 }]}
                    appearance="ghost"
                    status="info"
                    onPress={() => onNewBtnPressed("preferred item")}
                    accessoryLeft={(props) => (
                      <Icon {...props} name="plus-outline" />
                    )}
                  >
                    <Text style={{ color: theme["color-info-default"] }}>
                      Add a preferred item
                    </Text>
                  </Button>
                ) : null}
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {isInputVisible ? (
        <View style={styles.actionButton}>
          <TextInput
            autoFocus
            multiline
            style={{ fontSize: 36, flex: 1, color: "#fff" }}
            placeholder={`Enter new ${currentInputTarget}`}
            placeholderTextColor={"lightgray"}
            onChangeText={(inputText) => setCurrentInputText(inputText)}
          />
          <View style={{ flexDirection: "row" }}>
            <Button appearance="ghost" style={{ flex: 1 }}>
              <Text
                style={{ color: "#fff" }}
                onPress={() => setIsInputVisible(false)}
              >
                Cancel
              </Text>
            </Button>
            <Button
              status="info"
              style={{ flex: 1 }}
              onPress={() => {
                if (currentInputTarget == "tag") {
                  setItemState({ tags: [...tags, currentInputText] });
                } else {
                  setItemState({
                    preferredItems: [...preferredItems, currentInputText],
                  });
                }

                setIsInputVisible(false);
              }}
            >
              Add
            </Button>
          </View>
        </View>
      ) : null}
    </>
  );
};

export default Page;

const themedStyles = StyleService.create({
  tag: {
    textAlignVertical: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: ["color-info-200"],
    color: ["color-info-700"],
    marginRight: 8,
    marginBottom: 8,
    elevation: 3,
    fontSize: 12,
  },
  actionButton: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0, 0.9)",
    padding: 25,
    justifyContent: "space-between",
    alignItems: "center",
  },
  tagsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  newButton: {
    borderStyle: "dashed",
    borderColor: ["color-info-default"],
    backgroundColor: "transparent",
  },
});
