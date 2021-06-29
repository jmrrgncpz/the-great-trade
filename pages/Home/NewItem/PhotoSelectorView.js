import React, { useState, useEffect, useContext } from "react";
import {
  Layout,
  Text,
  Button,
  Icon,
  StyleService,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import { View, Image, ScrollView } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import NewItemContext from "./new-item-context";
const NewItemImagesView = ({ images }) => {
  const setItemState = useContext(NewItemContext)
  const styles = useStyleSheet(stylesheet);
  const [imagesContainerWidth, setImagesContainerWidth] = useState(0);
  const [imagesContainerHeight, setImagesContainerHeight] = useState(0);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      allowsMultipleSelection: true
    })

    if(!result.cancelled){
      setItemState({ images: [...images, result] });
    }
  }

  const launchCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1,1],
      quality: 0.5
    })

    if (!result.cancelled){
      setItemState({ images: [...images, result] });
    }
  }

  return (
    <Layout level="2" style={{ flex: 1 }}>
      <Text category="h1" style={{ margin: 25, marginBottom: 12 }}>
        Images
      </Text>

      <View
        style={{
          flex: 1,
          marginBottom: 24,
          alignItems: "stretch",
        }}
      >
        {/* Images */}
        {images.length ? (
          <ScrollView
            onLayout={(e) => {
              setImagesContainerWidth(e.nativeEvent.layout.width);
              setImagesContainerHeight(e.nativeEvent.layout.height);
            }}
            style={[styles.imagesContainer, { height: imagesContainerHeight }]}
            contentContainerStyle={styles.imagesContent}
          >
            {images.map((image, i) => {
              return (
                <View
                  key={`image-${i}`}
                  style={[
                    styles.imageContainer,
                    {
                      width: imagesContainerWidth / 2 - 12,
                      height: imagesContainerWidth / 2 - 12,
                    },
                  ]}
                >
                  <Image source={{ uri: image.uri }} style={styles.image} />
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <Image
            source={require("../../../assets/images/Images-rafiki.png")}
            resizeMode="contain"
            style={{ flex: 1, alignSelf: "center" }}
          ></Image>
        )}

        {/* Action Buttons */}
        <View
          id="image-upload-actions-section"
          style={styles.imagesUploadSection}
        >
          <Button
            status="info"
            appearance="ghost"
            size="large"
            style={{ flex: 1, marginRight: 12 }}
            accessoryLeft={(props) => (
              <Icon {...props} name="image-outline"></Icon>
            )}
            onPress={pickImage}
          >
            Upload a photo
          </Button>

          <Button
            status="info"
            appearance="outline"
            size="large"
            style={{ flex: 1 }}
            onPress={launchCamera}
            accessoryLeft={(props) => (
              <Icon {...props} name="camera-outline"></Icon>
            )}
          >
            Take a photo
          </Button>
        </View>
      </View>
    </Layout>
  );
};

export default NewItemImagesView;

const stylesheet = StyleService.create({
  imagesUploadSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 25,
  },
  imagesContainer: {
    flex: 1,
    borderRadius: 12,
    marginHorizontal: 25,
    borderStyle: "dashed",
    borderColor: ["color-info-default"],
    borderWidth: 1,
  },
  imagesContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  imageContainer: {
    padding: 8,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  image: {
    resizeMode: 'contain',
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
});
