import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import {
  commentIcon,
  likeIcon,
  menuIcon,
  sendIcon,
  unlikeIcon,
} from "../../../assets/icons";
import { sampleImg } from "../../../assets/images";
import {
  CTSAvatar,
  CTSIcon,
  CTSMenu,
  CTSShadow,
  CTSTextMoreLessView,
} from "../../../components";
import { colors, fonts, fontSizes } from "../../../constants";

const DATA = [
  {
    userIcon: sampleImg,
    userName: "Levi Garcia",
    created_time: "2 hr ago",
    like_count: "200",
    comment_count: 200,
    send_count: 2,
    isLike: true,
    description:
      " @Prada Watch #Exquisiteprada live from Milandsd on February 25 at 3pm CET.@Prada Watch #Exquisiteprada live from Milandsd on February 25 at 3pm CET.",
  },
  {
    userIcon: sampleImg,
    userName: "Levi Garcia",
    created_time: "2 hr ago",
    like_count: "200",
    comment_count: 200,
    send_count: 2,
    isLike: true,
    description:
      " @Prada Watch #Exquisiteprada live from Milandsd on February 25 at 3pm CET. #Exquisiteprada",
  },
  {
    userIcon: sampleImg,
    userName: "Levi Garcia",
    created_time: "2 hr ago",
    like_count: "200",
    comment_count: 200,
    send_count: 2,
    isLike: true,
    description:
      " @Prada Watch #Exquisiteprada live from Milandsd on February 25 at 3pm CET. #Exquisiteprada",
  },
  {
    userIcon: sampleImg,
    userName: "Levi Garcia",
    created_time: "2 hr ago",
    like_count: "200",
    comment_count: 200,
    send_count: 2,
    isLike: true,
    description:
      " @Prada Watch #Exquisiteprada live from Milandsd on February 25 at 3pm CET. #Exquisiteprada",
  },
];

export default function ProfileTag() {
  const [tagData, setTagData] = useState(DATA);
  const gfRenderItem = ({ item, index }) => {
    return (
      <CTSShadow style={styles.tagCardStyle}>
        <View
          style={{
            backgroundColor: colors.white,
            padding: 10,
            borderRadius: 10,
          }}
        >
          <View
            style={[styles.rowCenterStyle, { justifyContent: "space-between" }]}
          >
            <View style={styles.rowCenterStyle}>
              <CTSAvatar disabled source={sampleImg} size={40} />

              <View style={{ marginLeft: 8 }}>
                <View style={styles.rowCenterStyle}>
                  <Text style={styles.userNameStyle}>{item.userName}</Text>
                </View>
                <Text style={styles.timeTextStyle}>{item.created_time}</Text>
              </View>
            </View>

            <CTSMenu
              source={menuIcon}
              data={[
                {
                  title: "Remove Tag",
                  onPress: () => {
                    console.log("Remove Tag Press");
                  },
                },
              ]}
            />
          </View>
          <View style={styles.tagItemContainerStyle}>
            <View style={{ width: 20 }} />
            <CTSAvatar disabled source={sampleImg} size={60} />
            <View style={{ marginHorizontal: 10, flex: 1 }}>
              {/* <Text style={styles.tagItemDescriptionStyle}>
                {item.description}
              </Text> */}
              <CTSTextMoreLessView
                textStyle={styles.tagItemDescriptionStyle}
                text={item.description}
                numberOfCharacter={100}
              />

              <View style={[styles.rowCenterStyle, { marginTop: 5 }]}>
                <View style={[styles.rowCenterStyle, { marginRight: 15 }]}>
                  <CTSIcon
                    source={item.isLike ? likeIcon : unlikeIcon}
                    iconStyle={styles.tagItemIconStyle}
                  />
                  <Text style={styles.counterTextStyle}>{item.like_count}</Text>
                </View>
                <View style={[styles.rowCenterStyle, { marginRight: 15 }]}>
                  <CTSIcon
                    source={commentIcon}
                    iconStyle={styles.tagItemIconStyle}
                  />
                  <Text style={styles.counterTextStyle}>
                    {item.comment_count}
                  </Text>
                </View>
                <View style={styles.rowCenterStyle}>
                  <CTSIcon
                    source={sendIcon}
                    iconStyle={styles.tagItemIconStyle}
                  />
                  <Text style={styles.counterTextStyle}>{item.send_count}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </CTSShadow>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View style={{ height: 20 }} />}
        ListFooterComponent={<View style={{ height: 20 }} />}
        data={tagData}
        renderItem={gfRenderItem}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tagCardStyle: {
    marginHorizontal: 20,
    shadowColor: colors.steelblue,
    shadowRadius: 5,
    shadowOpacity: 0.21,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  timeTextStyle: {
    fontSize: fontSizes.f10,
    fontFamily: fonts.sairaMediumFont,
    color: colors.lightslategray,
  },
  userNameStyle: {
    fontSize: fontSizes.f15,
    fontFamily: fonts.sairaSemiBoldFont,
    color: colors.midnightblue,
  },
  rowCenterStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemStyle: {
    color: colors.secondary,
    fontSize: fontSizes.f14,
    fontFamily: fonts.sairaRegularFont,
  },
  tagItemContainerStyle: {
    marginTop: 10,
    flexDirection: "row",
  },
  tagItemDescriptionStyle: {
    color: colors.secondary,
    fontSize: fontSizes.f12,
    fontFamily: fonts.sairaRegularFont,
    flex: 1,
  },
  counterTextStyle: {
    fontSize: fontSizes.f11,
    fontFamily: fonts.sairaSemiBoldFont,
    color: colors.secondary,
    marginLeft: 5,
  },
  tagItemIconStyle: { width: 20, height: 20 },
});
