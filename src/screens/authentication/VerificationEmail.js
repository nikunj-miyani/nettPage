import OTPInputView from "@twotalltotems/react-native-otp-input";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";
import { forgotPassword, rootLoader, verifyCode } from "../../actions";
import { emailVerificationImg } from "../../assets/images";
import {
  CTSButtonsGradient,
  CTSHeader,
  CTSIcon,
  CTSKeyboardAvoidScrollView,
  CTSSeparator,
  CTSShadow,
} from "../../components";
import { colors, fonts, fontSizes } from "../../constants";
import Api from "../../utils/Api";
import { __simpleToast } from "../../utils/basicFunctions/SimpleToast";

const gCodeTimer = 60;
export default function VerificationEmail({ navigation, route }) {
  const dispatch = useDispatch();
  const timerRef = useRef(null);
  const emailId = route?.params?.emailId;

  const [code, setCode] = useState("");
  const [timer, setTimer] = React.useState(gCodeTimer);

  React.useEffect(() => {
    hfStartTimer();
    return () => clearInterval(timerRef.current);
  }, []);

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
    dispatch(rootLoader(true));

    const request = {
      user_email_id: emailId,
    };
    const result = await forgotPassword(request);
    if (result.status) {
      __simpleToast(result.message);
    } else {
      __simpleToast(result.message);
    }

    dispatch(rootLoader(false));
  };

  const onPressVerify = async (fCode) => {
    fCode = fCode !== "" ? fCode : code;
    if (fCode == "") {
      return __simpleToast("Enter Code");
    } else if (fCode.length < 3) {
      return __simpleToast("Enter 4 Digit Code");
    }

    dispatch(rootLoader(true));
    const request = {
      user_email_id: emailId,
      verify_code: fCode,
    };
    const result = await verifyCode(request);
    if (result.status) {
      navigation.navigate("ResetPassword", { emailId: emailId });
    } else {
      __simpleToast(result.message);
    }
    dispatch(rootLoader(false));
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <CTSHeader title="Verification" onBackPress={() => navigation.goBack()} />
      <CTSKeyboardAvoidScrollView>
        <TouchableOpacity
          style={{ flex: 1, justifyContent: "space-evenly" }}
          activeOpacity={1}
          onPress={() => Keyboard.dismiss()}
        >
          <View>
            <CTSIcon
              disabled
              source={emailVerificationImg}
              iconStyle={styles.emailImgStyle}
            />
            <CTSSeparator />
            <Text style={styles.boldTextStyle}>Check Your Email</Text>
            <CTSSeparator />
            <Text style={styles.descriptionStyle}>
              we have sent a password recover code to your email.
            </Text>

            <CTSSeparator />
            <CTSSeparator />
            <CTSShadow style={styles.shadowStyle}>
              <OTPInputView
                style={styles.otpStyle}
                codeInputFieldStyle={styles.codeInputFieldStyle}
                pinCount={4}
                code={code}
                editable
                onCodeChanged={(code) => {
                  setCode(code);
                }}
                keyboardType="phone-pad"
                onCodeFilled={onPressVerify}
              />
            </CTSShadow>
            <CTSSeparator />
            <View style={{ marginHorizontal: 30, marginVertical: 40 }}>
              <CTSButtonsGradient
                title={"Verify"}
                onFullPress={onPressVerify}
              />
            </View>
          </View>
        </TouchableOpacity>
        <CTSSeparator />
        <View style={styles.resendTextContainerStyle}>
          <Text
            style={{
              ...styles.textStyle,
              fontFamily: fonts.sairaRegularFont,
            }}
          >
            Didn’t recieve code?{" "}
          </Text>

          <TouchableOpacity onPress={onPressRequestCode} disabled={timer !== 0}>
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
      </CTSKeyboardAvoidScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  emailImgStyle: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  boldTextStyle: {
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
    height: 80,
    width: 60,
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: colors.background,
    shadowColor: colors.deepskyblue,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    color: colors.secondary,
    fontSize: fontSizes.f30,
    fontFamily: fonts.sairaBoldFont,
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
  textStyle: {
    fontSize: fontSizes.f20,
    color: colors.secondary,
    fontFamily: fonts.sairaSemiBoldFont,
    textAlign: "center",
  },
  descriptionStyle: {
    fontFamily: fonts.sairaRegularFont,
    fontSize: fontSizes.f15,
    color: colors.lightslategray,
    textAlign: "center",
    marginHorizontal: 20,
  },
});
