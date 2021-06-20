import React, { useState, useEffect, useRef } from "react";
import * as ImageManipulator from "expo-image-manipulator";
import {
  Layout,
  Text,
  Icon,
  Button,
  Spinner,
  StyleService,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import { Camera } from "expo-camera";
import { useWindowDimensions, View, Image } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

const CameraView = ({ navigation, route }) => {
  const window = useWindowDimensions();
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const cameraRef = useRef(null);
  const captureAreaRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraInitiating, setIsCameraInitiating] = useState(true);
  const [isPhotoSaving, setIsPhotoSaving] = useState(false);
  const [photo, setPhoto] = useState(null);
  // const [cropOptions, setCropOptions] = useState({});

  // const onCaptureAreaLayout = (e) => {
  //   setCropOptions({
  //     width: e.nativeEvent.layout.width,
  //     height: e.nativeEvent.layout.height,
  //     originX: e.nativeEvent.layout.x,
  //     originY: e.nativeEvent.layout.y,
  //   });
  // };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (cameraRef == null || cameraRef.current == null) return;

    if (photo == null) {
      cameraRef.current.resumePreview();
    } else {
      cameraRef.current.pausePreview();
    }
  }, [photo]);

  const snap = async () => {
    setIsPhotoSaving(true);
    const supportedRatios = await cameraRef.current.getSupportedRatiosAsync();
    const pictureSizes = supportedRatios.map(async (ratio) => {
      const sizes = await cameraRef.current.getAvailablePictureSizesAsync(
        ratio
      );

      return {
        ratio,
        sizes,
      };
    });

    let photo = await cameraRef.current.takePictureAsync();
    debugger;
    const croppedPhoto = await ImageManipulator.manipulateAsync(
      photo.uri,
      [
        {
          crop: {
            height: photo.width,
            width: photo.width,
            originX: 0,
            originY: photo.height * 0.1,
          },
        },
      ],
      { compress: 0.5 }
    );

    setPhoto(croppedPhoto);
    setIsPhotoSaving(false);
  };

  const accept = () => {
    route.params.setImagesProxy(photo);
    navigation.goBack();
  };

  const discard = () => {
    setPhoto(null);
  };

  if (hasPermission === null || hasPermission === false) {
    return (
      <Layout
        style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
      >
        <Text category="h1">No access to camera.</Text>
      </Layout>
    );
  }

  return (
    <Layout style={styles.container}>
      <Camera
        ref={cameraRef}
        style={{
          width: window.width,
          height: window.height,
        }}
        ratio="16:9"
        type={Camera.Constants.Type.back}
        onCameraReady={() => setIsCameraInitiating(false)}
      />

      {/* Interface Container */}
      <View style={styles.interfaceContainer}>
        {/* Camera Header */}
        <View
          style={[styles.cameraHeader, styles.cameraInterfaceContainer]}
        ></View>

        {/* Capture Area */}
        <View
          style={[
            styles.captureArea,
            { width: window.width, height: window.width },
          ]}
        >
          {/* Loading overlay */}
          {isPhotoSaving ? (
            <View style={styles.loadingOverlay}>
              <Spinner status="info" size="giant" style={styles.loadingSpinner} />
            </View>
          ) : null}
        </View>

        {/* Camera Footer */}
        <View style={[styles.cameraFooter, styles.cameraInterfaceContainer]}>
          {photo == null ? (
            <View style={styles.mainButtonsContainer}>
              <View style={styles.buttonContainer}>
                <Button
                  size="giant"
                  status="danger"
                  style={{ borderRadius: 50, width: 50, height: 50 }}
                  accessoryLeft={(props) => (
                    <Icon {...props} name="close-outline" />
                  )}
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableNativeFeedback
                  style={styles.snapButton}
                  onPress={snap}
                  disabled={isCameraInitiating}
                >
                  <View style={styles.snapButtonInner} />
                </TouchableNativeFeedback>
              </View>
              <View style={styles.buttonContainer}></View>
            </View>
          ) : (
            <View style={{ flexDirection: "row" }}>
              <Button
                size="giant"
                status="danger"
                style={{ marginRight: 24 }}
                accessoryLeft={(props) => (
                  <Icon {...props} name="close-outline" />
                )}
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
          )}
        </View>
      </View>

      {photo != null ? (
        <Image
          source={{ uri: photo.uri }}
          resizeMode="contain"
          style={{
            position: "absolute",
            zIndex: 3,
            width: window.width,
            height: window.width,
          }}
        />
      ) : null}
    </Layout>
  );
};

export default CameraView;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  cameraHeader: {
    height: "10%",
  },
  captureArea: {
    backgroundColor: "transparent",
  },
  cameraInterfaceContainer: {
    backgroundColor: "rgba(0,0,0, 0.5)",
  },
  cameraFooter: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  interfaceContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  snapButton: {
    height: 100,
    width: 100,
    borderRadius: 100,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  snapButtonInner: {
    height: 85,
    width: 85,
    borderRadius: 85,
    backgroundColor: "lightgray",
  },
  mainButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  loadingSpinner: {
  },
});
