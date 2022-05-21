import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import themeStyles from "../assets/styles/themestyles";
import { colors } from "../constants";
import __stylesFunc, {
  __themeStyleFunc,
} from "../utils/basicFunctions/StylesFunc";
export default function CTSeparatorLine({ separatorStyle, style }) {
  style = __themeStyleFunc(style, themeStyles.CTSeparatorLine);

  separatorStyle = __stylesFunc(separatorStyle, style, "separatorStyle");

  return <View style={[styles.separatorStyle, ...separatorStyle]} />;
}

const styles = StyleSheet.create({
  separatorStyle: {
    borderWidth: 0.5,
    borderColor: colors.gainsboro,
  },
});

CTSeparatorLine.propTypes = {
  style: PropTypes.shape({
    separatorStyle: PropTypes.object,
  }),
};
