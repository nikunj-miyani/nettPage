import React from "react";
import {
  Modal,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ViewPropTypes,
} from "react-native";
import propTypes from "prop-types";
import { CTSButton, CTSIcon, CTSInput, CTSShadow } from ".";

import {
  arrowDownIcon,
  closeIcon,
  checkIcon,
  closeCircleIcon,
  searchIcon,
} from "../assets/icons";
import { colors, fontSizes } from "../constants";
import __stylesFunc, {
  __themeStyleFunc,
} from "../utils/basicFunctions/StylesFunc";
import themeStyles from "../assets/styles/themestyles";
import { __localSearch } from "../utils/basicFunctions/InitFunction";

export default function CTSelectBoxDropdown({
  data,
  multiSelect,
  selectedItem,
  getSelectedData,
  itemTitleKey,
  // searchableKey,
  closeVisible,
  style,
  title,
  titleStyle,
  listItemContainerStyle,
  modalSelectedItemTextStyle,
  modalItemTextStyle,
  checkIconStyle,
  checkIconContainerStyle,
  // searchBoxStyle,
  buttonContainerStyle,
  buttonTitleStyle,
  dropdownBoxContainerStyle,
  dropdownSelectedItemContainerStyle,
  dropdownSelectedItemContainerTextStyle,
  dropdownSelectedItemTextStyle,
  rightIconContainerStyle,
  rightIconStyle,
  placeholderTextStyle,
  placeholderContainerTextStyle,
  clearButtonContainerStyle,
  clearButtonTextStyle,
  placeholder,
  onConfirm,
  onCancel,
  onClearAll,
  onDropDown,
}) {
  style = __themeStyleFunc(style, themeStyles.CTSelectBoxDropdown);
  titleStyle = __stylesFunc(titleStyle, style, "titleStyle");
  listItemContainerStyle = __stylesFunc(
    listItemContainerStyle,
    style,
    "listItemContainerStyle"
  );
  modalSelectedItemTextStyle = __stylesFunc(
    modalSelectedItemTextStyle,
    style,
    "modalSelectedItemTextStyle"
  );
  modalItemTextStyle = __stylesFunc(
    modalItemTextStyle,
    style,
    "modalItemTextStyle"
  );
  checkIconStyle = __stylesFunc(checkIconStyle, style, "checkIconStyle");
  checkIconContainerStyle = __stylesFunc(
    checkIconContainerStyle,
    style,
    "checkIconContainerStyle"
  );
  placeholderTextStyle = __stylesFunc(
    placeholderTextStyle,
    style,
    "placeholderTextStyle"
  );

  // searchBoxStyle = __stylesFunc(searchBoxStyle, style, "searchBoxStyle");

  buttonContainerStyle = __stylesFunc(
    buttonContainerStyle,
    style,
    "buttonContainerStyle"
  );
  buttonTitleStyle = __stylesFunc(buttonTitleStyle, style, "buttonTitleStyle");
  dropdownBoxContainerStyle = __stylesFunc(
    dropdownBoxContainerStyle,
    style,
    "dropdownBoxContainerStyle"
  );
  dropdownSelectedItemContainerStyle = __stylesFunc(
    dropdownSelectedItemContainerStyle,
    style,
    "dropdownSelectedItemContainerStyle"
  );
  dropdownSelectedItemTextStyle = __stylesFunc(
    dropdownSelectedItemTextStyle,
    style,
    "dropdownSelectedItemTextStyle"
  );
  rightIconContainerStyle = __stylesFunc(
    rightIconContainerStyle,
    style,
    "rightIconContainerStyle"
  );
  rightIconStyle = __stylesFunc(rightIconStyle, style, "rightIconStyle");
  dropdownSelectedItemContainerTextStyle = __stylesFunc(
    dropdownSelectedItemContainerTextStyle,
    style,
    "dropdownSelectedItemContainerTextStyle"
  );
  placeholderContainerTextStyle = __stylesFunc(
    placeholderContainerTextStyle,
    style,
    "placeholderContainerTextStyle"
  );
  clearButtonContainerStyle = __stylesFunc(
    clearButtonContainerStyle,
    style,
    "clearButtonContainerStyle"
  );
  clearButtonTextStyle = __stylesFunc(
    clearButtonTextStyle,
    style,
    "clearButtonTextStyle"
  );
  const [filterData, setFilterData] = React.useState([]);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [multiSelected, setMultiSelected] = React.useState([]);
  const [singleSelected, setSingleSelected] = React.useState();

  const [tempData, setTempData] = React.useState([]);
  closeVisible = closeVisible == undefined ? true : closeVisible;

  React.useEffect(() => {
    let temp = [];
    if (typeof data[0] == "object") {
      data.forEach((element) => {
        temp.push({ title: element[itemTitleKey], ...element });
      });
    }
    if (typeof data[0] == "string") {
      data.forEach((element) => {
        temp.push({ title: element });
      });
    }
    setFilterData(temp);
  }, [isModalVisible]);

  const onPressSubmit = () => {
    const temp = filterData.filter((element) => element.selected);
    setMultiSelected(temp);
    setIsModalVisible(false);
    const returnableArray = [];
    data.forEach((element) => {
      temp.forEach((value) => {
        value.title == element.title && returnableArray.push(element);
      });
    });
    getSelectedData && getSelectedData(returnableArray);
    onConfirm && onConfirm(returnableArray);
  };

  const onPressCancel = () => {
    setFilterData(tempData);
    setIsModalVisible(false);
    onCancel && onCancel();
  };
  const onPressDropDown = () => {
    setTempData(filterData);
    setIsModalVisible(!isModalVisible);
    onDropDown && onDropDown();
  };

  const onPressClearAll = () => {
    const resetArray = filterData.map((value) => ({
      title: value.title,
      selected: false,
    }));
    setFilterData(resetArray);
    onClearAll && onClearAll();
  };

  const renderItem = ({ item, index }) => {
    const isSelected = selectedItem[itemTitleKey] == item[itemTitleKey];

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={[styles.listItemContainerStyle, ...listItemContainerStyle]}
        onPress={() => {
          let newObj = {};
          Object.keys(item).map((item2) => {
            newObj =
              item2 !== "title"
                ? { ...newObj, [item2]: item[item2] }
                : { ...newObj };
          });

          if (getSelectedData && typeof data[0] == "object") {
            getSelectedData(newObj);
          } else {
            getSelectedData(item.title);
          }

          setIsModalVisible(false);
        }}
      >
        <Text
          style={
            isSelected
              ? [...modalSelectedItemTextStyle]
              : [...modalItemTextStyle]
          }
        >
          {item.title.toUpperCase()}
        </Text>
        {isSelected && (
          <CTSIcon
            source={checkIcon}
            iconStyle={{ tintColor: colors.secondary }}
          />
        )}
        {(item.selected || singleSelected == item) && (
          <CTSIcon
            source={checkIcon}
            iconStyle={[...checkIconStyle]}
            iconContainerStyle={[...checkIconContainerStyle]}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Modal
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
        visible={isModalVisible}
        animationType="slide"
        onDismiss={() => {
          setIsModalVisible(false);
        }}
      >
        <SafeAreaView style={{ backgroundColor: colors.aliceblue }} />
        <View
          style={{ flex: 1, padding: 10, backgroundColor: colors.aliceblue }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <CTSInput
                inputStyle={{ ...styles.searchBoxStyle }}
                containerStyle={{ flex: 1 }}
                onFocus={() => {
                  setTempData(filterData);
                }}
                placeholder="Search"
                onChangeText={(text) => {
                  if (text !== "") {
                    setFilterData(
                      __localSearch(tempData, text, [itemTitleKey])
                    );
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
              />
              {closeVisible && (
                <CTSIcon
                  source={closeCircleIcon}
                  iconStyle={{ height: 40, width: 40, marginLeft: 10 }}
                  onPress={() => setIsModalVisible(false)}
                />
              )}
              {multiSelect && (
                <CTSButton
                  onFullPress={onPressClearAll}
                  title="Clear All"
                  contentContainerStyle={[
                    styles.clearButtonContainerStyle,
                    ...clearButtonContainerStyle,
                  ]}
                  titleStyle={[
                    styles.clearButtonTextStyle,
                    ...clearButtonTextStyle,
                  ]}
                />
              )}
            </View>
          </View>
          <View style={{ flex: 1, paddingTop: 5 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={filterData}
              extraData={filterData}
              renderItem={renderItem}
              keyExtractor={(item, index) => String(index)}
            />

            {multiSelect && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",

                  paddingTop: 10,
                }}
              >
                <CTSButton
                  fullPress={onPressCancel}
                  style={{
                    contentContainerStyle: [
                      styles.buttonContainerStyle,
                      ...buttonContainerStyle,
                    ],
                  }}
                  titleStyle={buttonTitleStyle}
                  title="Cancel"
                />
                <CTSButton
                  fullPress={onPressSubmit}
                  style={{
                    contentContainerStyle: [
                      styles.buttonContainerStyle,
                      ...buttonContainerStyle,
                    ],
                  }}
                  titleStyle={buttonTitleStyle}
                  title="Submit"
                />
              </View>
            )}
          </View>
        </View>
        <SafeAreaView style={{ backgroundColor: colors.aliceblue }} />
      </Modal>
      {title && (
        <Text
          style={[
            {
              fontSize: fontSizes.f12,
              color: colors.secondary,
              backgroundColor: colors.white,
            },
            ...titleStyle,
          ]}
        >
          {title}
        </Text>
      )}
      <CTSShadow
        style={{
          shadowColor: colors.steelblue,
          shadowRadius: 5,
          shadowOpacity: 0.21,
          shadowOffset: {
            width: 0,
            height: 0,
          },
        }}
      >
        <TouchableOpacity
          onPress={onPressDropDown}
          disabled={data?.length == 0}
          activeOpacity={0.5}
          style={[
            styles.dropdownBoxContainerStyle,
            ...dropdownBoxContainerStyle,
          ]}
        >
          <View
            style={[
              styles.dropdownSelectedItemContainerStyle,
              ...dropdownSelectedItemContainerStyle,
            ]}
          >
            {multiSelect ? (
              multiSelected.length !== 0 ? (
                <FlatList
                  data={multiSelected}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => String(index)}
                  renderItem={({ item, index }) => (
                    <View
                      style={[
                        styles.dropdownSelectedItemContainerTextStyle,
                        ...dropdownSelectedItemContainerTextStyle,
                      ]}
                    >
                      <Text
                        key={String(index)}
                        style={[
                          styles.dropdownSelectedItemTextStyle,
                          ...dropdownSelectedItemTextStyle,
                        ]}
                      >
                        {item.title.toLocaleUpperCase()}
                      </Text>
                    </View>
                  )}
                />
              ) : (
                <View
                  style={[
                    styles.placeholderContainerTextStyle,
                    ...placeholderContainerTextStyle,
                  ]}
                >
                  <Text style={[...placeholderTextStyle]}>
                    {placeholder || "Select Item"}
                  </Text>
                </View>
              )
            ) : (
              <View
                style={[
                  styles.placeholderContainerTextStyle,
                  ...placeholderContainerTextStyle,
                ]}
              >
                <Text style={[...placeholderTextStyle]}>
                  {selectedItem
                    ? (
                        selectedItem?.title || selectedItem[itemTitleKey]
                      ).toLocaleUpperCase()
                    : placeholder || "Select Item"}
                </Text>
              </View>
            )}
          </View>
          <View
            style={[styles.rightIconContainerStyle, ...rightIconContainerStyle]}
          >
            <Image
              source={arrowDownIcon}
              style={[styles.rightIconStyle, ...rightIconStyle]}
            />
          </View>
        </TouchableOpacity>
      </CTSShadow>
    </>
  );
}

const styles = StyleSheet.create({
  searchBoxStyle: {
    width: "100%",
    paddingLeft: 0,
  },
  clearButtonContainerStyle: {
    width: 100,
    justifyContent: "center",
    borderRadius: 10,
    marginLeft: 10,
  },
  clearButtonTextStyle: {
    flex: 0,
  },
  dropdownBoxContainerStyle: {
    flexDirection: "row",
    width: "100%",
    minHeight: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
  },
  dropdownSelectedItemContainerStyle: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dropdownSelectedItemTextStyle: {
    minWidth: "28.33%",
  },
  dropdownSelectedItemContainerTextStyle: {
    borderRadius: 10,
    justifyContent: "center",
    padding: 5,
    margin: 2,
  },
  placeholderTextStyle: {},
  placeholderContainerTextStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  rightIconContainerStyle: {
    width: 50,
    minHeight: 50,
    justifyContent: "center",
  },
  rightIconStyle: {
    width: 20,
    height: 20,
    alignSelf: "center",
  },
  buttonContainerStyle: {
    width: 150,
    height: 40,
    borderRadius: 10,
  },
  listItemContainerStyle: {
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 20,

    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

CTSelectBoxDropdown.propTypes = {
  data: propTypes.array,
  multiSelect: propTypes.bool,
  getSelectedData: propTypes.func.isRequired,
  itemTitleKey: propTypes.string,
  // searchableKey: propTypes.arrayOf(propTypes.string),
  closeVisible: propTypes.bool,
  listItemContainerStyle: ViewPropTypes.style,
  modalSelectedItemTextStyle: propTypes.object,
  modalItemTextStyle: propTypes.object,
  checkIconStyle: propTypes.object,
  checkIconContainerStyle: ViewPropTypes.style,
  // searchBoxStyle: ViewPropTypes.style,
  buttonContainerStyle: ViewPropTypes.style,
  buttonTitleStyle: propTypes.object,
  dropdownBoxContainerStyle: ViewPropTypes.style,
  dropdownSelectedItemContainerStyle: ViewPropTypes.style,
  dropdownSelectedItemTextStyle: propTypes.object,
  rightIconContainerStyle: ViewPropTypes.style,
  rightIconStyle: propTypes.object,
  placeholderTextStyle: propTypes.object,
  placeholderContainerTextStyle: ViewPropTypes.style,
  onConfirm: propTypes.func,
  onCancel: propTypes.func,
  onClearAll: propTypes.func,
  onDropDown: propTypes.func,
  style: propTypes.shape({
    listItemContainerStyle: ViewPropTypes.style,
    modalSelectedItemTextStyle: propTypes.object,
    modalItemTextStyle: propTypes.object,
    checkIconStyle: propTypes.object,
    checkIconContainerStyle: ViewPropTypes.style,
    // searchBoxStyle: ViewPropTypes.style,
    buttonContainerStyle: ViewPropTypes.style,
    buttonTitleStyle: propTypes.object,
    dropdownBoxContainerStyle: ViewPropTypes.style,
    dropdownSelectedItemContainerStyle: ViewPropTypes.style,
    dropdownSelectedItemTextStyle: propTypes.object,
    rightIconContainerStyle: ViewPropTypes.style,
    rightIconStyle: propTypes.object,
    placeholderTextStyle: propTypes.object,
    placeholderContainerTextStyle: ViewPropTypes.style,
    dropdownSelectedItemContainerTextStyle: ViewPropTypes.style,
  }),
};
