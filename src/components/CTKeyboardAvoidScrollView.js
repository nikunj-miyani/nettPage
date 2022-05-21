import React from "react";
import { KeyboardAvoidingView, ScrollView, ViewPropTypes } from "react-native";
import ThemeStyles from "../assets/styles/themestyles";
import __stylesFunc, {
  __themeStyleFunc,
} from "../utils/basicFunctions/StylesFunc";
import PropTypes from "prop-types";

export default function CTKeyboardAvoidScrollView({
  children,
  keyboardAvoidingViewProp,
  scrollViewProp,
  keyboardAvoidingStyle,
  keyboardAvoidingContentContainerStyle,
  scrollStyle,
  scrollContentContainerStyle,
  style,
}) {
  style = __themeStyleFunc(style, ThemeStyles.CTKeyboardAvoidScrollView);

  keyboardAvoidingStyle = __stylesFunc(
    keyboardAvoidingStyle,
    style,
    "keyboardAvoidingStyle"
  );
  keyboardAvoidingContentContainerStyle = __stylesFunc(
    keyboardAvoidingContentContainerStyle,
    style,
    "keyboardAvoidingContentContainerStyle"
  );
  scrollStyle = __stylesFunc(scrollStyle, style, "scrollStyle");
  scrollContentContainerStyle = __stylesFunc(
    scrollContentContainerStyle,
    style,
    "scrollContentContainerStyle"
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : ""}
      style={[{ flex: 1 }, ...keyboardAvoidingStyle]}
      {...keyboardAvoidingViewProp}
      contentContainerStyle={[...keyboardAvoidingContentContainerStyle]}
    >
      <ScrollView
        contentContainerStyle={[
          {
            flexGrow: 1,
          },
          ...scrollContentContainerStyle,
        ]}
        style={[...scrollStyle]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
        {...scrollViewProp}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
CTKeyboardAvoidScrollView.propTypes = {
  keyboardAvoidingViewProp: ViewPropTypes.style,
  scrollViewProp: ViewPropTypes.style,
  keyboardAvoidingStyle: ViewPropTypes.style,
  keyboardAvoidingContentContainerStyle: ViewPropTypes.style,
  scrollStyle: ViewPropTypes.style,
  scrollContentContainerStyle: ViewPropTypes.style,
  style: PropTypes.shape({
    keyboardAvoidingViewProp: ViewPropTypes.style,
    scrollViewProp: ViewPropTypes.style,
    keyboardAvoidingStyle: ViewPropTypes.style,
    keyboardAvoidingContentContainerStyle: ViewPropTypes.style,
    scrollStyle: ViewPropTypes.style,
    scrollContentContainerStyle: ViewPropTypes.style,
  }),
};
