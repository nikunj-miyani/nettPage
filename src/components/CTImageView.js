import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ViewPropTypes,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";
import ReactNativePinchable from "react-native-pinchable";
import FastImage from "react-native-fast-image";
import __stylesFunc, {
  __themeStyleFunc,
} from "../utils/basicFunctions/StylesFunc";
import { imagePlaceholderImg } from "../assets/images";
import themeStyles from "../assets/styles/themestyles";

export default function CTImageView({
  imagePlaceholderSource,
  source,
  imageStyle,
  height,
  width,
  onPress,
  style,
  containerStyle,
  pinchableZoom,
  contentContainerStyle,
}) {
  style = __themeStyleFunc(style, themeStyles.CTImageView);
  const [imagePlaceholder, setImagePlaceholder] = React.useState(
    imagePlaceholderSource || imagePlaceholderImg
  );
  height = height || 100;
  width = width || 100;

  containerStyle = __stylesFunc(containerStyle, style, "containerStyle");
  contentContainerStyle = __stylesFunc(
    contentContainerStyle,
    style,
    "contentContainerStyle"
  );
  imageStyle = __stylesFunc(imageStyle, style, "imageStyle");

  return (
    <ImageBackground
      source={imagePlaceholder}
      style={[
        {
          width,
          height,
        },
        ...containerStyle,
      ]}
      resizeMode="cover"
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={[{ flex: 1 }, ...contentContainerStyle]}
      >
        {pinchableZoom ? (
          <ReactNativePinchable style={{ flex: 1 }}>
            <FastImage
              source={source}
              resizeMode={imageStyle?.[0].resizeMode || "cover"}
              style={[{ flex: 1 }, ...imageStyle]}
              onLoad={() => setImagePlaceholder(null)}
            />
          </ReactNativePinchable>
        ) : (
          <FastImage
            source={source}
            resizeMode={imageStyle?.[0].resizeMode || "contain"}
            style={[{ flex: 1 }, ...imageStyle]}
            onLoad={() => setImagePlaceholder(null)}
          />
        )}
      </TouchableOpacity>
    </ImageBackground>
  );
}
CTImageView.propTypes = {
  // imagePlaceholderSource : ,
  // imagePlaceholderStyle,
  // source: PropTypes.string,
  // imageStyle:,
  backgroundColor: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  pinchableZoom: PropTypes.bool,
  contentContainerStyle: ViewPropTypes.style,
  onPress: PropTypes.func,
  style: PropTypes.shape({
    imageStyle: PropTypes.object,
    containerStyle: ViewPropTypes.style,
    contentContainerStyle: ViewPropTypes.style,
  }),
};
