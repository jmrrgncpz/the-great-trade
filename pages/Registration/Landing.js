import React from "react";
import { Icon, Text, Layout, Button } from "@ui-kitten/components";
import { Image, ImageBackground, useWindowDimensions } from "react-native";
import * as Facebook from "expo-facebook";

const Landing = ({ navigation }) => {
  const register = () => {
    console.log("register tapped");
    Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile", "email"],
    })
      .then((result) => {
        if (result.type === "success") {
          console.log(result);
        } else {
          console.log("error");
        }
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

  const openPhoneNumberRegistration = () => {
    navigation.navigate("RegisterPhoneNumber");
  };

  return (
    <ImageBackground
      style={{ flex: 1, resizeMode: "cover" }}
      source={require("../../assets/images/tamas-tokos-0PwHrPaXc5g-unsplash.jpg")}
    >
      <Layout
        style={{ flex: 1, padding: 40, backgroundColor: "rgba(0,0,0,0.7)" }}
      >
        <Layout style={{ flex: 1, backgroundColor: "rgba(0,0,0,0)" }}>
          <Image
            style={{
              width: 150,
              resizeMode: "contain",
            }}
            source={require("../../assets/logos/white-Montserrate-wline-The-Great-Trade-logos_white.png")}
          />
        </Layout>
        <Layout style={{ flex: 1, backgroundColor: "rgba(0,0,0,0)" }}>
          <Text
            style={{
              fontSize: 36,
              textAlign: "center",
              marginBottom: 10,
              fontFamily: "Lato-Bold",
            }}
            status="control"
          >
            Seal a barter deal with your phone
          </Text>
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              fontFamily: "Lato-Regular",
            }}
            status="control"
          >
            Post your items up for barter, send and accept trade requests.
          </Text>
        </Layout>
        <Layout
          style={{
            display: "flex",
            flex: 1,
            backgroundColor: "rgba(0,0,0,0)",
          }}
        >
          <Button
            onPress={register}
            style={{ marginBottom: 10 }}
            status="basic"
          >
            Register with Facebook
          </Button>
          <Button onPress={openPhoneNumberRegistration}> Sign in with Facebook</Button>
        </Layout>
      </Layout>
    </ImageBackground>
  );
};

export default Landing;
