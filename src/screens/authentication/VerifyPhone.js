import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  Platform,
} from "react-native";
import { leftArrowIcon } from "../../assets/icons";
import {
  CTSButtonsGradient,
  CTSHeader,
  CTSKeyboardAvoidScrollView,
  CTSShadow,
} from "../../components";
import { colors, fonts, fontSizes } from "../../constants";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { __simpleToast } from "../../utils/basicFunctions/SimpleToast";
import { useDispatch, useSelector } from "react-redux";
import { apiTest, rootLoader, userRegister } from "../../actions";
import auth from "@react-native-firebase/auth";
import { StackActions, useNavigation } from "@react-navigation/native";
import { USER_SIGNIN } from "../../reducers/reducersType";
import messaging from "@react-native-firebase/messaging";

const gCodeTimer = 60;
export default function VerifyPhone({ route }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const data = route?.params;
  const userLoginType = useSelector((data) => data.user.userLoginType);
  const userInfo = useSelector((data) => data.user.userInfo);

  const [confirmation, setConfirmation] = useState(null);
  const [code, setCode] = useState("");
  const [timer, setTimer] = React.useState(gCodeTimer);
  const timerRef = useRef(null);

  React.useEffect(() => {
    onPressRequestCode();
    return () => clearInterval(timerRef.current);
  }, []);

  const onPressVerify = async (fCode) => {
    const deviceToken = await messaging().getToken();
    const hCode = fCode !== "" && fCode !== undefined ? fCode : code;

    if (hCode == "") {
      return __simpleToast("Enter Code");
    } else if (hCode.length < 6) {
      return __simpleToast("Enter 6 Digit Code");
    }
    dispatch(rootLoader(true));
    try {
      const hPhoneAuthData = await confirmation.confirm(hCode);
      if (userLoginType == "google_login") {
        const request = {
          login_type: "google_login",
          user_type: "brand_user",
          social_id: userInfo.user.uid,
          entity_id: userInfo.user.uid,
          social_json_data: JSON.stringify(userInfo),
          user_name: userInfo.user.displayName,
          user_email_id: userInfo.user.email,
          user_phone: data?.phoneNumber,
          device_type: Platform.OS,
          device_token: deviceToken,
          profile_pic: userInfo.user.photoURL,
        };

        const hResult = await dispatch(userRegister(request));
        if (hResult.status) {
          navigation.navigate("BrandRegistration");
        } else {
          __simpleToast(hResult.message);
        }
      } else {
        dispatch({ type: USER_SIGNIN, payload: hPhoneAuthData });
        navigation.navigate("SignUp", {
          phoneNumber: data?.phoneNumber,
          countryPhoneCode: data?.countryPhoneCode,
        });
      }
    } catch (error) {
      if (error.code == "auth/invalid-verification-code") {
        __simpleToast("Invalid Code");
      } else {
        console.log(error);
        __simpleToast(error.message);
      }
    }

    dispatch(rootLoader(false));
  };

  const hfStartTimer = () => {
    setTimer(gCodeTimer);
    timerRef.current = setInterval(() => {
      setTimer((time) => {
        let counter = time - 1;
        if (counter == 0) {
          counter = 0;
          clearInterval(timerRef.current);
          return counter;
        }
        return counter;
      });
    }, 1000);
  };

  const onPressRequestCode = async () => {
    try {
      hfStartTimer();
      const hConfirmation = await auth().signInWithPhoneNumber(
        `+91${data?.phoneNumber}`,
        true
      );
      setConfirmation(hConfirmation);
    } catch (error) {
      console.log(error);
      __simpleToast(error.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView />
      <CTSHeader title="Verify Phone" onBackPress={() => navigation.goBack()} />
      <CTSKeyboardAvoidScrollView>
        <TouchableOpacity
          style={{ flex: 1, justifyContent: "space-evenly" }}
          activeOpacity={1}
          onPress={() => Keyboard.dismiss()}
        >
          <Text style={styles.textStyle}>
            Code is Sent to +1 ********{data?.phoneNumber.slice(8, 10)}
          </Text>

          <CTSShadow style={styles.shadowStyle}>
            <OTPInputView
              style={styles.otpStyle}
              codeInputFieldStyle={styles.codeInputFieldStyle}
              pinCount={6}
              code={code}
              editable
              onCodeChanged={setCode}
              onCodeFilled={onPressVerify}
              keyboardType="phone-pad"
            />
          </CTSShadow>
          <View>
            <View style={styles.resendTextContainerStyle}>
              <Text
                style={{
                  ...styles.textStyle,
                  fontFamily: fonts.sairaRegularFont,
                }}
              >
                Didn’t recieve code?{" "}
              </Text>
              <TouchableOpacity
                onPress={onPressRequestCode}
                disabled={timer !== 0}
              >
                <Text
                  style={{
                    ...styles.textStyle,
                    textDecorationLine: "underline",
                  }}
                >
                  {timer !== 0 ? `00:${timer}` : "Request again"}
                </Text>
              </TouchableOpacity>
            </View>
            <CTSButtonsGradient
              title={"Verify"}
              onFullPress={() => onPressVerify()}
            />
          </View>
        </TouchableOpacity>
      </CTSKeyboardAvoidScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: fontSizes.f20,
    color: colors.secondary,
    fontFamily: fonts.sairaSemiBoldFont,
    textAlign: "center",
  },
  otpStyle: {
    height: 80,
    width: "90%",
    alignSelf: "center",
  },
  codeInputFieldStyle: {
    height: 50,
    width: 40,
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: colors.background,
    shadowColor: colors.deepskyblue,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    color: colors.secondary,
    fontSize: fontSizes.f25,
    fontFamily: fonts.sairaBoldFont,
    padding: 0,

    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  shadowStyle: {
    shadowColor: colors.deepskyblue,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  resendTextContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
});
