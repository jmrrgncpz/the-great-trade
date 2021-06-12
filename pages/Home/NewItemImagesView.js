import { useTheme, Layout, Text, Button, Icon } from "@ui-kitten/components";
import React from "react";
import { View, TouchableOpacity, Image, Dimensions } from "react-native";

const Page = ({ navigation }) => {
  const theme = useTheme();

  return (
    <Layout level="2" style={{ flex: 1, padding: 25 }}>
      <Text category="h1" style={{ marginBottom: 24 }}>
        Images
      </Text>

      <View
        style={{ flex: 1, flexDirection: "column-reverse", marginBottom: 24, alignItems: 'center' }}
      >
        <View
          id="image-upload-actions-section"
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            status="info"
            appearance="ghost"
            size="large"
            style={{ flex: 1, marginRight: 12 }}
            accessoryLeft={(props) => (
              <Icon {...props} name="image-outline"></Icon>
            )}
          >
            Upload photos
          </Button>

          <Button
            status="info"
            appearance="outline"
            size="large"
            style={{ flex: 1 }}
            accessoryLeft={(props) => (
              <Icon {...props} name="camera-outline"></Icon>
            )}
          >
            Take a photo
          </Button>
        </View>
        <Image
          source={require("../../assets/images/Images-rafiki.png")}
          resizeMode="contain"
          style={{ flex: 1 }}
        ></Image>
      </View>

      <Button
        size="giant"
        style={{ marginTop: "auto" }}
        onPress={() => navigation.navigate("SummaryView")}
        accessoryRight={(props) => (
          <Icon {...props} name="chevron-right-outline"></Icon>
        )}
      >
        Next
      </Button>
    </Layout>
  );
};

export default Page;
