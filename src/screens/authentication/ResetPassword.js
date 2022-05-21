import { StackActions } from "@react-navigation/native";
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
import {
  apiTest,
  resetPassword,
  rootLoader,
  setLoginDetails,
} from "../../actions";
import { eyeOffIcon, eyeOnIcon, leftArrowIcon } from "../../assets/icons";
import {
  CTSButtonsGradient,
  CTSHeader,
  CTSIcon,
  CTSInput,
  CTSKeyboardAvoidScrollView,
  CTSSeparator,
} from "../../components";
import { colors, fonts, fontSizes } from "../../constants";
import { USER_SIGNIN } from "../../reducers/reducersType";

import { __simpleToast } from "../../utils/basicFunctions/SimpleToast";

export default function ResetPassword({ navigation, route }) {
  const dispatch = useDispatch();
  const emailId = route?.params?.emailId;

  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(true);

  const onPressResetPassword = async () => {
    if (password == "") {
      return __simpleToast("Enter Password");
    } else if (confirmPassword == "") {
      return __simpleToast("Enter Confirm Password");
    } else if (password !== confirmPassword) {
      return __simpleToast("Enter Password Not Match");
    }
    dispatch(rootLoader(true));

    const request = {
      user_email_id: emailId,
      user_password: password,
      confirm_new_password: confirmPassword,
    };
    const result = await resetPassword(request);
    if (result.status) {
      dispatch(setLoginDetails(result.data));
      if (result?.data?.user_type == "brand_user") {
        navigation.dispatch(StackActions.replace("BrandStack"));
      } else {
        navigation.dispatch(StackActions.replace("UserStack"));
      }
      __simpleToast("Password Changed");
    } else {
      __simpleToast(result.message);
    }

    dispatch(rootLoader(false));
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <CTSHeader
        title="Reset Password"
        onBackPress={() => navigation.goBack()}
      />
      <CTSKeyboardAvoidScrollView>
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={() => Keyboard.dismiss()}
        >
          <CTSSeparator />
          <Text style={styles.descriptionStyle}>
            Your password must be more than six characters long and include a
            combination of numbers,letters and special characters. (!$@%#)
          </Text>
          <CTSSeparator />
          <CTSInput
            title="Password"
            value={password}
            animated
            maxLength={20}
            secureTextEntry={isPasswordVisible}
            rightSource={isPasswordVisible ? eyeOnIcon : eyeOffIcon}
            onPressRight={() => setIsPasswordVisible(!isPasswordVisible)}
            onChangeText={setPassword}
          />
          <CTSSeparator />
          <CTSInput
            title="Confirm Password"
            value={confirmPassword}
            animated
            maxLength={20}
            secureTextEntry={isConfirmPasswordVisible}
            rightSource={isConfirmPasswordVisible ? eyeOnIcon : eyeOffIcon}
            onPressRight={() =>
              setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
            }
            onChangeText={setConfirmPassword}
          />
          <View style={{ marginHorizontal: 30, marginVertical: 40 }}>
            <CTSButtonsGradient
              title="Reset Password"
              onFullPress={onPressResetPassword}
            />
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
  descriptionStyle: {
    fontFamily: fonts.sairaRegularFont,
    fontSize: fontSizes.f15,
    color: colors.lightslategray,
  },
});
