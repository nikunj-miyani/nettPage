import React, { useContext } from "react";
import { TouchableOpacity, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import FastImage from "react-native-fast-image";
import { fontSizes } from "../constants/index";
import __stylesFunc, {
  __themeStyleFunc,
} from "../utils/basicFunctions/StylesFunc";

import themeStyles from "../assets/styles/themestyles";

export function CTIcon({
  source,
  iconContainerStyle,
  iconStyle,
  noEffect,
  noTintColor,
  onPress,
  style,
  disabled,
}) {
  style = __themeStyleFunc(style, themeStyles.CTICon);
  iconStyle = __stylesFunc(iconStyle, style, "iconStyle");

  iconContainerStyle = __stylesFunc(
    iconContainerStyle,
    style,
    "iconContainerStyle"
  );

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={noEffect}
      style={[...iconContainerStyle]}
      onPress={onPress}
    >
      <FastImage
        source={source}
        style={[
          {
            width: fontSizes.f16,
            height: fontSizes.f16,
          },
          ...iconStyle,
        ]}
        resizeMode={iconStyle[0]?.resizeMode || "contain"}
        tintColor={!noTintColor && iconStyle[0]?.tintColor}
      />
    </TouchableOpacity>
  );
}
CTIcon.propTypes = {
  // source: PropTypes.string,
  // iconContainerStyle: ViewPropTypes.style,
  // iconStyle: PropTypes.object, // image style
  disabled: PropTypes.bool,
  noEffect: PropTypes.bool,
  noTintColor: PropTypes.bool,
  onPress: PropTypes.func,
  style: PropTypes.shape({
    iconContainerStyle: ViewPropTypes.style,
    iconStyle: PropTypes.object, // image style
  }),
};
