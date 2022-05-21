import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { rootLoader, userRegister } from "../../actions/";
import {
  eyeOffIcon,
  eyeOnIcon,
  cameraIcon,
  galleryIcon,
} from "../../assets/icons";
import { userPickerImg } from "../../assets/images";
import {
  CTSAvatar,
  CTSButtonsGradient,
  CTSHeader,
  CTSInput,
  CTSKeyboardAvoidScrollView,
  CTSShadow,
} from "../../components";
import { cameraPicker, photoPicker } from "../../utils/MediaManger";
import CTActionSheet from "../../components/CTActionSheet";
import CTSeparator from "../../components/CTSeparator";
import { colors, fontSizes, fonts } from "../../constants";
import { __simpleToast } from "../../utils/basicFunctions/SimpleToast";
import messaging from "@react-native-firebase/messaging";
import auth from "@react-native-firebase/auth";

export default function SignUp({ navigation, route }) {
  const dispatch = useDispatch();
  const phoneNumber = route?.params?.phoneNumber;
  const countryPhoneCode = route?.params?.countryPhoneCode;

  const phoneAuthData = useSelector((data) => data.user.userInfo);
  const userRegistrationType = useSelector(
    (data) => data.user.userRegistrationType
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true);
  const [isSecureConfirm, setIsSecureConfirm] = useState(true);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [pickerOptions, setPickerOptions] = useState([
    {
      icon: cameraIcon,
      title: "Camera",
      onPress: () => hfPhotoPicker("camera"),
    },
    {
      icon: galleryIcon,
      title: "Gallery",
      onPress: () => hfPhotoPicker("gallery"),
    },
  ]);

  const hfPhotoPicker = async (option) => {
    if (option === "camera") {
      let res = await cameraPicker({ height: 1000, width: 1000 });
      if (res.status) {
        setImageData(res.data);
      }
    } else if (option === "gallery") {
      let res = await photoPicker({ height: 1000, width: 1000 });
      if (res.status) {
        setImageData(res.data);
      }
    }
    setIsPickerVisible(false);
  };

  const fPhoneAuthentication = async () => {
    const deviceToken = await messaging().getToken();
    try {
      const request = {
        login_type: "normal_login",
        user_type: userRegistrationType,
        entity_id: phoneAuthData.user.uid,
        social_json_data: JSON.stringify(phoneAuthData),
        user_name: name,
        user_email_id: email,
        user_password: password,
        user_phone: phoneNumber,
        phone_country_code: countryPhoneCode,
        device_type: Platform.OS,
        device_token: deviceToken,
        profile_pic: imageData ? imageData : "",
      };

      let hReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (!name) return __simpleToast("Please enter name!");
      if (!email) return __simpleToast("Please enter email!");
      if (!hReg.test(email)) return __simpleToast("Please enter valid email!");
      if (!password) return __simpleToast("Please enter password!");
      if (!(password.trim().length >= 8))
        return __simpleToast("Password must be 8 character!");
      if (!confirmPassword)
        return __simpleToast("Please enter confirm password!");
      if (!(password === confirmPassword))
        return __simpleToast("Password must be same!");

      const hResult = await dispatch(userRegister(request));
      if (hResult.status) {
        navigation.navigate("BrandRegistration");
      } else {
        __simpleToast(hResult.message);
      }
    } catch (error) {
      __simpleToast(error.message);
    }
  };

  const fEmailAuthentication = async () => {
    const deviceToken = await messaging().getToken();
    try {
      const hAuthResult = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      const request = {
        login_type: "normal_login",
        user_type: userRegistrationType,
        entity_id: hAuthResult.user.uid,
        social_json_data: JSON.stringify(hAuthResult),
        user_name: name,
        user_email_id: hAuthResult.user.email,
        user_password: password,
        device_type: Platform.OS,
        device_token: deviceToken,
        profile_pic: imageData ? imageData : "",
      };

      const hResult = await dispatch(userRegister(request));
      if (hResult.status) {
        navigation.navigate("AddAddress");
      } else {
        __simpleToast(hResult.message);
      }
    } catch (error) {
      console.log(error);
      if (error.code === "auth/email-already-in-use") {
        __simpleToast("That email address is already in use!");
      } else if (error.code === "auth/invalid-email") {
        __simpleToast("That email address is invalid!");
      } else {
        __simpleToast(error.message);
      }
    }
  };

  const onPressSignUp = async () => {
    let hReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!name) return __simpleToast("Please enter name!");
    if (!email) return __simpleToast("Please enter email!");
    if (!hReg.test(email)) return __simpleToast("Please enter valid email!");
    if (!password) return __simpleToast("Please enter password!");
    if (!(password.trim().length >= 8))
      return __simpleToast("Password must be 8 character!");
    if (!confirmPassword)
      return __simpleToast("Please enter confirm password!");
    if (!(password === confirmPassword))
      return __simpleToast("Password must be same!");

    dispatch(rootLoader(true));

    if (userRegistrationType == "brand_user") {
      await fPhoneAuthentication();
    } else {
      await fEmailAuthentication();
    }

    dispatch(rootLoader(false));
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <CTSHeader
        title="Create a Account"
        statusbarColor={colors.background}
        statusbarStyle="dark-content"
        onBackPress={() => navigation.goBack()}
      />
      <CTSKeyboardAvoidScrollView
        scrollContentContainerStyle={{ paddingTop: 20 }}
      >
        <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
          <View style={styles.profileContainer}>
            <CTSShadow style={styles.shadowStyle}>
              <CTSAvatar
                imagePlaceholderSource={userPickerImg}
                source={imageData}
                onPress={() => setIsPickerVisible(!isPickerVisible)}
                contentContainerStyle={{ width: 125, height: 125 }}
              />
            </CTSShadow>
          </View>
          <CTSInput
            title="Name"
            value={name}
            animated
            maxLength={35}
            onChangeText={setName}
          />
          <CTSeparator />
          <CTSInput
            title="Email"
            value={email}
            animated
            maxLength={50}
            keyboardType="email-address"
            onChangeText={setEmail}
          />
          <CTSeparator />
          <CTSInput
            title="Password"
            value={password}
            animated
            maxLength={20}
            secureTextEntry={isSecure}
            rightSource={isSecure ? eyeOnIcon : eyeOffIcon}
            onPressRight={() => setIsSecure(!isSecure)}
            onChangeText={setPassword}
          />
          <CTSeparator />
          <CTSInput
            title="Confirm Password"
            value={confirmPassword}
            animated
            maxLength={20}
            secureTextEntry={isSecureConfirm}
            rightSource={isSecureConfirm ? eyeOnIcon : eyeOffIcon}
            onPressRight={() => setIsSecureConfirm(!isSecureConfirm)}
            onChangeText={setConfirmPassword}
          />
          <View style={{ marginHorizontal: 30, marginVertical: 40 }}>
            <CTSButtonsGradient title="Sign Up" onFullPress={onPressSignUp} />
          </View>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={styles.haveAccount}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </CTSKeyboardAvoidScrollView>

      <CTActionSheet
        isVisible={isPickerVisible}
        data={pickerOptions}
        onBackdropPress={setIsPickerVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 20,
    marginBottom: 50,
  },
  shadowStyle: {
    shadowColor: colors.lavender,
    shadowRadius: 5,
    shadowOpacity: 0.9,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  haveAccount: {
    fontSize: fontSizes.f18,
    color: colors.lightslategray,
    fontFamily: fonts.sairaRegularFont,
  },
  loginText: {
    fontSize: fontSizes.f18,
    color: colors.secondary,
    textDecorationLine: "underline",
    fontFamily: fonts.sairaBoldFont,
  },
});
