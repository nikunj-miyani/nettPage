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

export default function Home({ navigation }) {
  const [isLike, setIsLike] = useState(false);
  const [currentIndex, setCurrentIndex] = useState("");

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
      <SafeAreaView />
      <CTSHeader
        statusbarColor={colors.background}
        statusbarStyle="dark-content"
        headerContainerStyle={{ paddingTop: 10 }}
        leftComp={
          <View style={styles.rowCenterStyle}>
            <CTSIcon
              disabled
              source={logoImg}
              iconStyle={{ width: 35, height: 35 }}
            />
            <Text style={styles.headerText}>Nettpage</Text>
          </View>
        }
        rightComp={
          <View>
            <CTSIcon
              source={messageIcon}
              iconStyle={{ width: 25, height: 25 }}
            />
          </View>
        }
      />
      <View style={{ flex: 1, paddingTop: 15 }}>
        <View style={[styles.rowCenterStyle, { marginVertical: 10 }]}>
          <CTSIcon
            disabled
            source={sampleImg2}
            iconStyle={{ width: 40, height: 40 }}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <TouchableOpacity
              style={styles.postButton}
              onPress={() => navigation.navigate("CreatePost")}
            >
              <Text style={styles.postText}>Write something here...</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={DATA}
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
      </View>
      <SafeAreaView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
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
