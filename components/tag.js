import { Text, useTheme } from "@ui-kitten/components";
import React from "react";

export default function Tag({ text, status, style: customStyle }) {
  const theme = useTheme();
  return (
    <Text
      category="c1"
      style={[
        {
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 8,
          backgroundColor: status
            ? theme[`color-${status}-default`]
            : theme["color-primary-default"],
          color: "white",
        },
        customStyle
      ]}
    >
      {text}
    </Text>
  );
}
