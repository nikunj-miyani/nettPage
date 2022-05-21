import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ViewPropTypes,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import propTypes from "prop-types";
import { deleteIcon, pencilIcon, profileEditIcon } from "../assets/icons";
import { userPlaceHolder } from "../assets/images";
import themeStyles from "../assets/styles/themestyles";
import { colors } from "../constants";
import __stylesFunc, {
  __themeStyleFunc,
} from "../utils/basicFunctions/StylesFunc";
import LinearGradient from "react-native-linear-gradient";

export default function CTAvatar({
  onPressEdit,
  onPress,
  onPressDelete,
  imagePlaceholderSource,
  source,
  editComp,
  deleteComp,
  // editIconSource,
  // deleteIconSource,
  size,
  borderWidth,
  imagePlaceholderStyle,
  imageStyle,
  style,
  editIconStyle,
  editIconContainerStyle,
  deleteIconStyle,
  deleteIconContainerStyle,
  contentContainerStyle,
}) {
  const [imagePlaceholder, setImagePlaceholder] = React.useState(
    imagePlaceholderSource
  );
  style = __themeStyleFunc(style, themeStyles.CTAvatar);

  size = size == null || size == undefined ? 100 : size;

  borderWidth =
    borderWidth !== null || borderWidth !== undefined ? borderWidth : 2;

  contentContainerStyle = __stylesFunc(
    contentContainerStyle,
    style,
    "contentContainerStyle"
  );

  imagePlaceholderStyle = __stylesFunc(
    imagePlaceholderStyle,
    style,
    "imagePlaceholderStyle"
  );
  imageStyle = __stylesFunc(imageStyle, style, "imageStyle");
  editIconContainerStyle = __stylesFunc(
    editIconContainerStyle,
    style,
    "editIconContainerStyle"
  );
  deleteIconContainerStyle = __stylesFunc(
    deleteIconContainerStyle,
    style,
    "deleteIconContainerStyle"
  );
  deleteIconStyle = __stylesFunc(deleteIconStyle, style, "deleteIconStyle");
  editIconStyle = __stylesFunc(editIconStyle, style, "editIconStyle");

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[
        {
          width: size,
          height: size,
          borderWidth,
        },
        styles.contentContainerStyle,
        ...contentContainerStyle,
      ]}
    >
      <ImageBackground
        source={imagePlaceholder}
        style={[styles.imagePlaceholderStyle, ...imagePlaceholderStyle]}
        resizeMode={imagePlaceholderStyle?.[0].resizeMode || "contain"}
      >
        <FastImage
          style={[styles.imageStyle, ...imageStyle]}
          source={source}
          resizeMode={imageStyle?.[0].resizeMode || "contain"}
          onLoad={() => {
            setImagePlaceholder(null);
          }}
        />
      </ImageBackground>
      {onPressEdit && (
        <>
          {!editComp && (
            <TouchableOpacity onPress={onPressEdit} activeOpacity={1}>
              <LinearGradient
                colors={[colors.gradientStart, colors.gradientEnd]}
                useAngle={true}
                style={[
                  styles.editIconContainerStyle,
                  ...editIconContainerStyle,
                ]}
                angle={90}
                locations={[0.2, 0.8]}
              >
                <FastImage
                  source={profileEditIcon || pencilIcon}
                  style={[styles.editIconStyle, ...editIconStyle]}
                  tintColor={colors.white}
                />
              </LinearGradient>
            </TouchableOpacity>
          )}
          {editComp && (
            <View
              style={[styles.editIconContainerStyle, ...editIconContainerStyle]}
            >
              {editComp}
            </View>
          )}
        </>
      )}
      {onPressDelete && (
        <>
          {!deleteComp && (
            <TouchableOpacity
              onPress={onPressDelete}
              activeOpacity={1}
              style={[
                styles.deleteIconContainerStyle,
                ...deleteIconContainerStyle,
              ]}
            >
              <FastImage
                source={deleteIcon}
                tintColor={colors.white}
                style={[styles.deleteIconStyle, ...deleteIconStyle]}
              />
            </TouchableOpacity>
          )}
          {deleteComp && (
            <View
              style={[
                styles.deleteIconContainerStyle,
                ...deleteIconContainerStyle,
              ]}
            >
              {deleteComp}
            </View>
          )}
        </>
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  contentContainerStyle: {},
  imagePlaceholderStyle: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 10,
  },
  imageStyle: {
    flex: 1,
  },
  editIconContainerStyle: {
    position: "absolute",
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    bottom: -10,
    right: -10,
  },
  deleteIconContainerStyle: {
    position: "absolute",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    bottom: 5,
    left: 0,
  },
  deleteIconStyle: {
    width: 16,
    height: 16,
  },
  editIconStyle: {
    width: 20,
    height: 20,
  },
});
CTAvatar.propTypes = {
  onPressEdit: propTypes.func,
  onPress: propTypes.func,
  onPressDelete: propTypes.func,
  // imagePlaceholderSource,
  // source: propTypes.string,
  size: propTypes.number,
  borderWidth: propTypes.number,
  imagePlaceholderStyle: ViewPropTypes.style,
  imageStyle: propTypes.object,
  editIconStyle: propTypes.object,
  editIconContainerStyle: ViewPropTypes.style,
  deleteIconStyle: propTypes.object,
  deleteIconContainerStyle: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  style: propTypes.shape({
    imagePlaceholderStyle: ViewPropTypes.style,
    imageStyle: propTypes.object,
    editIconStyle: propTypes.object,
    editIconContainerStyle: ViewPropTypes.style,
    deleteIconStyle: propTypes.object,
    deleteIconContainerStyle: ViewPropTypes.style,
    contentContainerStyle: ViewPropTypes.style,
  }),
};
