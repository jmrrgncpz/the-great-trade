import { Input } from "@ui-kitten/components";
import React from "react";

export class TGTInput extends Input {
  render() {
    const { style, ...restProps } = this.props;

    return (
      <Input
        style={[{
          width: "auto",
          boxShadow: "0px 5px 15px 0px rgba(2, 152, 239, 0.1)",
          elevation: 3,
          borderRadius: 12,
          overflow: "visible",
          backgroundColor: "#fff",
        }, style]}
        textStyle={[
          {
            minHeight: 50,
          },
          textStyle
        ]}
        {...props}
      ></Input>
    );
  }
}