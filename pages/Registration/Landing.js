import React, { useState, useContext, useCallback } from "react";
import {
  Icon,
  Text,
  Button,
} from "@ui-kitten/components";
import {
  Image,
  ImageBackground,
  View,
} from "react-native";
import {
  signInWithFacebookAsync,
} from "../../services/AuthenticationService";
import { AuthContext } from "../../AuthContext";

const openPhoneNumberRegistration = () => {
  navigation.navigate("RegisterPhoneNumber");
};

const Landing = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);

  const doSignInWithFacebookAsync = useCallback(() => {
    signIn(signInWithFacebookAsync);
  }, []);

  return (
    <ImageBackground
      style={{ flex: 1, resizeMode: "cover" }}
      source={require("../../assets/images/tamas-tokos-0PwHrPaXc5g-unsplash.jpg")}
    >
      <View
        style={{ flex: 1, padding: 40, backgroundColor: "rgba(0,0,0,0.7)" }}
      >
        <View style={{ flex: 1 }}>
          <Image
            style={{
              width: 150,
              resizeMode: "contain",
            }}
            source={require("../../assets/logos/white-Montserrate-wline-The-Great-Trade-logos_white.png")}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            category="h1"
            style={{
              textAlign: "center",
              marginBottom: 10,
            }}
            status="control"
          >
            Seal a barter deal with your phone
          </Text>
          <Text
            style={{
              textAlign: "center",
              letterSpacing: 1,
            }}
            status="control"
          >
            Post your items up for barter, send and accept trade requests.
          </Text>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <Text category="h4" status="control" style={{ marginBottom: 12 }}>
            Sign in with
          </Text>
          <View style={{ flexDirection: "row", marginBottom: 12 }}>
            <Button
              onPress={doSignInWithFacebookAsync}
              style={{ flex: 1, marginRight: 12 }}
              status="basic"
              accessoryLeft={(props) => (
                <Icon {...props} name="facebook-outline" />
              )}
            >
              Facebook
            </Button>
            <Button
              style={{ flex: 1 }}
              status="basic"
              accessoryLeft={(props) => (
                <Icon {...props} name="google-outline" />
              )}
            >
              Google
            </Button>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Landing;
