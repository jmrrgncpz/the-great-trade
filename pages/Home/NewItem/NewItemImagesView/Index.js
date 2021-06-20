import React, { useState, useEffect, useRef, createContext } from "react";
import {
  useTheme,
  Layout,
  Text,
  Button,
  Icon,
  ViewPager,
} from "@ui-kitten/components";
import {
  View,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import PagerView from "react-native-pager-view";

export const NewItemImagesContext = createContext();
const NewItemImagesStack = createStackNavigator();

const NewItemImagesView = ({ navigation, route }) => {
  const theme = useTheme();
  const [images, setImages] = useState([]);
  const pagerRef = useRef(null);
  const window = useWindowDimensions();

  useEffect(() => {
    const hasParams = route.params;
    if (hasParams) {
      setImages(route.params.images || []);
    } else {
      setImages([]);
    }
  }, [route]);

  return (
    <Layout level="2" style={{ flex: 1 }}>
      <Text category="h1" style={{ margin: 25, marginBottom: 12 }}>
        Images
      </Text>

      <View
        style={{
          flex: 1,
          flexDirection: "column-reverse",
          marginBottom: 24,
          alignItems: "center",
        }}
      >
        <View
          id="image-upload-actions-section"
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 24,
            marginHorizontal: 25,
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
            onPress={() =>
              navigation.navigate("CameraView", { images })
            }
            accessoryLeft={(props) => (
              <Icon {...props} name="camera-outline"></Icon>
            )}
          >
            Take a photo
          </Button>
        </View>

        {images.length ? (
          <PagerView
            ref={pagerRef}
            style={{ height: window.width, width: window.width }}
          >
            {images.map((image, i) => (
              <View
                key={`${i + 1}`}
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Image
                  resizeMode="cover"
                  style={{ width: "100%", flex: 1 }}
                  source={{ uri: image.uri }}
                />
              </View>
            ))}
          </PagerView>
        ) : (
          <Image
            source={require("../../../../assets/images/Images-rafiki.png")}
            resizeMode="contain"
            style={{ flex: 1 }}
          ></Image>
        )}
      </View>

      <Button
        size="giant"
        style={{ marginTop: "auto", marginHorizontal: 25 }}
        onPress={() => navigation.navigate('CameraView', { images, setImages })}
        accessoryRight={(props) => (
          <Icon {...props} name="chevron-right-outline"></Icon>
        )}
      >
        Next
      </Button>
    </Layout>
  );
};

export default NewItemImagesView;
