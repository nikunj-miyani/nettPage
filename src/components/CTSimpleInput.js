import React from "react";
import {
  TouchableOpacity,
  Text,
  Image,
  View,
  TextInput,
  StyleSheet,
  ViewPropTypes,
  Animated,
} from "react-native";
import PropTypes from "prop-types";
import colors from "../constants/colors";
import __stylesFunc, {
  __themeStyleFunc,
} from "../utils/basicFunctions/StylesFunc";
import themeStyles from "../assets/styles/themestyles";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { fonts, fontSizes } from "../constants";
import { CTSShadow } from ".";

export function CTSimpleInput({
  title,
  subTitle,
  titleStyle,
  containerStyle,
  inputContainerStyle,
  inputStyle,
  leftSource,
  leftIconStyle,
  leftIconContainerStyle,
  onPressLeft,
  rightSource,
  rightIconStyle,
  rightIconContainerStyle,
  onPressRight,
  onFullPress,
  onFocus,
  animated = false,
  maxLength,
  onChangeText,
  isError,
  errorMSG,
  errorMSGStyle,
  secureTextEntry,
  keyboardType,
  placeholder,
  multiline,
  style,
  ...other
}) {
  style = __themeStyleFunc(style, themeStyles.CTSimpleInput);
  containerStyle = __stylesFunc(containerStyle, style, "containerStyle");
  titleStyle = __stylesFunc(titleStyle, style, "titleStyle");
  inputContainerStyle = __stylesFunc(
    inputContainerStyle,
    style,
    "inputContainerStyle"
  );
  leftIconContainerStyle = __stylesFunc(
    leftIconContainerStyle,
    style,
    "leftIconContainerStyle"
  );
  leftIconStyle = __stylesFunc(leftIconStyle, style, "leftIconStyle");
  inputStyle = __stylesFunc(inputStyle, style, "inputStyle");
  rightIconContainerStyle = __stylesFunc(
    rightIconContainerStyle,
    style,
    "rightIconContainerStyle"
  );
  rightIconStyle = __stylesFunc(rightIconStyle, style, "rightIconStyle");
  errorMSGStyle = __stylesFunc(errorMSGStyle, style, "errorMSGStyle");
  const [isFocused, setIsFocused] = useState(false);
  const __inputFocus = () => {
    setIsFocused(true);
  };
  const __inputBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={[...containerStyle]}>
      {title && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={[...titleStyle]}>{title}</Text>
          <Text style={[...titleStyle]}>{subTitle}</Text>
        </View>
      )}
      <CTSShadow
        style={{
          shadowColor: colors.steelblue,
          shadowRadius: 5,
          shadowOpacity: 0.21,
          shadowOffset: {
            width: 0,
            height: 0,
          },
        }}
      >
        <View
          style={[
            styles.inputContainerStyle,
            ...inputContainerStyle,
            isFocused && { borderColor: colors.primary },
          ]}
        >
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
          <TextInput
            onFocus={__inputFocus}
            onBlur={__inputBlur}
            style={[
              {
                height: 50,
              },
              styles.inputStyle,
              ...inputStyle,
            ]}
            autoCorrect={false}
            placeholder={placeholder}
            multiline={multiline}
            maxLength={maxLength}
            placeholderTextColor={colors.lightslategray}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType || "ascii-capable"}
            onChangeText={onChangeText}
            {...other}
          />
          {rightSource && (
            <TouchableOpacity
              onPress={onPressRight || null}
              activeOpacity={onPressRight ? 0 : 1}
              style={[
                styles.rightIconContainerStyle,
                ...rightIconContainerStyle,
              ]}
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
              style={{ height: "100%", width: "100%", position: "absolute" }}
            />
          )}
        </View>
      </CTSShadow>
      {isError && errorMSG && (
        <Text style={[{ fontSize: 10, color: "red" }, ...errorMSGStyle]}>
          {errorMSG}
        </Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  inputContainerStyle: {
    flexDirection: "row",
    overflow: "hidden",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
  },
  leftIconContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
  },
  leftIconStyle: {
    width: 20,
    height: 20,

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
CTSimpleInput.propTypes = {
  title: PropTypes.string,
  titleStyle: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  inputContainerStyle: ViewPropTypes.style,
  inputStyle: PropTypes.object,
  // leftSource,
  leftIconStyle: PropTypes.object,
  leftIconContainerStyle: ViewPropTypes.style,
  onPressLeft: PropTypes.func,
  // rightSource,
  placeholder: PropTypes.string,
  rightIconStyle: PropTypes.object,
  rightIconContainerStyle: ViewPropTypes.style,
  onPressRight: PropTypes.func,
  onFullPress: PropTypes.func,
  isError: PropTypes.bool,
  errorMSG: PropTypes.string,
  errorMSGStyle: PropTypes.object,
  onFocus: PropTypes.func,
  onChangeText: PropTypes.func,

  secureTextEntry: PropTypes.bool,
  style: PropTypes.shape({
    titleStyle: PropTypes.object,
    containerStyle: ViewPropTypes.style,
    inputContainerStyle: ViewPropTypes.style,
    inputStyle: PropTypes.object,
    leftIconStyle: PropTypes.object,
    leftIconContainerStyle: ViewPropTypes.style,
    rightIconStyle: PropTypes.object,
    rightIconContainerStyle: ViewPropTypes.style,
    errorMSGStyle: PropTypes.object,
  }),
};
