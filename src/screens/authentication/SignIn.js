import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Keyboard,
  StyleSheet,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import { rootLoader, verifySocialLogin, userLogin } from "../../actions/";
import { eyeOffIcon, eyeOnIcon } from "../../assets/icons";
import { loginImg, googleImg, appleImg } from "../../assets/images";
import mystyle from "../../assets/styles/mystyle";
import {
  CTSButtonsGradient,
  CTSIcon,
  CTSInput,
  CTSKeyboardAvoidScrollView,
  CTSSeparator,
} from "../../components";
import { colors, fontSizes, fonts } from "../../constants";
import { __simpleToast } from "../../utils/basicFunctions/SimpleToast";
import auth from "@react-native-firebase/auth";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { USER_LOGIN_TYPE, USER_SIGNIN } from "../../reducers/reducersType";
import message from "@react-native-firebase/messaging";
import { StackActions } from "@react-navigation/native";
import { appleAuth } from "@invertase/react-native-apple-authentication";

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true);

  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "802825754497-3c9hdaugvbfcvk7kcskcffg3j2uugbvs.apps.googleusercontent.com",
    });
  }, []);

  const onPressGoogle = async () => {
    const hDeviceToken = await message().getToken();
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const hAuthData = await auth().signInWithCredential(googleCredential);

      const request = {
        social_id: hAuthData?.user.uid,
        device_token: hDeviceToken,
        device_type: Platform.OS,
      };
      let hIsAvailableUserResult = await verifySocialLogin(request);

      if (hIsAvailableUserResult.status) {
        if (hIsAvailableUserResult?.data?.user_login_status == "is_signup") {
          dispatch({ type: USER_SIGNIN, payload: hAuthData });
          dispatch({ type: USER_LOGIN_TYPE, payload: "google_login" });
          navigation.navigate("SelectUser");
        } else {
          if (hIsAvailableUserResult.data.user_type === "brand_user") {
            navigation.dispatch(StackActions.replace("BrandStack"));
          } else {
            navigation.dispatch(StackActions.replace("UserStack"));
          }
        }
      } else {
        __simpleToast(hIsAvailableUserResult.message);
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        __simpleToast("Sign In Cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        __simpleToast("Sign In Pending");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        __simpleToast("Play Services Not Available");
      } else {
        __simpleToast(error.message);
      }
    }
  };

  const onPressApple = async () => {
    try {
      const hAppleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // Ensure Apple returned a user identityToken
      if (!hAppleAuthRequestResponse.identityToken) {
        throw new Error("Apple Sign-In failed - no identify token returned");
      }

      // Create a Firebase credential from the response
      const { identityToken, nonce } = hAppleAuthRequestResponse;
      const hAppleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce
      );
      const data = auth().signInWithCredential(hAppleCredential);
    } catch (error) {
      console.log(error);
      __simpleToast(error.message);
    }
  };

  const onPressLogin = async () => {
    const hDeviceToken = await message().getToken();

    let hReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!email) return __simpleToast("Please enter email!");
    if (!hReg.test(email)) return __simpleToast("Please enter valid email!");
    if (!password) return __simpleToast("Please enter password!");
    if (!(password.trim().length >= 8))
      return __simpleToast("Password must be 8 character!");

    dispatch(rootLoader(true));

    const request = {
      user_email_id: email.toLocaleLowerCase(),
      user_password: password,
      device_token: hDeviceToken,
      device_type: Platform.OS,
    };
    const result = await dispatch(userLogin(request));

    if (result?.status) {
      if (result?.data?.user_type == "brand_user") {
        navigation.dispatch(StackActions.replace("BrandStack"));
      } else {
        navigation.dispatch(StackActions.replace("UserStack"));
      }
    } else {
      __simpleToast(result.message);
    }

    dispatch(rootLoader(false));
  };

  const onPressSignUp = async () => {
    dispatch(rootLoader(true));
    dispatch({ type: USER_LOGIN_TYPE, payload: "normal_login" });
    navigation.navigate("SelectUser");
    dispatch(rootLoader(false));
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView />
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <CTSKeyboardAvoidScrollView
        scrollContentContainerStyle={{ paddingVertical: 20 }}
      >
        <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
          <CTSIcon
            disabled
            source={loginImg}
            iconStyle={{ width: 250, height: 250, alignSelf: "center" }}
          />
          <CTSInput
            title="Email"
            value={email}
            animated
            maxLength={50}
            keyboardType="email-address"
            onChangeText={setEmail}
          />
          <CTSSeparator />
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
          <TouchableOpacity
            style={{ alignSelf: "flex-end", marginTop: 8 }}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
          <View style={{ alignItems: "center" }}>
            <View style={{ marginHorizontal: 30, marginVertical: 30 }}>
              <CTSButtonsGradient title="Login" onFullPress={onPressLogin} />
            </View>
            <Text style={styles.socialText}>Or, Login with...</Text>
            <View style={{ flexDirection: "row", marginVertical: 20 }}>
              <CTSIcon
                style={mystyle.socialButton}
                source={googleImg}
                onPress={onPressGoogle}
              />
              {Platform.OS === "ios" && (
                <CTSIcon
                  style={mystyle.socialButton}
                  source={appleImg}
                  onPress={onPressApple}
                />
              )}
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: fontSizes.f18,
                  color: colors.lightslategray,
                  fontFamily: fonts.sairaRegularFont,
                }}
              >
                Don’t have an account?{" "}
              </Text>
              <TouchableOpacity onPress={onPressSignUp}>
                <Text
                  style={{
                    fontSize: fontSizes.f18,
                    color: colors.secondary,
                    textDecorationLine: "underline",
                    fontFamily: fonts.sairaBoldFont,
                  }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
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
  forgotText: {
    color: colors.dimgray,
    fontSize: fontSizes.f13,
    fontFamily: fonts.sairaMediumFont,
  },
  socialText: {
    fontSize: fontSizes.f13,
    color: colors.secondary,
    fontFamily: fonts.sairaSemiBoldFont,
  },
  haveAccount: {
    fontSize: fontSizes.f18,
    color: colors.lightslategray,
    fontFamily: fonts.sairaRegularFont,
  },
  signupText: {
    fontSize: fontSizes.f18,
    color: colors.secondary,
    textDecorationLine: "underline",
    fontFamily: fonts.sairaBoldFont,
  },
});
