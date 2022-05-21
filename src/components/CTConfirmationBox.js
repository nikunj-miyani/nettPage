import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  ViewPropTypes,
} from "react-native";
import PropTypes from "prop-types";
import { colors, fontSizes } from "../constants";
import __stylesFunc, {
  __themeStyleFunc,
} from "../utils/basicFunctions/StylesFunc";
import themeStyles from "../assets/styles/themestyles";
import LinearGradient from "react-native-linear-gradient";

export default function CTConfirmationBox({
  isVisible,
  title,
  titleStyle,
  description,
  descriptionStyle,
  onConfirm,
  onDismiss,
  confirmButtonTitle,
  confirmButtonTitleStyle,
  dismissButtonTitle,
  dismissButtonTitleStyle,
  modalContainerStyle,
  contentContainerStyle,
  dismissButtonStyle,
  confirmButtonStyle,
  imageContainerStyle,
  iconContainerStyle,
  source,
  closeIcon,
  imageStyle,
  iconStyle,
  buttonContainerStyle,
  buttonStyle,
  isGradientButton = true,
  style,
}) {
  style = __themeStyleFunc(style, themeStyles.CTConfirmationBox);
  contentContainerStyle = __stylesFunc(
    contentContainerStyle,
    style,
    "contentContainerStyle"
  );
  iconContainerStyle = __stylesFunc(
    iconContainerStyle,
    style,
    "iconContainerStyle"
  );
  iconStyle = __stylesFunc(iconStyle, style, "iconStyle");

  imageContainerStyle = __stylesFunc(
    imageContainerStyle,
    style,
    "imageContainerStyle"
  );
  imageStyle = __stylesFunc(imageStyle, style, "imageStyle");

  modalContainerStyle = __stylesFunc(
    modalContainerStyle,
    style,
    "modalContainerStyle"
  );
  titleStyle = __stylesFunc(titleStyle, style, "titleStyle");
  descriptionStyle = __stylesFunc(descriptionStyle, style, "descriptionStyle");
  buttonContainerStyle = __stylesFunc(
    buttonContainerStyle,
    style,
    "buttonContainerStyle"
  );
  dismissButtonStyle = __stylesFunc(
    dismissButtonStyle,
    style,
    "dismissButtonStyle"
  );
  dismissButtonTitleStyle = __stylesFunc(
    dismissButtonTitleStyle,
    style,
    "dismissButtonTitleStyle"
  );
  confirmButtonStyle = __stylesFunc(
    confirmButtonStyle,
    style,
    "confirmButtonStyle"
  );
  confirmButtonTitleStyle = __stylesFunc(
    confirmButtonTitleStyle,
    style,
    "confirmButtonTitleStyle"
  );
  buttonStyle = __stylesFunc(buttonStyle, style, "buttonStyle");
  return (
    <Modal
      transparent
      visible={isVisible}
      supportedOrientations={["landscape", "portrait"]}
    >
      <View style={[styles.contentContainerStyle, ...contentContainerStyle]}>
        <View style={[styles.modalContainerStyle, ...modalContainerStyle]}>
          {closeIcon && (
            <View style={[...iconContainerStyle]}>
              <TouchableOpacity onPress={() => onDismiss && onDismiss(false)}>
                <Image
                  source={closeIcon}
                  style={[styles.iconStyle, ...iconStyle]}
                />
              </TouchableOpacity>
            </View>
          )}

          {source && (
            <View style={[...imageContainerStyle]}>
              <Image
                source={source}
                style={[styles.imageStyle, ...imageStyle]}
              />
            </View>
          )}

          <Text style={[styles.titleStyle, ...titleStyle]}>{title}</Text>

          {description && (
            <Text style={[styles.descriptionStyle, ...descriptionStyle]}>
              {description}
            </Text>
          )}
          {isGradientButton ? (
            <View
              style={[styles.buttonContainerStyle, ...buttonContainerStyle]}
            >
              {dismissButtonTitle && (
                <TouchableOpacity onPress={() => onDismiss && onDismiss(false)}>
                  <LinearGradient
                    style={[styles.buttonStyle, ...dismissButtonStyle]}
                    colors={[colors.gradientStart, colors.gradientEnd]}
                    useAngle={true}
                    angle={90}
                    locations={[0.2, 0.8]}
                  >
                    <Text
                      style={[
                        { color: colors.white },
                        ...dismissButtonTitleStyle,
                      ]}
                    >
                      {dismissButtonTitle}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
              {confirmButtonTitle && (
                <TouchableOpacity onPress={onConfirm}>
                  <LinearGradient
                    style={[{ ...styles.buttonStyle }, ...confirmButtonStyle]}
                    colors={[colors.gradientStart, colors.gradientEnd]}
                    useAngle={true}
                    angle={90}
                    locations={[0.2, 0.8]}
                  >
                    <Text style={[...confirmButtonTitleStyle]}>
                      {confirmButtonTitle}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View
              style={[styles.buttonContainerStyle, ...buttonContainerStyle]}
            >
              {confirmButtonTitle && (
                <TouchableOpacity
                  style={[{ ...styles.buttonStyle }, ...confirmButtonStyle]}
                  onPress={onConfirm}
                >
                  <Text style={[...confirmButtonTitleStyle]}>
                    {confirmButtonTitle}
                  </Text>
                </TouchableOpacity>
              )}
              {dismissButtonTitle && (
                <TouchableOpacity
                  style={[styles.buttonStyle, ...dismissButtonStyle]}
                  onPress={() => onDismiss && onDismiss(false)}
                >
                  <Text
                    style={[
                      { color: colors.white },
                      ...dismissButtonTitleStyle,
                    ]}
                  >
                    {dismissButtonTitle}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainerStyle: {
    padding: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  imageStyle: {
    width: 70,
    height: 70,
  },
  buttonContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonStyle: {
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  titleStyle: {
    textAlign: "center",
    marginBottom: 10,
  },
  descriptionStyle: {
    marginVertical: 10,
  },
});
CTConfirmationBox.propTypes = {
  isVisible: PropTypes.bool,
  title: PropTypes.string,
  titleStyle: PropTypes.object, // text style
  description: PropTypes.string,
  descriptionStyle: ViewPropTypes.style,
  onConfirm: PropTypes.func,
  onDismiss: PropTypes.func,
  confirmButtonTitle: PropTypes.string,
  confirmButtonTitleStyle: PropTypes.object, // text style
  dismissButtonTitle: PropTypes.string,
  dismissButtonTitleStyle: PropTypes.object, // text style
  modalContainerStyle: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  dismissButtonStyle: ViewPropTypes.style,
  confirmButtonStyle: ViewPropTypes.style,
  iconContainerStyle: ViewPropTypes.style,
  source: PropTypes.string, // image source
  iconStyle: PropTypes.object, // image style
  buttonContainerStyle: ViewPropTypes.style,
  style: PropTypes.shape({
    buttonContainerStyle: ViewPropTypes.style,
    modalContainerStyle: ViewPropTypes.style,
    contentContainerStyle: ViewPropTypes.style,
    dismissButtonStyle: ViewPropTypes.style,
    confirmButtonStyle: ViewPropTypes.style,
    iconContainerStyle: ViewPropTypes.style,
    descriptionStyle: ViewPropTypes.style,
    iconStyle: PropTypes.object, // image style
    dismissButtonTitleStyle: PropTypes.object, // text style
    confirmButtonTitleStyle: PropTypes.object, // text style
    titleStyle: PropTypes.object, // text style
  }),
};
