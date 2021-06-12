import React, { useEffect, useState } from "react";
import { Icon, Text, Layout, Button, Input } from "@ui-kitten/components";
import { Image } from "react-native";

export default function ConfirmPhoneNumberView() {
  useEffect(() => {
    if (code.length == 4) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [code]);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [code, setCode] = useState("");
  const submitCode = () => {

  }
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
          Confirm your Phone Number
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Lato-Regular",
            marginBottom: 20,
          }}
          status="primary"
        >
          We've sent you a 4-digit code to confirm you own the number you
          provided.
        </Text>
      </Layout>
      <Layout style={{ display: "flex", flex: 1 }}>
        <TextInput
          style={{ marginBottom: 10 }}
          maxLength={4}
          keyboardType="numeric"
          onChangeText={(code) => setCode(code)}
        />
        <Button onPress={submitCode} disabled={isSubmitDisabled}>
          Submit
        </Button>
      </Layout>
    </Layout>
  );
}
