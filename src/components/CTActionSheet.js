import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ViewPropTypes,
} from "react-native";
import Modal from "react-native-modal";
import propTypes from "prop-types";
import { closeIcon } from "../assets/icons";
import themeStyles from "../assets/styles/themestyles";
import { colors, fonts, fontSizes } from "../constants";
import __stylesFunc, {
  __themeStyleFunc,
} from "../utils/basicFunctions/StylesFunc";
import { CTSIcon } from ".";
import LinearGradient from "react-native-linear-gradient";

export default function CTActionSheet({
  isVisible = false,
  data,
  onCancelPress,
  onBackdropPress,
  selectedOption,
  itemStyle,
  itemTextStyle,
  cancelStyle,
  containerStyle,
  itemContainerStyle,
  cancelIconStyle,
  itemIconStyle,
  bottomSafeAreaStyle,
  style,
}) {
  style = __themeStyleFunc(style, themeStyles.CTActionSheet);
  containerStyle = __stylesFunc(containerStyle, style, "containerStyle");
  itemContainerStyle = __stylesFunc(
    itemContainerStyle,
    style,
    "itemContainerStyle"
  );
  itemStyle = __stylesFunc(itemStyle, style, "itemStyle");
  itemTextStyle = __stylesFunc(itemTextStyle, style, "itemTextStyle");
  itemIconStyle = __stylesFunc(itemIconStyle, style, "itemIconStyle");
  cancelStyle = __stylesFunc(cancelStyle, style, "cancelStyle");
  cancelIconStyle = __stylesFunc(cancelIconStyle, style, "cancelIconStyle");
  bottomSafeAreaStyle = __stylesFunc(
    bottomSafeAreaStyle,
    style,
    "bottomSafeAreaStyle"
  );
  return (
    <Modal
      isVisible={isVisible}
      style={{ margin: 0, justifyContent: "flex-end" }}
      useNativeDriver
      swipeDirection={["down"]}
      onBackdropPress={() => onBackdropPress(false)}
      onBackButtonPress={() => onBackdropPress(false)}
    >
      <View style={[styles.containerStyle, ...containerStyle]}>
        <View style={{ flex: 1 }} />
        {onCancelPress && (
          <>
            <View style={{ height: 10 }} />

            <CTSIcon
              onPress={() => onCancelPress(false)}
              source={closeIcon}
              disabled
              iconContainerStyle={[styles.cancelStyle, ...cancelStyle]}
              iconStyle={[...cancelIconStyle]}
            />
          </>
        )}
        <View style={[styles.itemContainerStyle, ...itemContainerStyle]}>
          {data.map((item, index) => (
            <View style={{ alignItems: "center" }} key={String(index)}>
              <TouchableOpacity onPress={item.onPress}>
                <LinearGradient
                  colors={[colors.gradientStart, colors.gradientEnd]}
                  style={[styles.itemStyle, ...itemStyle]}
                  useAngle={true}
                  angle={90}
                  locations={[0.2, 0.8]}
                >
                  <CTSIcon
                    disabled
                    source={item.icon}
                    iconStyle={[
                      {
                        tintColor: colors.white,
                      },
                      styles.itemIconStyle,
                      ...itemIconStyle,
                    ]}
                  />
                </LinearGradient>
              </TouchableOpacity>
              <Text style={[styles.itemTextStyle, ...itemTextStyle]}>
                {item.title}
              </Text>
            </View>
          ))}
        </View>
        <SafeAreaView style={[...bottomSafeAreaStyle]} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  itemContainerStyle: {
    overflow: "hidden",
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  itemStyle: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  itemTextStyle: {
    marginTop: 8,
    color: colors.secondary,
    fontFamily: fonts.sairaSemiBoldFont,
    fontSize: fontSizes.f20,
  },
  cancelStyle: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",

    marginBottom: 15,
    borderRadius: 25,
    alignSelf: "center",
  },
  containerStyle: {
    margin: 0,
  },
  itemIconStyle: {
    width: 20,
    height: 20,
    color: colors.white,
  },
});
CTActionSheet.propTypes = {
  isVisible: propTypes.bool,
  data: propTypes.array,
  onCancelPress: propTypes.func,
  onBackdropPress: propTypes.func,
  selectedOption: propTypes.string,
  itemStyle: ViewPropTypes.style,
  itemTextStyle: propTypes.object,
  cancelStyle: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
  itemContainerStyle: ViewPropTypes.style,
  cancelIconStyle: propTypes.object,
  itemIconStyle: propTypes.object,
  bottomSafeAreaStyle: ViewPropTypes.style,
  style: propTypes.shape({
    itemStyle: ViewPropTypes.style,
    itemTextStyle: propTypes.object,
    cancelStyle: ViewPropTypes.style,
    containerStyle: ViewPropTypes.style,
    itemContainerStyle: ViewPropTypes.style,
    cancelIconStyle: propTypes.object,
    itemIconStyle: propTypes.object,
  }),
};
