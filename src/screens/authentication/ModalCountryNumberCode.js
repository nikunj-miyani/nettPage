import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import {
  arrowDownIcon,
  checkIcon,
  closeCircleIcon,
  searchIcon,
} from "../../assets/icons";
import { CTSIcon, CTSInput, CTSSimpleModal } from "../../components";
import { colors, fonts, fontSizes } from "../../constants";
import { __localSearch } from "../../utils/basicFunctions/InitFunction";

export default function ModalCountryNumberCode({
  data,
  countryPhoneCode,
  setCountryPhoneCode,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [tempData, setTempData] = useState([]);

  React.useEffect(() => {
    setFilterData(data);
  }, [isVisible]);

  const renderItem = ({ item }) => {
    const isSelected = countryPhoneCode == item.phone;

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={[styles.listItemContainerStyle]}
        onPress={() => {
          setCountryPhoneCode(item.phone);
          setIsVisible(false);
        }}
      >
        <Text
          style={[
            styles.listItemTextStyle,
            {
              fontFamily: isSelected
                ? fonts.sairaBoldFont
                : fonts.sairaRegularFont,
            },
          ]}
        >
          ({item.phone}) {item.label}
        </Text>
        {isSelected && (
          <CTSIcon
            source={checkIcon}
            iconStyle={{ tintColor: colors.secondary }}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <CTSSimpleModal
        isVisible={isVisible}
        onDismiss={setIsVisible}
        itemContainerStyle={{
          width: "100%",
          height: "100%",
          borderRadius: 0,
          backgroundColor: colors.aliceblue,
        }}
      >
        <SafeAreaView />
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            marginHorizontal: 15,
          }}
        >
          <CTSInput
            containerStyle={{ flex: 1 }}
            onFocus={() => {
              setTempData(filterData);
            }}
            inputStyle={{
              height: 40,
              paddingLeft: 0,
              backgroundColor: colors.background,
            }}
            onChangeText={(text) => {
              if (text !== "") {
                setFilterData(__localSearch(tempData, text));
              } else {
                setFilterData(tempData);
              }
            }}
            leftSource={searchIcon}
            leftIconStyle={{
              width: 20,
              height: 20,
            }}
            leftIconContainerStyle={{ backgroundColor: colors.background }}
            placeholder="Type here to search"
          />
          <View style={{ width: 10 }} />
          <CTSIcon
            source={closeCircleIcon}
            iconStyle={{ height: 40, width: 40 }}
            onPress={() => setIsVisible(false)}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filterData}
          extraData={filterData}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
        />
      </CTSSimpleModal>
      <TouchableOpacity
        style={styles.dropdownContainerStyle}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.selectedCountryTextStyle}>+{countryPhoneCode}</Text>
        <Image source={arrowDownIcon} style={[styles.rightIconStyle]} />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rightIconStyle: {
    width: 20,
    height: 20,
    alignSelf: "center",
  },
  dropdownContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "30%",

    borderWidth: 1,
    borderColor: colors.gainsboro,
    borderRadius: 10,
    marginTop: 5,
    paddingHorizontal: 10,
  },
  selectedCountryTextStyle: {
    fontSize: fontSizes.f14,
    fontFamily: fonts.sairaBoldFont,
    color: colors.secondary,
  },
  listItemContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,

    borderRadius: 10,
  },
  listItemTextStyle: {
    color: colors.secondary,
    fontSize: fontSizes.f14,
  },
});
