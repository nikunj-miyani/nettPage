import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ViewPropTypes,
  StatusBar,
} from "react-native";
import PropTypes from "prop-types";
import { leftArrowIcon } from "../assets/icons";
import { colors, fontSizes } from "../constants";
import __stylesFunc, {
  __themeStyleFunc,
} from "../utils/basicFunctions/StylesFunc";
import themeStyles from "../assets/styles/themestyles";

export function CTHeader({
  title,
  headerTitleStyle,
  subtitle,
  headerSubtitleStyle,
  source,
  onBackPress,
  backButtonStyle,
  backIconStyle,
  headerAlign,
  rightComp,
  rightCompContainerStyle,
  leftComp,
  headerColor,
  leftCompContainerStyle,
  headerContainerStyle,
  statusbarStyle,
  statusbarColor,
  isLeftBlank,
  isRightFull,
  useBackDrop,
  noStatusBar,
  backDropStyle,
  style,
}) {
  style = __themeStyleFunc(style, themeStyles.CTHeader);

  headerContainerStyle = __stylesFunc(
    headerContainerStyle,
    style,
    "headerContainerStyle"
  );

  backButtonStyle = __stylesFunc(backButtonStyle, style, "backButtonStyle");
  backIconStyle = __stylesFunc(backIconStyle, style, "backIconStyle");
  leftCompContainerStyle = __stylesFunc(
    leftCompContainerStyle,
    style,
    "leftCompContainerStyle"
  );
  headerSubtitleStyle = __stylesFunc(
    headerSubtitleStyle,
    style,
    "headerSubtitleStyle"
  );
  headerTitleStyle = __stylesFunc(headerTitleStyle, style, "headerTitleStyle");
  rightCompContainerStyle = __stylesFunc(
    rightCompContainerStyle,
    style,
    "rightCompContainerStyle"
  );
  backDropStyle = __stylesFunc(backDropStyle, style, "backDropStyle");
  return (
    <View
      style={[
        styles.headerContainerStyle,
        { backgroundColor: headerColor || colors.white },
        ...headerContainerStyle,
      ]}
    >
      {!noStatusBar && (
        <StatusBar
          barStyle={statusbarStyle || "dark-content"}
          backgroundColor={statusbarColor || headerColor || "white"}
        />
      )}

      {onBackPress && onBackPress !== null ? (
        <TouchableOpacity
          style={[styles.backButtonStyle, ...backButtonStyle]}
          onPress={onBackPress}
        >
          {useBackDrop ? (
            <View style={styles.backDropStyle}>
              <Image
                style={[
                  styles.backIconStyle,
                  { tintColor: colors.white },
                  ...backIconStyle,
                ]}
                source={source || leftArrowIcon}
              />
            </View>
          ) : (
            <Image
              style={[
                styles.backIconStyle,
                { tintColor: colors.dimgray },
                ...backIconStyle,
              ]}
              source={source || leftArrowIcon}
            />
          )}
        </TouchableOpacity>
      ) : leftComp ? (
        <View
          style={[styles.leftCompContainerStyle, ...leftCompContainerStyle]}
        >
          {leftComp}
        </View>
      ) : isLeftBlank ? null : (
        <View style={{ width: 60, height: "100%" }} />
      )}
      <View
        style={{
          flex: 1,
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Text
          numberOfLines={1}
          style={[
            styles.headerTitleStyle,
            { textAlign: headerAlign || "center" },
            ...headerTitleStyle,
          ]}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={[
              styles.headerSubtitleStyle,
              {
                textAlign: headerAlign || "center",
              },
              ...headerSubtitleStyle,
            ]}
          >
            {subtitle}
          </Text>
        )}
      </View>
      {!isRightFull ? (
        <View
          style={[styles.rightCompContainerStyle, ...rightCompContainerStyle]}
        >
          {rightComp}
        </View>
      ) : (
        rightComp
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  rightCompContainerStyle: {
    height: "100%",
    width: 80,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  headerSubtitleStyle: {
    width: "100%",
  },
  headerTitleStyle: {
    width: "100%",
  },
  leftCompContainerStyle: {
    height: "100%",
    width: 150,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerContainerStyle: {
    height: 45,
    alignItems: "center",
    flexDirection: "row",
  },
  backButtonStyle: {
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  backDropStyle: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    width: 35,
    height: 35,
  },
  backIconStyle: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
});

CTHeader.propTypes = {
  title: PropTypes.string,
  headerTitleStyle: PropTypes.object,
  subtitle: PropTypes.string,
  headerSubtitleStyle: PropTypes.object,
  source: PropTypes.any,
  onBackPress: PropTypes.func,
  backButtonStyle: PropTypes.object,
  backIconStyle: PropTypes.object,
  headerAlign: PropTypes.oneOf(["auto", "center", "left", "right", "justify"]),
  rightComp: PropTypes.object,
  rightCompContainerStyle: PropTypes.object,
  leftComp: PropTypes.object,
  leftCompContainerStyle: PropTypes.object,
  headerContainerStyle: PropTypes.object,
  headerColor: PropTypes.string,
  statusbarStyle: PropTypes.string,
  statusbarColor: PropTypes.string,
  noStatusBar: PropTypes.bool,
  style: PropTypes.shape({
    headerTitleStyle: PropTypes.object,
    headerSubtitleStyle: PropTypes.object,
    backButtonStyle: ViewPropTypes.style,
    backIconStyle: PropTypes.object,
    rightCompContainerStyle: PropTypes.object,
    leftCompContainerStyle: ViewPropTypes.style,
    headerContainerStyle: ViewPropTypes.style,
  }),
};
