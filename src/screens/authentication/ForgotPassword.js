import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";
import { forgotPassword, rootLoader } from "../../actions";
import { emailImg } from "../../assets/images";
import {
  CTSButtonsGradient,
  CTSHeader,
  CTSIcon,
  CTSInput,
  CTSKeyboardAvoidScrollView,
  CTSSeparator,
} from "../../components";
import { colors, fonts, fontSizes } from "../../constants";
import Api from "../../utils/Api";
import { __simpleToast } from "../../utils/basicFunctions/SimpleToast";

export default function ForgotPassword({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const onPressSend = async () => {
    let hReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!email) return __simpleToast("Please enter email!");
    if (!hReg.test(email)) return __simpleToast("Please enter valid email!");

    dispatch(rootLoader(true));

    const request = {
      user_email_id: email,
    };
    const result = await forgotPassword(request);
    if (result.status) {
      navigation.navigate("VerificationEmail", { emailId: email });
    } else {
      __simpleToast(result.message);
    }

    dispatch(rootLoader(false));
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <CTSHeader
        title="Forgot Password"
        onBackPress={() => navigation.goBack()}
      />
      <CTSKeyboardAvoidScrollView>
        <TouchableOpacity
          style={{ flex: 1, justifyContent: "center" }}
          activeOpacity={1}
          onPress={() => Keyboard.dismiss()}
        >
          <CTSIcon
            disabled
            source={emailImg}
            iconStyle={styles.emailImgStyle}
          />
          <CTSSeparator />
          <Text style={styles.boldTextStyle}>
            Enter the email address associated with your account.
          </Text>
          <CTSSeparator />
          <Text style={styles.descriptionStyle}>
            we will email a code to reset your Password.
          </Text>
          <CTSSeparator />
          <CTSInput
            placeholder="Enter Email"
            value={email}
            maxLength={50}
            onChangeText={setEmail}
          />
          <View style={{ marginHorizontal: 30, marginVertical: 40 }}>
            <CTSButtonsGradient title="Send" onFullPress={onPressSend} />
          </View>
        </TouchableOpacity>
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
    width: 120,
    height: 120,
    alignSelf: "center",
  },
  boldTextStyle: {
    fontSize: fontSizes.f20,
    color: colors.secondary,
    fontFamily: fonts.sairaSemiBoldFont,
    textAlign: "center",
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
