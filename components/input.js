import { Input } from "@ui-kitten/components";
import React from "react";

const CustomInput = (props) => (
  <Input
    style={{
      width: "auto",
      boxShadow: "0px 5px 15px 0px rgba(2, 152, 239, 0.1)",
      elevation: 3,
      borderRadius: 12,
      overflow: 'visible',
      backgroundColor: '#fff',
      ...props.customStyle
    }}
    textStyle={{
      minHeight: 50,
      ...props.customTextStyle
    }}
    {...props}
  ></Input>
);

export default CustomInput;
