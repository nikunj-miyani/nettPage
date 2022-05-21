import React from "react";
import { View } from "react-native";
import { number } from "prop-types";
export default function CTSeparator({ height = 20 }) {
  return <View style={{ height: height }} />;
}
CTSeparator.propType = {
  height: number,
};
