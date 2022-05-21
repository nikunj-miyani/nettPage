import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View } from "react-native";
import { apiTest, rootLoader } from "../actions";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useDispatch } from "react-redux";
import { StackActions } from "@react-navigation/native";
import { CTSButtonsGradient } from "../components";
import { logoutIcon } from "../assets/icons";
import { __clearAllLocalData } from "../utils/basicFunctions/AsyncStorage";
import GetOffers from "../screens/users/home/GetOffers";
import OnboardingSecond from "../screens/users/home/OnboardingSecond";

// Screens

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
  // gestureEnabled: true,
  // cardShadowEnabled: false,
  // cardOverlayEnabled: false,
  // ...TransitionPresets.SlideFromRightIOS,
};

const Home = ({ navigation }) => {
  const dispatch = useDispatch();

  const onsubmit = async () => {
    dispatch(rootLoader(true));
    const request = {};
    const result = await apiTest(request, true);
    if (result.status) {
      const hIsGoogleSigned = await GoogleSignin.isSignedIn();
      if (hIsGoogleSigned) {
        GoogleSignin.signOut();
      }
      __clearAllLocalData();
      navigation.dispatch(StackActions.replace("AuthStack"));
    } else {
      __simpleToast(result.message);
    }
    dispatch(rootLoader(false));
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <CTSButtonsGradient
        title="Log Out"
        onFullPress={onsubmit}
        rightSource={logoutIcon}
        iconDisabled
        // contentContainerStyle={{
        //   justifyContent: "center",
        // }}
        // titleStyle={{ flex: 0 }}
      />
    </View>
  );
};

function UserStack() {
  return (
    <Stack.Navigator initialRouteName="GetOffers" screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={Home} />

      <Stack.Screen name="GetOffers" component={GetOffers} />
      <Stack.Screen name="OnboardingSecond" component={OnboardingSecond} />
    </Stack.Navigator>
  );
}

export default UserStack;
