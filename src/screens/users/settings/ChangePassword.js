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
import { apiTest, rootLoader } from "../../../actions";
import {
  eyeOffIcon,
  eyeOnIcon,
  leftArrowIcon,
  closeCircleIcon,
} from "../../../assets/icons";
import { changePasswordImg } from "../../../assets/images";
import {
  CTSButtonsGradient,
  CTSConfirmationBox,
  CTSHeader,
  CTSIcon,
  CTSInput,
  CTSKeyboardAvoidScrollView,
  CTSSeparator,
} from "../../../components";
import { colors, fonts, fontSizes } from "../../../constants";
import { __simpleToast } from "../../../utils/basicFunctions/SimpleToast";

export default function ChangePassword({ navigation }) {
  const dispatch = useDispatch();

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSecureCurrentPassword, setIsSecureCurrentPassword] = useState(true);
  const [isSecurePassword, setIsSecurePassword] = useState(true);
  const [isSecureConfirmPassword, setIsSecureConfirmPassword] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onSubmit = async () => {
    if (!currentPassword)
      return __simpleToast("Please enter current password!");
    if (!password) return __simpleToast("Please enter password!");
    if (!confirmPassword)
      return __simpleToast("Please enter confirm password!");
    if (currentPassword === password)
      return __simpleToast(
        "current password must be different from new password!"
      );
    if (!(password === confirmPassword))
      return __simpleToast("Password must be same!");
    dispatch(rootLoader(true));
    const request = {
      password: password,
    };
    const result = await apiTest(request, true);
    if (result.status) {
      setIsModalVisible(true);
    } else {
      __simpleToast(result.message);
    }
    dispatch(rootLoader(false));
  };
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <CTSHeader
        title="Change Password"
        onBackPress={() => navigation.goBack()}
      />
      <CTSKeyboardAvoidScrollView
        scrollContentContainerStyle={{ paddingTop: 20 }}
      >
        <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
          <CTSSeparator />
          <Text style={styles.headingText}>
            Your new password must be different from previous used password.
          </Text>
          <CTSSeparator />
          <Text style={styles.descriptionText}>
            Your password must be more than six characters long and include a
            combination of numbers,letters and special characters. (!$@%#)
          </Text>
          <CTSSeparator />
          <CTSInput
            title="Current Password"
            value={currentPassword}
            animated
            secureTextEntry={isSecureCurrentPassword}
            rightSource={isSecureCurrentPassword ? eyeOnIcon : eyeOffIcon}
            onPressRight={() =>
              setIsSecureCurrentPassword(!isSecureCurrentPassword)
            }
            onChangeText={setCurrentPassword}
          />
          <CTSSeparator />
          <CTSInput
            title="Password"
            value={password}
            animated
            secureTextEntry={isSecurePassword}
            rightSource={isSecurePassword ? eyeOnIcon : eyeOffIcon}
            onPressRight={() => setIsSecurePassword(!isSecurePassword)}
            onChangeText={setPassword}
          />
          <CTSSeparator />
          <CTSInput
            title="Confirm Password"
            value={confirmPassword}
            animated
            secureTextEntry={isSecureConfirmPassword}
            rightSource={isSecureConfirmPassword ? eyeOnIcon : eyeOffIcon}
            onPressRight={() =>
              setIsSecureConfirmPassword(!isSecureConfirmPassword)
            }
            onChangeText={setConfirmPassword}
          />
          <View style={{ marginHorizontal: 30, marginTop: 40 }}>
            <CTSButtonsGradient
              title="Update Password"
              onFullPress={onSubmit}
            />
          </View>
        </TouchableOpacity>
      </CTSKeyboardAvoidScrollView>

      <CTSConfirmationBox
        isVisible={isModalVisible}
        source={changePasswordImg}
        title="Congratulations your password has been changed."
        titleStyle={{ fontSize: fontSizes.f20 }}
        onConfirm={() => setIsModalVisible(false)}
        closeIcon={closeCircleIcon}
        onDismiss={setIsModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headingText: {
    fontFamily: fonts.sairaSemiBoldFont,
    fontSize: fontSizes.f17,
    color: colors.secondary,
  },
  descriptionText: {
    fontFamily: fonts.sairaMediumFont,
    fontSize: fontSizes.f13,
    color: colors.lightslategray,
    marginBottom: 10,
  },
});
