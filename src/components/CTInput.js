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
import { fontSizes } from "../constants";

export function CTInput({
  title,
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
  style,
  ...other
}) {
  style = __themeStyleFunc(style, themeStyles.CTInput);
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
  const inAnimValue = 16;
  const outAnimValue = Platform.OS == "ios" ? -10 : -11;
  const duration = 150;
  const floatAnimation = useRef(new Animated.Value(0)).current;
  const textInputRef = useRef(null);
  // const [myFontFamily, setMyFontFamily] = useState(fonts.SFProTextBold);
  const [myColor, setMyColor] = useState(colors.black);
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    if (other.value === "" && !isFocused) {
      initAnimation(inAnimValue);
      // setMyFontFamily(fonts.SFProTextBold);
      setMyColor(colors.black);
    } else {
      initAnimation(outAnimValue);
      // setMyFontFamily(fonts.SFProTextRegular);
      setMyColor(colors.lightGray);
    }
  }, [other.value]);

  const initAnimation = (animationValue) => {
    Animated.timing(floatAnimation, {
      toValue: animationValue,
      duration: duration,
      useNativeDriver: false,
    }).start();
  };

  const inAnimation = () => {
    if (other.value === "") {
      Animated.timing(floatAnimation, {
        toValue: inAnimValue,
        duration: duration,
        useNativeDriver: false,
      }).start((data) => {
        if (data.finished) {
          // setMyFontFamily(fonts.SFProTextBold);
          setMyColor(colors.black);
        }
      });
    }
  };

  const outAnimation = () => {
    Animated.timing(floatAnimation, {
      toValue: outAnimValue,
      duration: duration,
      useNativeDriver: false,
    }).start((data) => {
      if (data.finished) {
        // setMyFontFamily(fonts.SFProTextRegular);
        setMyColor(colors.lightGray);
      }
    });
  };

  const __inputFocus = () => {
    setIsFocused(true);
    outAnimation();
  };
  const __inputBlur = () => {
    setIsFocused(false);
    inAnimation();
  };
  const TitleComp = ({ title, titleStyle }) => {
    return (
      <Animated.Text
        activeOpacity={1}
        onPress={() => textInputRef.current.focus()}
        style={[
          {
            position: "absolute",
            backgroundColor: colors.white,
            left: 11,
            top: floatAnimation,
            zIndex: 10,
            fontSize: fontSizes.f12,
            transform: [
              {
                scale: floatAnimation.interpolate({
                  inputRange: [outAnimValue, inAnimValue],
                  outputRange: [1, 1.1],
                }),
              },
            ],
            color: myColor,
            // fontFamily: myFontFamily,
          },
          titleStyle,
        ]}
      >
        {title}
      </Animated.Text>
    );
  };
  return (
    <View style={[...containerStyle]}>
      {title && animated ? (
        <TitleComp
          title={title}
          titleStyle={[
            ...titleStyle,
            { color: isFocused ? colors.primary : colors.lightslategray },
          ]}
        />
      ) : (
        title && (
          <Text
            style={[
              {
                fontSize: fontSizes.f12,
                color: colors.lightGray,
                position: "absolute",
                backgroundColor: colors.white,
                left: 15,
                top: -8,
                zIndex: 10,
              },
              titleStyle,
            ]}
          >
            {title}
          </Text>
        )
      )}
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
          ref={textInputRef}
          onFocus={() => {
            onFocus && onFocus();
            __inputFocus();
          }}
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
            style={{ height: "100%", width: "100%", position: "absolute" }}
          />
        )}
      </View>
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
CTInput.propTypes = {
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
