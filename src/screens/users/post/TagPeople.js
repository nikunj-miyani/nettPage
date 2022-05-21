import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useDispatch } from "react-redux";
import { searchIcon } from "../../../assets/icons";
import {
  CTSAvatar,
  CTSButtonsGradient,
  CTSHeader,
  CTSSeparator,
  CTSSimpleInput,
} from "../../../components";
import { colors, fontSizes, fonts } from "../../../constants";
import { __simpleToast } from "../../../utils/basicFunctions/SimpleToast";
import { __clearAllLocalData } from "../../../utils/basicFunctions/AsyncStorage";
import {
  __localSearch,
  __selectDeselect,
} from "../../../utils/basicFunctions/InitFunction";

const DATA = [
  {
    id: 1,
    profile_url: "https://wallpaperaccess.com/full/2213424.jpg",
    title: "Rosie Baker",
  },
  {
    id: 2,
    profile_url: "https://wallpaperaccess.com/full/2213424.jpg",
    title: "Lily Kim",
  },
  {
    id: 3,
    profile_url: "https://wallpaperaccess.com/full/2213424.jpg",
    title: "Lee min ho",
  },
  {
    id: 4,
    profile_url: "https://wallpaperaccess.com/full/2213424.jpg",
    title: "Isabella Jones",
  },
  {
    id: 5,
    profile_url: "https://wallpaperaccess.com/full/2213424.jpg",
    title: "Ruby Parker",
  },
];

export default function TagPeople({ navigation, route }) {
  const taggedPeople = route.params?.selectedPeople || [];
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const [selectPeople, setSelectPeople] = useState(taggedPeople);
  const [listUser, setListUser] = useState(DATA);
  const [listAllUser, setListAllUser] = useState(DATA);

  const renderItem = ({ item }) => {
    const isSelected =
      selectPeople.filter((fItem) => fItem.id === item.id).length === 0
        ? true
        : false;
    return (
      <View
        style={[styles.rowCenterStyle, { justifyContent: "space-between" }]}
      >
        <View style={styles.rowCenterStyle}>
          <CTSAvatar
            source={{ uri: item.profile_url }}
            imageStyle={{ borderRadius: 20, resizeMode: "cover" }}
            contentContainerStyle={{
              width: 40,
              height: 40,
            }}
          />
          <Text style={styles.titleStyle}>{item.title}</Text>
        </View>
        <View style={{ width: 80 }}>
          {isSelected ? (
            <CTSButtonsGradient
              title="Tag"
              height={35}
              leftComp={<View />}
              rightComp={<View />}
              titleStyle={{ fontSize: fontSizes.f14 }}
              onFullPress={() =>
                setSelectPeople([...__selectDeselect(item, selectPeople, "id")])
              }
            />
          ) : (
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() =>
                setSelectPeople([...__selectDeselect(item, selectPeople, "id")])
              }
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const goBackScreen = () => {
    navigation.navigate("CreatePost", {
      tagPeople: selectPeople,
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <CTSHeader
        title="Tag People"
        statusbarColor={colors.background}
        statusbarStyle="dark-content"
        onBackPress={() => goBackScreen()}
      />

      <View style={styles.containerViewStyle}>
        <CTSSimpleInput
          placeholder="Search here"
          value={searchText}
          leftSource={searchIcon}
          inputStyle={{ paddingLeft: 5 }}
          onChangeText={(text) => {
            setSearchText(text);
            if (text !== "") {
              setListUser(__localSearch(listAllUser, text));
            } else {
              setListUser(listAllUser);
            }
          }}
        />

        <FlatList
          data={listUser}
          style={{ paddingTop: 30 }}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
          ItemSeparatorComponent={() => <CTSSeparator />}
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
  },
  containerViewStyle: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  rowCenterStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleStyle: {
    fontSize: fontSizes.f15,
    fontFamily: fonts.sairaMediumFont,
    color: colors.midnightblue,
    marginLeft: 15,
  },
  removeButton: {
    borderWidth: 1,
    borderColor: colors.lightslategray,
    height: 35,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  removeButtonText: {
    color: colors.lightslategray,
    fontSize: fontSizes.f14,
    fontFamily: fonts.sairaMediumFont,
  },
});
