import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import propTypes from "prop-types";
import themeStyles from "../assets/styles/themestyles";
import __stylesFunc, {
  __themeStyleFunc,
} from "../utils/basicFunctions/StylesFunc";

const { width } = Dimensions.get("screen");

export default function CTTextMoreLessView({
  text,
  numberOfCharacter,
  moreTextStyle,
  lessTextStyle,
  textStyle,
  style,
}) {
  style = __themeStyleFunc(style, themeStyles.CTTextMoreLessView);
  textStyle = __stylesFunc(textStyle, style, "textStyle");
  moreTextStyle = __stylesFunc(moreTextStyle, style, "moreTextStyle");
  lessTextStyle = __stylesFunc(lessTextStyle, style, "lessTextStyle");
  const [showFullText, setShowFullText] = useState(false);
  numberOfCharacter = numberOfCharacter == undefined ? 200 : numberOfCharacter;

  const onPressMore = () => {
    setShowFullText(true);
  };
  const onPressLess = () => {
    setShowFullText(false);
  };
  const isVisibleOption = String(text).length > numberOfCharacter;
  return (
    <View>
      {text && (
        <Text style={[...textStyle]}>
          {showFullText ? text : String(text).slice(0, numberOfCharacter)}
          {showFullText && isVisibleOption && (
            <Text style={[...lessTextStyle]} onPress={onPressLess}>
              {"   "}
              ...show less
            </Text>
          )}
          {!showFullText && isVisibleOption && (
            <Text style={[...moreTextStyle]} onPress={onPressMore}>
              {"   "}
              ...more
            </Text>
          )}
        </Text>
      )}
      {/* <View style={{ position: "absolute", bottom: 1, right: 0 }}></View> */}
    </View>
  );
}

CTTextMoreLessView.propType = {
  text: propTypes.string.isRequired,
  numberOfCharacter: propTypes.number,
  moreTextStyle: propTypes.object,
  lessTextStyle: propTypes.object,
  textStyle: propTypes.object,
  style: propTypes.shape({
    moreTextStyle: propTypes.object,
    lessTextStyle: propTypes.object,
    textStyle: propTypes.object,
  }),
};
