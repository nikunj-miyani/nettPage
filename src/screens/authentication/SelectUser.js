import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { rootLoader, userRegister } from "../../actions";
import { brandTypeImg, userTypeImg } from "../../assets/images";
import mystyle from "../../assets/styles/mystyle";
import {
  CTSButtonsGradient,
  CTSHeader,
  CTSKeyboardAvoidScrollView,
  CTSSeparator,
} from "../../components";
import { colors, fonts, fontSizes } from "../../constants";
import { USER_REGISTRATION_TYPE } from "../../reducers/reducersType";
import { __simpleToast } from "../../utils/basicFunctions/SimpleToast";
import messaging from "@react-native-firebase/messaging";

export default function SelectUser({ navigation, route }) {
  const dispatch = useDispatch();
  const userInfo = useSelector((data) => data.user.userInfo);
  const userLoginType = useSelector((data) => data.user.userLoginType);

  const [selectedType, setSelectedType] = useState("");

  const hUserSignUp = async () => {
    const hDeviceToken = await messaging().getToken();
    const request = {
      login_type: userLoginType,
      user_type: selectedType,
      social_id: userInfo.user.uid,
      entity_id: userInfo.user.uid,
      social_json_data: JSON.stringify(userInfo),
      user_name: userInfo.user.displayName,
      user_phone: userInfo.user.phoneNumber,
      user_email_id: userInfo.user.email,
      device_type: Platform.OS,
      device_token: hDeviceToken,
      profile_pic: userInfo.user.photoURL,
    };
    const hResult = await dispatch(userRegister(request));
    if (hResult.status) {
      navigation.navigate("AddAddress");
    } else {
      __simpleToast(hResult.message);
    }
  };

  const onPressNext = async () => {
    if (!selectedType) return __simpleToast("Please select any type!");

    dispatch(rootLoader(true));

    dispatch({ type: USER_REGISTRATION_TYPE, payload: selectedType });
    if (selectedType == "brand_user") {
      navigation.navigate("PhoneNumber");
    } else {
      if (userLoginType == "google_login" || userLoginType == "apple_login") {
        await hUserSignUp();
      } else {
        navigation.navigate("SignUp");
      }
    }

    dispatch(rootLoader(false));
  };

  return (
    <View style={mystyle.rootContainer}>
      <SafeAreaView />
      <CTSHeader
        statusbarColor={colors.background}
        statusbarStyle="dark-content"
        onBackPress={() => navigation.goBack()}
      />
      <CTSKeyboardAvoidScrollView
        scrollContentContainerStyle={{ paddingTop: 20 }}
      >
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <View style={{ marginBottom: 50, alignSelf: "center" }}>
              <Text style={styles.titleText}>
                Select{" "}
                <Text style={{ color: colors.midnightblue }}>User Type</Text>
              </Text>
            </View>
            <TouchableOpacity
              style={{
                ...styles.userTypeContainerStyle,
                backgroundColor: colors.lavenderblush,
                borderColor:
                  selectedType === "brand_user"
                    ? colors.primary
                    : colors.lavenderblush,
              }}
              onPress={() => setSelectedType("brand_user")}
            >
              <Image
                style={{ width: "30%" }}
                source={brandTypeImg}
                resizeMode="contain"
              />
              <View style={{ width: "62%", marginLeft: "8%" }}>
                <Text style={styles.typeTitleStyle}>Brand</Text>
                <Text style={styles.descriptionStyle}>
                  Showcase your products on offers to wider consumer-based
                  network
                </Text>
              </View>
            </TouchableOpacity>
            <CTSSeparator />
            <TouchableOpacity
              style={{
                ...styles.userTypeContainerStyle,
                backgroundColor: colors.linen,
                borderColor:
                  selectedType === "normal_user"
                    ? colors.primary
                    : colors.lavenderblush,
              }}
              onPress={() => setSelectedType("normal_user")}
            >
              <Image
                style={{ width: "30%" }}
                source={userTypeImg}
                resizeMode="contain"
              />
              <View style={{ width: "62%", marginLeft: "8%" }}>
                <Text style={styles.typeTitleStyle}>User</Text>
                <Text style={styles.descriptionStyle}>
                  See products from your favourite brands and connect with
                  friends
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginHorizontal: 30,
              marginVertical: 20,
            }}
          >
            <CTSButtonsGradient title="Next" onFullPress={onPressNext} />
          </View>
        </View>
      </CTSKeyboardAvoidScrollView>
      <SafeAreaView />
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 34,
    color: colors.dimgray,
    fontFamily: fonts.sairaSemiBoldFont,
  },
  userTypeContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
  },

  descriptionStyle: {
    fontSize: fontSizes.f13,
    color: colors.secondary,
    fontFamily: fonts.sairaMediumFont,
  },
  typeTitleStyle: {
    fontSize: fontSizes.f25,
    color: colors.secondary,
    fontFamily: fonts.sairaSemiBoldFont,
    marginBottom: 5,
  },
});
