import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import colors from "../constants/colors";
import __stylesFunc, {
  __themeStyleFunc,
} from "../utils/basicFunctions/StylesFunc";
import { fonts, fontSizes } from "../constants";
import {
  CTSIcon,
  CTSImageView,
  CTSMenu,
  CTSShadow,
  CTSTextMoreLessView,
  CTSVideoView,
} from ".";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import { sampleImg2 } from "../assets/images";
import {
  commentIcon,
  likeIcon,
  menuIcon,
  savedIcon,
  sendIcon,
  timerIcon,
  unlikeIcon,
  verifyIcon,
} from "../assets/icons";

export function CTPost({
  item,
  index,
  currentIndex,
  isLike,
  onPressLike,
  onPressComment,
  onPressSend,
  onPressSaved,
  saveButtonVisible,
  menuData,
}) {
  saveButtonVisible =
    saveButtonVisible === undefined ? true : saveButtonVisible;

  let _menu = null;

  const setMenuRef = (ref, index) => {
    _menu = ref;
  };

  const hideMenu = async (index) => {
    await _menu.hide();
  };

  const showMenu = (index) => {
    _menu.show();
  };

  return (
    <CTSShadow style={styles.shadowContainerStyle}>
      <View style={styles.cardContainerStyle}>
        <View
          style={[styles.rowCenterStyle, { justifyContent: "space-between" }]}
        >
          <View style={styles.rowCenterStyle}>
            <CTSIcon
              disabled
              source={sampleImg2}
              iconStyle={{ width: 40, height: 40 }}
            />
            <View style={{ marginLeft: 8 }}>
              <View style={styles.rowCenterStyle}>
                <Text style={styles.titleText}>{item.title}</Text>
                {item.verified && (
                  <CTSIcon
                    disabled
                    source={verifyIcon}
                    iconContainerStyle={{ marginLeft: 5 }}
                    iconStyle={{ width: 20, height: 20 }}
                  />
                )}
              </View>
              <Text style={styles.subTitleText}>{item.created_time}</Text>
            </View>
          </View>

          <CTSMenu source={menuIcon} data={menuData} />
        </View>

        <View style={{ marginVertical: 15 }}>
          <CTSTextMoreLessView
            text={item.discription}
            numberOfCharacter={100}
          />
        </View>

        {!item.text && (
          <View style={styles.rowCenterStyle}>
            <CTSIcon
              disabled
              source={timerIcon}
              iconStyle={{ width: 25, height: 25 }}
            />
            <Text style={styles.timerText}>{item.ending_time}</Text>
          </View>
        )}
        {item.image && (
          <View style={{ marginVertical: 15 }}>
            <CTSImageView source={{ uri: item.offer_url }} pinchableZoom />
          </View>
        )}
        {item.video && (
          <View style={{ marginVertical: 15 }}>
            <CTSVideoView
              source={item.offer_url}
              onPress={() => console.log("Video pressed")}
              isPausedVideo={index !== currentIndex}
            />
          </View>
        )}
        <View
          style={[
            styles.rowCenterStyle,
            { justifyContent: "space-between", marginBottom: 5 },
          ]}
        >
          <View style={styles.rowCenterStyle}>
            <View style={[styles.rowCenterStyle, { marginRight: 15 }]}>
              <CTSIcon
                // disabled={onPressLike ? true : false}
                source={isLike ? likeIcon : unlikeIcon}
                iconStyle={{ width: 20, height: 20 }}
                onPress={!onPressLike ? null : () => onPressLike(item)}
              />
              <Text style={styles.iconsText}>{item.like_count}</Text>
            </View>
            <View style={[styles.rowCenterStyle, { marginRight: 15 }]}>
              <CTSIcon
                // disabled={onPressComment ? true : false}
                source={commentIcon}
                iconStyle={{ width: 20, height: 20 }}
                onPress={!onPressComment ? null : () => onPressComment(item)}
              />
              <Text style={styles.iconsText}>{item.comment_count}</Text>
            </View>
            <View style={styles.rowCenterStyle}>
              <CTSIcon
                // disabled={onPressSend ? true : false}
                source={sendIcon}
                iconStyle={{ width: 20, height: 20 }}
                onPress={!onPressSend ? null : () => onPressSend(item)}
              />
              <Text style={styles.iconsText}>{item.send_count}</Text>
            </View>
          </View>
          {saveButtonVisible && (
            <CTSIcon
              disabled={onPressSaved ? true : false}
              source={savedIcon}
              iconStyle={{ width: 20, height: 20 }}
              onPress={!onPressSaved ? null : () => onPressSaved(item)}
            />
          )}
        </View>
      </View>
    </CTSShadow>
  );
}
const styles = StyleSheet.create({
  shadowContainerStyle: {
    shadowColor: colors.lavender,
    shadowRadius: 2,
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
  cardContainerStyle: {
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 20,
  },
  rowCenterStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: fontSizes.f15,
    fontFamily: fonts.sairaSemiBoldFont,
    color: colors.midnightblue,
  },
  subTitleText: {
    fontSize: fontSizes.f10,
    fontFamily: fonts.sairaMediumFont,
    color: colors.lightslategray,
  },
  timerText: {
    fontSize: fontSizes.f11,
    fontFamily: fonts.sairaMediumFont,
    color: colors.darkgreen,
    marginLeft: 5,
  },
  iconsText: {
    fontSize: fontSizes.f11,
    fontFamily: fonts.sairaSemiBoldFont,
    color: colors.secondary,
    marginLeft: 5,
  },
});
