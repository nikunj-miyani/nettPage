import React from "react";
import { View, StyleSheet, Modal, ViewPropTypes } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import propTypes from "prop-types";
import themeStyles from "../assets/styles/themestyles";
import colors from "../constants/colors";
import __stylesFunc, {
  __themeStyleFunc,
} from "../utils/basicFunctions/StylesFunc";

export default function CTSimpleModal({
  isVisible,
  onDismiss,
  style,
  modalContainerStyle,
  containerStyle,
  itemContainerStyle,
  children,
}) {
  style = __themeStyleFunc(style, themeStyles.CTSimpleModal);

  modalContainerStyle = __stylesFunc(
    modalContainerStyle,
    style,
    "modalContainerStyle"
  );
  containerStyle = __stylesFunc(containerStyle, style, "containerStyle");
  itemContainerStyle = __stylesFunc(
    itemContainerStyle,
    style,
    "itemContainerStyle"
  );
  return (
    <Modal
      visible={isVisible}
      transparent
      onDismiss={() => onDismiss(false)}
      onRequestClose={() => onDismiss(false)}
      style={[modalContainerStyle]}
    >
      <View style={[styles.containerStyle, containerStyle]}>
        <View style={[styles.itemContainerStyle, itemContainerStyle]}>
          {children}
        </View>
        <SafeAreaView style={{ backgroundColor: colors.white }} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainerStyle: {
    overflow: "hidden",
    minWidth: 100,
    minHeight: 100,
    borderRadius: 10,
  },
});
CTSimpleModal.propTypes = {
  isVisible: propTypes.bool,
  onDismiss: propTypes.func,
  modalContainerStyle: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
  itemContainerStyle: ViewPropTypes.style,
  style: propTypes.shape({
    modalContainerStyle: ViewPropTypes.style,
    containerStyle: ViewPropTypes.style,
    itemContainerStyle: ViewPropTypes.style,
  }),
};
