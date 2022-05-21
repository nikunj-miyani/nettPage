import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Screens

import SignIn from "../screens/authentication/SignIn";
import SignUp from "../screens/authentication/SignUp";
import SelectUser from "../screens/authentication/SelectUser";
import AddAddress from "../screens/authentication/AddAddress";
import PhoneNumber from "../screens/authentication/PhoneNumber";
import VerifyPhone from "../screens/authentication/VerifyPhone";
import VerificationEmail from "../screens/authentication/VerificationEmail";
import ForgotPassword from "../screens/authentication/ForgotPassword";
import ResetPassword from "../screens/authentication/ResetPassword";
import BrandRegistration from "../screens/authentication/BrandRegistration";
import BankingInformation from "../screens/authentication/BankingInformation";

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
  // gestureEnabled: true,
  // cardShadowEnabled: false,
  // cardOverlayEnabled: false,
  // ...TransitionPresets.SlideFromRightIOS,
};

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="SignIn" screenOptions={screenOptions}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SelectUser" component={SelectUser} />
      <Stack.Screen name="AddAddress" component={AddAddress} />
      <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
      <Stack.Screen name="VerifyPhone" component={VerifyPhone} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="VerificationEmail" component={VerificationEmail} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="BrandRegistration" component={BrandRegistration} />
      <Stack.Screen name="BankingInformation" component={BankingInformation} />
    </Stack.Navigator>
  );
}

export default AuthStack;
