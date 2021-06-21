import {
  useTheme,
  Layout,
  Text,
  Button,
  Icon,
  useStyleSheet,
  StyleService,
} from "@ui-kitten/components";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  TextInput,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import PreferredItem from "../../../components/preferred-item";

const Page = ({ navigation, route }) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const [currentInputText, setCurrentInputText] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);

  const [currentInputTarget, setCurrentInputTarget] = useState("");
  const [tags, setTags] = useState([]);
  const [preferredItems, setPreferredItems] = useState([]);

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
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {tags.map((tag, i) => (
                  <Text key={`tag-${i}`} status="control" category="c1" style={[styles.tag]}>
                    {tag}
                  </Text>
                ))}
                <Button
                  style={{
                    borderStyle: "dashed",
                    borderColor: theme["color-info-default"],
                    backgroundColor: "transparent",
                  }}
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
                      setPreferredItems(
                        preferredItems.filter((i) => i != preferredItem)
                      );
                    }}
                  />
                ))}
                {preferredItems.length < 3 ? (
                  <Button
                    style={{
                      marginTop: 12,
                      borderStyle: "dashed",
                      borderColor: theme["color-info-default"],
                      backgroundColor: "transparent",
                    }}
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

            <Button
              size="giant"
              style={{ marginTop: "auto" }}
              onPress={() =>
                navigation.navigate("NewItemImagesView", { ...route.params, preferredItems, tags })
              }
              accessoryRight={(props) => (
                <Icon {...props} name="chevron-right-outline"></Icon>
              )}
            >
              Next
            </Button>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {isInputVisible ? (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0, 0.9)",
            padding: 25,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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
                  setTags([...tags, currentInputText]);
                } else {
                  setPreferredItems([...preferredItems, currentInputText]);
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
});
