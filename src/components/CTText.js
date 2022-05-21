import React from "react";
import {
  TouchableOpacity,
  Text,
  Image,
  View,
  StyleSheet,
  ViewPropTypes,
} from "react-native";
import PropTypes from "prop-types";
import colors from "../constants/colors";
import __stylesFunc, {
  __themeStyleFunc,
} from "../utils/basicFunctions/StylesFunc";
import themeStyles from "../assets/styles/themestyles";

export default function CTText({
  title,
  titleStyle,
  titleContainerStyle,
  containerStyle,
  style,
  leftSource,
  leftIconStyle,
  leftIconContainerStyle,
  onPressLeft,
  rightSource,
  rightIconStyle,
  rightIconContainerStyle,
  onPressRight,
  onFullPress,
}) {
  style = __themeStyleFunc(style, themeStyles.CTText);

  containerStyle = __stylesFunc(containerStyle, style, "containerStyle");
  titleStyle = __stylesFunc(titleStyle, style, "titleStyle");
  titleContainerStyle = __stylesFunc(
    titleContainerStyle,
    style,
    "titleContainerStyle"
  );
  leftIconContainerStyle = __stylesFunc(
    leftIconContainerStyle,
    style,
    "leftIconContainerStyle"
  );
  leftIconStyle = __stylesFunc(leftIconStyle, style, "leftIconStyle");
  rightIconContainerStyle = __stylesFunc(
    rightIconContainerStyle,
    style,
    "rightIconContainerStyle"
  );
  rightIconStyle = __stylesFunc(rightIconStyle, style, "rightIconStyle");
  return (
    <View style={[styles.containerStyle, ...containerStyle]}>
      {leftSource && (
        <TouchableOpacity
          onPress={onPressLeft || null}
          activeOpacity={onPressLeft ? 0 : 1}
          style={[styles.leftIconContainerStyle, ...leftIconContainerStyle]}
        >
          <Image
            source={leftSource}
            style={[styles.leftIconStyle, ...leftIconStyle]}
            resizeMode={leftIconStyle?.[0].resizeMode || "contain"}
          />
        </TouchableOpacity>
      )}
      <View style={[styles.titleContainerStyle, ...titleContainerStyle]}>
        {title && <Text style={[...titleStyle]}>{title}</Text>}
      </View>
      {rightSource && (
        <TouchableOpacity
          onPress={onPressRight || null}
          activeOpacity={onPressRight ? 0 : 1}
          style={[styles.rightIconContainerStyle, ...rightIconContainerStyle]}
        >
          <Image
            source={rightSource}
            style={[styles.rightIconStyle, ...rightIconStyle]}
            resizeMode={rightIconStyle?.[0].resizeMode || "contain"}
          />
        </TouchableOpacity>
      )}

      {onFullPress && (
        <TouchableOpacity
          onPress={onFullPress}
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "row",
    overflow: "hidden",
    borderWidth: 1,
    borderRadius: 10,
  },
  leftIconContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
  },
  leftIconStyle: {
    width: 16,
    height: 16,
    resizeMode: "contain",
  },
  rightIconContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
  },
  inputStyle: {
    flex: 1,

    paddingVertical: 0,
  },
  rightIconStyle: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});
CTText.propTypes = {
  containerStyle: ViewPropTypes.style,
  title: PropTypes.string,
  titleStyle: PropTypes.object,
  titleContainerStyle: ViewPropTypes.style,

  // leftSource,
  leftIconStyle: PropTypes.object,
  leftIconContainerStyle: ViewPropTypes.style,
  onPressLeft: PropTypes.func,
  // rightSource,
  rightIconStyle: PropTypes.object,
  rightIconContainerStyle: ViewPropTypes.style,
  onPressRight: PropTypes.func,
  onFullPress: PropTypes.func,

  style: PropTypes.shape({
    titleStyle: PropTypes.object,
    containerStyle: ViewPropTypes.style,
    titleContainerStyle: ViewPropTypes.style,
    inputStyle: PropTypes.object,
    leftIconStyle: PropTypes.object,
    leftIconContainerStyle: ViewPropTypes.style,
    rightIconStyle: PropTypes.object,
    rightIconContainerStyle: ViewPropTypes.style,
  }),
};
