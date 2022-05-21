import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import mystyle from "../../../assets/styles/mystyle";
import { CTSButtonsGradient, CTSMapList, CTSShadow } from "../../../components";
import { colors, fonts, fontSizes } from "../../../constants";
import { __simpleToast } from "../../../utils/basicFunctions/SimpleToast";
import {
  __createGroup,
  __selectDeselect,
} from "../../../utils/basicFunctions/InitFunction";

const width = Dimensions.get("screen").width;

const DATA = [
  { id: 1, offer: "Food" },
  { id: 2, offer: "Music" },
  { id: 3, offer: "Books" },
  { id: 4, offer: "Fashion" },
  { id: 5, offer: "Financial" },
  { id: 6, offer: "Travel" },
  { id: 7, offer: "Sport" },
  { id: 8, offer: "Shopping" },
  { id: 9, offer: "Fast Food" },
  { id: 10, offer: "Health" },
  { id: 11, offer: "Gadgets" },
  { id: 12, offer: "Cars" },
  { id: 13, offer: "Food" },
  { id: 14, offer: "Music" },
  { id: 15, offer: "Books" },
  { id: 16, offer: "Fashion" },
  { id: 17, offer: "Financial" },
  { id: 18, offer: "Travel" },
  { id: 19, offer: "Sport" },
  { id: 20, offer: "Shopping" },
  { id: 21, offer: "Fast Food" },
  { id: 22, offer: "Health" },
  { id: 23, offer: "Gadgets" },
  { id: 24, offer: "Cars" },
  // { id: 25, offer: "Food" },
  // { id: 26, offer: "Music" },
  // { id: 27, offer: "Books" },
  // { id: 28, offer: "Fashion" },
  // { id: 29, offer: "Financial" },
  // { id: 30, offer: "Travel" },
  // { id: 31, offer: "Sport" },
  // { id: 32, offer: "Shopping" },
  // { id: 33, offer: "Fast Food" },
  // { id: 34, offer: "Health" },
  // { id: 35, offer: "Gadgets" },
  // { id: 36, offer: "Cars" },
];

export default function GetOffers({ navigation }) {
  const dispatch = useDispatch();

  const [data, setData] = useState();
  const [selectedOffer, setSelectedOffer] = useState([]);

  useEffect(() => {
    setData(__createGroup(DATA, 12));
  }, []);

  const renderItem = ({ item, index }) => {
    const isSelected =
      selectedOffer.filter((fItem) => fItem.id === item.id).length === 0
        ? true
        : false;
    return (
      <View
        style={{
          width: width / 3 - 40,
          marginHorizontal: 10,
        }}
      >
        {!isSelected ? (
          <CTSButtonsGradient
            title={item.offer}
            onFullPress={() =>
              setSelectedOffer([...__selectDeselect(item, selectedOffer)])
            }
            leftComp={<View />}
            rightComp={<View />}
            contentContainerStyle={{
              justifyContent: "center",
              borderRadius: 20,
            }}
            titleStyle={{
              flex: 0,
              fontSize: fontSizes.f15,
              fontFamily: fonts.sairaMediumFont,
            }}
          />
        ) : (
          <TouchableOpacity
            onPress={() =>
              setSelectedOffer([...__selectDeselect(item, selectedOffer)])
            }
          >
            <View style={styles.dSelectButton}>
              <Text style={{ color: colors.dimgray }}>{item.offer}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={mystyle.rootContainer}>
      <SafeAreaView />
      <CTSShadow style={styles.shadowStyle}>
        <View style={styles.contentContainerStyle}>
          <View style={{ marginHorizontal: 20 }}>
            <Text style={styles.titleText}>
              Would you like to get offers about these ?
            </Text>
          </View>
          <FlatList
            data={data}
            renderItem={({ item, index }) => {
              return (
                <CTSMapList
                  data={item}
                  numColumns={3}
                  style={{ marginTop: 30 }}
                  ItemSeparatorComponent={<View height={20} />}
                  renderItem={renderItem}
                />
              );
            }}
            bounces={true}
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            ListEmptyComponent={
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  No data found!
                </Text>
              </View>
            }
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          />
        </View>
      </CTSShadow>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginHorizontal: 20,
        }}
      >
        <Text style={styles.skipText}>Skip</Text>
        <Text style={styles.nextText}>Done</Text>
      </View>
      <SafeAreaView />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    marginTop: 80,
    padding: 30,
    backgroundColor: colors.white,
    borderTopRightRadius: 67,
    borderBottomLeftRadius: 67,
  },
  titleText: {
    fontSize: fontSizes.f20,
    color: colors.midnightblue,
    fontFamily: fonts.sairaSemiBoldFont,
    textAlign: "center",
  },
  shadowStyle: {
    shadowColor: colors.steelblue,
    shadowRadius: 8,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  dSelectButton: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.dimgray,
    borderRadius: 20,
    height: 46,
  },
  skipText: {
    fontSize: fontSizes.f20,
    color: colors.lightslategray,
    fontFamily: fonts.sairaMediumFont,
  },
  nextText: {
    fontSize: fontSizes.f20,
    color: colors.midnightblue,
    fontFamily: fonts.sairaMediumFont,
  },
});
