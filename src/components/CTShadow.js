import React from "react";
import { ViewPropTypes } from "react-native";
import DropShadow from "react-native-drop-shadow";
import themeStyles from "../assets/styles/themestyles";
export default function CTShadow({ style, children }) {
  return (
    <DropShadow style={[themeStyles.CTSShadow, { ...style }]}>
      {children}
    </DropShadow>
  );
}
CTShadow.propType = {
  style: ViewPropTypes.style,
};
