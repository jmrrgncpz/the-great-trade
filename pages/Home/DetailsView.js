import { Layout, Text, Button, Icon } from "@ui-kitten/components";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import Input from "../../components/input";

const DetailsView = ({ navigation }) => (
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
        <Input customStyle={{ marginBottom: 24 }} placeholder="Name"></Input>

        <Text style={{ fontSize: 16, marginBottom: 12, letterSpacing: 0.8 }}>
          Provide more information about this item e.g. receipt date, warranty,
          issues/flaws, etc.
        </Text>
        <Input
          multiline={true}
          customTextStyle={{
            textAlignVertical: "top",
            minHeight: 120,
            paddingTop: 16,
          }}
          placeholder="Description"
        ></Input>

        <Button
          size="giant"
          style={{ marginTop: "auto" }}
          onPress={() => navigation.navigate("AdditionalInfoView")}
          accessoryRight={(props) => <Icon {...props} name="chevron-right-outline"></Icon>}
        >
          Next
        </Button>
      </Layout>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);

export default DetailsView;
