import React, { useEffect, useState } from "react";
import { Icon, Text, Layout, Button, Input } from "@ui-kitten/components";
import { Image, ImageBackground, useWindowDimensions } from "react-native";

const RegisterPhoneNumberView = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  useEffect(() => {
    if (phoneNumber.length == 11) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [phoneNumber]);

  const submitPhoneNumber = () => {
    navigation.navigate('ConfirmPhoneNumber');
  };

  const cancel = () => {
    navigation.goBack();
  };
  return (
    <Layout style={{ flex: 1, padding: 40 }}>
      <Layout style={{ flex: 1 }}>
        <Image
          style={{
            width: 150,
            resizeMode: "contain",
          }}
          source={require("../../assets/logos/Montserrat-wline-The-Great-Trade-logos_transparent.png")}
        />
      </Layout>
      <Layout style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 36,
            marginBottom: 10,
            fontFamily: "Lato-Bold",
          }}
          status="primary"
        >
          Enter your Phone Number
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Lato-Regular",
            marginBottom: 20,
          }}
          status="primary"
        >
          For you, and the community's security, TGT only allows trading between
          users with confirmed Phone Number.
        </Text>
        <Text status="info">
          This information will only be shown in an ongoing trade.
        </Text>
      </Layout>
      <Layout
        style={{ display: "flex", flex: 1 }}
      >
        <Input
          placeholder="09xxxxxxxxx"
          maxLength={11}
          keyboardType="numeric"
          onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
        />
        <Layout style={{ flexDirection: "row", justifyContent: 'flex-end' }}>
          <Button onPress={cancel} status="control">
            Cancel
          </Button>
          <Button onPress={submitPhoneNumber} disabled={isSubmitDisabled}>
            Submit
          </Button>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default RegisterPhoneNumberView;
