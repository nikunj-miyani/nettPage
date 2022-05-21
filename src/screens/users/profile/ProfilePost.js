import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { messageIcon } from "../../../assets/icons";
import { logoImg, sampleImg2 } from "../../../assets/images";
import { CTSHeader, CTSIcon, CTSInput, CTSPost } from "../../../components";
import { colors, fonts, fontSizes } from "../../../constants";

const DATA = [
  {
    title: "Prada",
    created_time: "2 hr ago",
    verified: true,
    discription: "Hurry up !!!! \nMega Sale Up to 30% off Limited time only",
    ending_time: "Only 1 hr Left",
    image: true,
    offer_url:
      "https://img.freepik.com/free-vector/special-offer-sale-discount-banner_180786-46.jpg",
    like_count: 5514,
    comment_count: 525,
    send_count: 5,
  },
  {
    title: "Bata",
    created_time: "3 hr ago",
    verified: false,
    discription:
      "Watch #Exquisiteprada live from Milan on April 25 at 3pm CET. #Exquisiteprada",
    ending_time: "Only 30 min Left",
    video: true,
    offer_url:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4",
    like_count: 2105,
    comment_count: 200,
    send_count: 2,
  },
  {
    title: "Prada",
    created_time: "2 hr ago",
    verified: true,
    discription: "Hurry up !!!! \nMega Sale Up to 30% off Limited time only",
    ending_time: "Only 1 hr Left",
    image: true,
    offer_url:
      "https://t4.ftcdn.net/jpg/03/88/05/51/360_F_388055190_WzDThfpBOy3nrnVyc45atQkdITTXnnR9.jpg",
    like_count: 5514,
    comment_count: 525,
    send_count: 5,
  },
  {
    title: "Bata",
    created_time: "3 hr ago",
    verified: false,
    discription:
      "Watch #Exquisiteprada live from Milan on April 25 at 3pm CET. #Exquisiteprada",
    ending_time: "Only 30 min Left",
    video: true,
    offer_url:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4",
    like_count: 2105,
    comment_count: 200,
    send_count: 2,
  },
  {
    title: "Bata",
    created_time: "3 hr ago",
    verified: false,
    discription:
      "Watch #Exquisiteprada live from Milan on April 25 at 3pm CET. #Exquisiteprada \nWatch #Exquisiteprada live from Milan on April 25 at 3pm CET. #Exquisiteprada.",
    ending_time: "Only 30 min Left",
    text: true,
    like_count: 2105,
    comment_count: 200,
    send_count: 2,
  },
];

export default function ProfilePost() {
  const [isLike, setIsLike] = useState(false);
  const [currentIndex, setCurrentIndex] = useState("");
  const [postData, setPostData] = useState(DATA);

  const renderItem = ({ item, index }) => {
    return (
      <CTSPost
        item={item}
        index={index}
        currentIndex={currentIndex}
        isLike={isLike}
        onPressLike={() => console.log("Like")}
        onPressComment={() => console.log("Comment")}
        onPressSend={() => console.log("Send")}
        onPressSaved={() => console.log("Saved")}
        menuData={[
          {
            title: "Archive",
            onPress: () => {
              console.log("Archive");
            },
          },
          {
            title: "Edit",
            onPress: () => {
              console.log("Edit");
            },
          },
          {
            title: "Delete",
            onPress: () => {
              console.log("Delete");
            },
          },
        ]}
      />
    );
  };

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length) {
      setCurrentIndex(viewableItems[0]?.index);
    }
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 75 });

  return (
    <View style={styles.container}>
      <FlatList
        data={postData}
        renderItem={renderItem}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={<View style={{ height: 15 }} />}
        ListFooterComponent={<View style={{ height: 15 }} />}
        ListEmptyComponent={
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              No data found!
            </Text>
          </View>
        }
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />

      <SafeAreaView />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
  headerText: {
    fontSize: fontSizes.f18,
    fontFamily: fonts.sairaSemiBoldFont,
    color: colors.midnightblue,
    marginLeft: 8,
  },
  rowCenterStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  postButton: {
    height: 40,
    paddingLeft: 15,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.gainsboro,
    borderRadius: 10,
  },
  postText: {
    fontSize: fontSizes.f13,
    color: colors.lightslategray,
    fontFamily: fonts.sairaMediumFont,
  },
});
