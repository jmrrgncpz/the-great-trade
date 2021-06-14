import { Layout, Text, Icon, Input, Button } from "@ui-kitten/components";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { Platform } from "react-native";
const DetailsView = ({ navigation, onNextPressed }) => {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [isDescriptionHintVisible, setIsDescriptionHintVisible] =
    useState(false);

  const ChevronRight = (props) => (
    <Icon {...props} name="chevron-right-outline" />
  );
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Layout level="2" style={{ flex: 1, padding: 25 }}>
          <Text category="h1" style={{ fontSize: 36 }}>
            Details
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 12, letterSpacing: 0.8 }}>
            What's this thing called? What brand, model, etc
          </Text>
          <Input
            style={{ marginBottom: 24 }}
            accessibilityLabel="item name input"
            placeholder="Name"
            value={itemName}
            onChangeText={(newItemName) => setItemName(newItemName)}
          ></Input>

          <Text style={{ fontSize: 16, marginBottom: 12, letterSpacing: 0.8 }}>
            Provide more information about this item e.g. receipt date,
            warranty, issues/flaws, etc.
          </Text>
          <Input
            customTextStyle={{
              textAlignVertical: "top",
              minHeight: 120,
              paddingTop: 16,
            }}
            accessibilityLabel="item description input"
            placeholder="Description"
            value={itemDescription}
            onChangeText={(newItemDescription) =>
              setItemDescription(newItemDescription)
            }
            onBlur={() =>
              itemDescription.length > 5
                ? setIsDescriptionHintVisible(true)
                : setIsDescriptionHintVisible(false)
            }
          ></Input>
          {isDescriptionHintVisible ? (
            <Text status="danger">Tell us more about this item.</Text>
          ) : null}

          <Button
            accessibilityLabel="next button"
            size="giant"
            style={{ marginTop: "auto" }}
            onPress={onNextPressed}
            accessoryRight={ChevronRight}
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
