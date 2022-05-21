import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewPropTypes,
} from "react-native";

import FastImage from "react-native-fast-image";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import propTypes from "prop-types";
import __stylesFunc, {
  __themeStyleFunc,
} from "../utils/basicFunctions/StylesFunc";
import themeStyles from "../assets/styles/themestyles";
import { calendarIcon, clockIcon, watchIcon } from "../assets/icons";
import { colors } from "../constants";
import CTShadow from "./CTShadow";

export default function CTDateTimePicker({
  title,
  onPress,
  selectedDate,
  getSelectedDate,
  selectedTime,
  getSelectedTime,
  mode,
  contentContainerStyle,
  titleContainerStyle,
  titleStyle,
  selectTextStyle,
  selectContainerStyle,
  iconContainerStyle,
  iconStyle,
  style,
}) {
  style = __themeStyleFunc(style, themeStyles.CTDateTimePicker);
  contentContainerStyle = __stylesFunc(
    contentContainerStyle,
    style,
    "contentContainerStyle"
  );
  titleContainerStyle = __stylesFunc(
    titleContainerStyle,
    style,
    "titleContainerStyle"
  );
  titleStyle = __stylesFunc(titleStyle, style, "titleStyle");
  selectTextStyle = __stylesFunc(selectTextStyle, style, "selectTextStyle");
  selectContainerStyle = __stylesFunc(
    selectContainerStyle,
    style,
    "selectContainerStyle"
  );
  iconContainerStyle = __stylesFunc(
    iconContainerStyle,
    style,
    "iconContainerStyle"
  );
  iconStyle = __stylesFunc(iconStyle, style, "iconStyle");
  const [isDateTimePicker, setIsDateTimePicker] = useState(false);
  mode = mode == undefined ? "date" : mode;
  return (
    <>
      <DateTimePicker
        isVisible={isDateTimePicker}
        onCancel={() => setIsDateTimePicker(false)}
        mode={mode}
        minimumDate={new Date()}
        date={
          selectedDate === "" || selectedTime === ""
            ? new Date()
            : selectedDate || selectedTime
        }
        onConfirm={(date) => {
          setIsDateTimePicker(false);
          getSelectedDate && getSelectedDate(date);
          getSelectedTime && getSelectedTime(date);
        }}
      />
      <CTShadow
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
          onPress={() => {
            setIsDateTimePicker(true);
            onPress && onPress();
          }}
          style={[styles.contentContainerStyle, ...contentContainerStyle]}
        >
          {title && (
            <View style={[styles.titleContainerStyle, titleContainerStyle]}>
              <Text style={[...titleStyle]}>{title}</Text>
            </View>
          )}
          <View style={[styles.iconContainerStyle, ...iconContainerStyle]}>
            <FastImage
              source={
                mode == "date" ? calendarIcon : mode == "time" && clockIcon
              }
              style={[styles.iconStyle, ...iconStyle]}
              resizeMode="contain"
            />
          </View>
          <View style={[...selectContainerStyle]}>
            {mode == "date" && (
              <Text style={[...selectTextStyle]}>
                {selectedDate
                  ? moment(selectedDate).format("DD-MM-YYYY")
                  : "Select Date"}
              </Text>
            )}
            {mode == "time" && (
              <Text style={[...selectTextStyle]}>
                {selectedTime
                  ? moment(selectedTime).format("hh:mm A")
                  : "Select Time"}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </CTShadow>
    </>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    width: "100%",
    height: 48,
    alignItems: "center",
    flexDirection: "row",
    // justifyContent: "space-between",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.white,
  },
  titleContainerStyle: {
    position: "absolute",
    top: -10,
    left: 10,
    paddingHorizontal: 5,
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  iconContainerStyle: {
    marginRight: 10,
  },
});

CTDateTimePicker.propTypes = {
  title: propTypes.string,
  onPress: propTypes.func,
  // selectedDate: propTypes.string,
  getSelectedDate: propTypes.func,
  // selectedTime: propTypes.string,
  getSelectedTime: propTypes.func,
  mode: propTypes.string,
  contentContainerStyle: ViewPropTypes.style,
  titleContainerStyle: ViewPropTypes.style,
  titleStyle: propTypes.object,
  selectTextStyle: propTypes.object,
  selectContainerStyle: ViewPropTypes.style,
  iconContainerStyle: ViewPropTypes.style,
  iconStyle: propTypes.object,
  style: propTypes.shape({
    contentContainerStyle: ViewPropTypes.style,
    titleContainerStyle: ViewPropTypes.style,
    titleStyle: propTypes.object,
    selectTextStyle: propTypes.object,
    selectContainerStyle: ViewPropTypes.style,
    iconContainerStyle: ViewPropTypes.style,
    iconStyle: propTypes.object,
  }),
};
