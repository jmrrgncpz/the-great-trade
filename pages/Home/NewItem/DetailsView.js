import { Layout, Text, Icon, Input, Button } from "@ui-kitten/components";
import React, { useState } from "react";
import { View } from 'react-native';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { Platform } from "react-native";
const DetailsView = ({ navigation, route, onNextPressed }) => {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");

  const [isNameHintVisible, setIsNameHintVisible] = useState(false);
  const [isDescriptionHintVisible, setIsDescriptionHintVisible] =
    useState(false);

  const [nameInputStatus, setNameInputStatus] = useState("default");
  const [descriptionStatus, setDescriptionStatus] = useState("default");

  const onNameBlur = () => {
    const isNameValid = itemName.length;
    setNameInputStatus(isNameValid ? "success" : "danger");
    setIsNameHintVisible(isNameValid ? false : true);
  };

  const onDescriptionBlur = () => {
    const isHintVisible = itemDescription.length < 5;
    setIsDescriptionHintVisible(isHintVisible);
    setDescriptionStatus(isHintVisible ? "danger" : "success");
  };

  onNextPressed =
    onNextPressed ||
    (() => {
      navigation.navigate("AdditionalInfoView", {
        ...route.params,
        itemName,
        itemDescription,
      });
    });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Layout level="2" style={{ flex: 1, padding: 25 }}>
          <View id="name-input-field" style={{ marginBottom: 24 }}>
            <Text category="h1" style={{ fontSize: 36 }}>
              Details
            </Text>
            <Text
              style={{ fontSize: 16, marginBottom: 12, letterSpacing: 0.8 }}
            >
              What's this thing called? What brand, model, etc
            </Text>
            <Input
              accessibilityLabel="item name input"
              placeholder="Name"
              value={itemName}
              onChangeText={(newItemName) => setItemName(newItemName)}
              status={nameInputStatus}
              onBlur={onNameBlur}
            ></Input>
            {isNameHintVisible ? <Text status="danger" appearance="hint">Input an appropriate name.</Text> : null}
          </View>

          <View id="description-input-field">
            <Text
              style={{ fontSize: 16, marginBottom: 12, letterSpacing: 0.8 }}
            >
              Provide more information about this item e.g. receipt date,
              warranty, issues/flaws, etc.
            </Text>
            <Input
              multiline={true}
              textStyle={{
                textAlignVertical: "top",
                minHeight: 120,
                paddingTop: 16,
              }}
              status={descriptionStatus}
              accessibilityLabel="item description input"
              placeholder="Description"
              value={itemDescription}
              onChangeText={(newItemDescription) =>
                setItemDescription(newItemDescription)
              }
              onBlur={onDescriptionBlur}
            ></Input>
            {isDescriptionHintVisible ? (
              <Text status="danger" appearance="hint">Tell us more about this item.</Text>
            ) : null}
          </View>

          <Button
            accessibilityLabel="next button"
            size="giant"
            style={{ marginTop: "auto" }}
            onPress={onNextPressed}
            accessoryRight={(props) => (
              <Icon {...props} name="chevron-right-outline" />
            )}
            disabled={!(itemName.length > 0 && itemDescription.length > 5)}
          >
            Next
          </Button>
        </Layout>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default DetailsView;
