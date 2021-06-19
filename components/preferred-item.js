import React from "react";
import { Text, Button, Icon, useTheme } from "@ui-kitten/components";
import { View } from "react-native";

export default PreferredItem = ({ priorityNo, itemName, removeFn }) => {
  const theme = useTheme();
  return (
    <View
      key={`${priorityNo + 1}-${itemName}`}
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "lightgray",
      }}
    >
      <Text
        category="h2"
        style={{
          marginRight: 12,
          color: theme["color-info-default"],
        }}
      >
        {priorityNo + 1}
      </Text>
      <Text category="p1" style={{ fontSize: 24 }}>{itemName}</Text>
      {removeFn ? (
        <Button
          onPress={removeFn}
          status="danger"
          size="small"
          style={{
            backgroundColor: theme["color-danger-400"],
            elevation: 3,
            marginLeft: "auto",
          }}
          accessoryLeft={(props) => <Icon {...props} name="close-outline" />}
        />
      ) : null}
    </View>
  );
};
