import { useTheme, Layout, Text, Button, Icon } from "@ui-kitten/components";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const Page = ({ navigation }) => {
  const theme = useTheme();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Layout level="2" style={{ flex: 1, padding: 25 }}>
          <Text category="h1" style={{ marginBottom: 24 }}>
            Additional Information
          </Text>

          <View id="tags-section" style={{ marginBottom: 24 }}>
            <Text category="h2" style={{ marginBottom: 12 }}>
              Tags
            </Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Button
                style={{
                  borderStyle: "dashed",
                  borderColor: theme["color-info-default"],
                  backgroundColor: "transparent",
                }}
                appearance="ghost"
                status="info"
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
            <View style={{ display: "flex" }}>
              <Button
                style={{
                  borderStyle: "dashed",
                  borderColor: theme["color-info-default"],
                  backgroundColor: "transparent",
                }}
                appearance="ghost"
                status="info"
                accessoryLeft={(props) => (
                  <Icon {...props} name="plus-outline" />
                )}
              >
                <Text style={{ color: theme["color-info-default"] }}>
                  Add a preferred item
                </Text>
              </Button>
            </View>
          </View>

          <Button
            size="giant"
            style={{ marginTop: "auto" }}
            onPress={() => navigation.navigate("NewItemImagesView")}
            accessoryRight={(props) => (
              <Icon {...props} name="chevron-right-outline"></Icon>
            )}
          >
            Next
          </Button>
        </Layout>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Page;
