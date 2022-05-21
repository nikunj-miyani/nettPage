import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  StatusBar,
} from "react-native";
import {
  CTSButtonsGradient,
  CTSIcon,
  CTSKeyboardAvoidScrollView,
} from "../../components";
import { phoneImg } from "../../assets/images";
import { fontSizes, colors, fonts } from "../../constants/";
import { CTInput } from "../../components/CTInput";
import { __simpleToast } from "../../utils/basicFunctions/SimpleToast";
import { useDispatch } from "react-redux";
import { rootLoader, verifyPhone } from "../../actions";
import { country_code, default_country_code } from "../../utils/countryCode";
import ModalCountryNumberCode from "./ModalCountryNumberCode";

export default function PhoneNumber({ navigation, route }) {
  const dispatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryPhoneCode, setCountryPhoneCode] = useState(
    default_country_code.phone
  );

  const onPressRequestOTP = async () => {
    if (!phoneNumber) {
      return __simpleToast("Enter Phone Number");
    } else if (phoneNumber.length < 10) {
      return __simpleToast("Enter 10 Digit Phone Number");
    }
    dispatch(rootLoader(true));

    try {
      const isAvailableNumber = await verifyPhone({
        user_phone: phoneNumber,
      });

      if (isAvailableNumber.status) {
        navigation.navigate("VerifyPhone", {
          phoneNumber: phoneNumber,
          countryPhoneCode: countryPhoneCode,
        });
      } else {
        __simpleToast(isAvailableNumber.message);
      }
    } catch (error) {
      __simpleToast(error.message);
    }

    dispatch(rootLoader(false));
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView />
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <CTSKeyboardAvoidScrollView
        scrollContentContainerStyle={{ justifyContent: "center" }}
      >
        <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
          <CTSIcon
            disabled
            source={phoneImg}
            iconStyle={styles.phoneImgStyle}
          />
          <View style={{ width: "100%", paddingHorizontal: 50 }}>
            <Text style={styles.textStyle}>
              You’ll receive a 6 digit code to verify next.
            </Text>
          </View>
          <View style={styles.inputMainContainerStyle}>
            <Text style={styles.inputTitleStyle}>Phone Number</Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 5,
              }}
            >
              {/* <CTSSelectBoxDropdown
                data={country_code}
                dropdownSelectedItemContainerStyle={{ flex: 0 }}
                dropdownBoxContainerStyle={{
                  width: 80,
                  marginRight: 10,
                }}
                placeholder={`+${countryPhoneCode.phone}`}
                itemTitleKey={"label"}
                rightIconStyle={{ marginRight: fontSizes.f20 }}
                getSelectedData={setCountryPhoneCode}
              /> */}
              <ModalCountryNumberCode
                data={country_code}
                countryPhoneCode={countryPhoneCode}
                setCountryPhoneCode={setCountryPhoneCode}
              />
              <View style={{ width: 10 }} />
              <View style={{ flex: 1, marginTop: 5 }}>
                <CTInput
                  keyboardType={"phone-pad"}
                  placeholder="Enter phone Number"
                  maxLength={10}
                  onChangeText={setPhoneNumber}
                  value={phoneNumber}
                />
              </View>
            </View>
          </View>
          <View style={{ height: fontSizes.f30 }} />
        </TouchableOpacity>
        <CTSButtonsGradient
          title={"Request OTP"}
          onFullPress={onPressRequestOTP}
        />
      </CTSKeyboardAvoidScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  phoneImgStyle: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  textStyle: {
    fontSize: fontSizes.f20,
    color: colors.secondary,
    fontFamily: fonts.sairaSemiBoldFont,
    textAlign: "center",
  },
  inputTitleStyle: {
    fontSize: fontSizes.f15,
    color: colors.secondary,
    fontFamily: fonts.sairaMediumFont,
  },
  inputMainContainerStyle: {
    paddingTop: 20,
  },
});
