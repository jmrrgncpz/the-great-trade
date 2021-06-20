import React from "react";
import { Layout, Button, Icon, useTheme } from "@ui-kitten/components";
import { useWindowDimensions, Image, View } from "react-native";

const NewImagePreviewView = ({ navigation, route }) => {
  const window = useWindowDimensions();
  const theme = useTheme();
  const accept = () => {
    route.params.setImagesProxy(route.params.photo);
    navigation.navigate("NewItemImagesView");
  };

  const discard = () => {
    navigation.goBack();
  };

  return (
    <Layout style={{ flex: 1 }}>
      <Image
        source={route.params.photo}
        style={{
          width: window.width,
          height: window.width,
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme['color-primary-default'],
        }}
      >
        <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
          <Button
            size="giant"
            status="danger"
            style={{ marginRight: 24 }}
            accessoryLeft={(props) => <Icon {...props} name="close-outline" />}
            onPress={discard}
          >
            Discard
          </Button>
          <Button
            size="giant"
            status="info"
            accessoryLeft={(props) => (
              <Icon {...props} name="checkmark-outline" />
            )}
            onPress={accept}
          >
            Accept
          </Button>
        </View>
      </View>
    </Layout>
  );
};

export default NewImagePreviewView;
