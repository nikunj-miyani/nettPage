import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Screens
import AuthStack from "./AuthStack";
import BrandStack from "./BrandStack";
import SplashAction from "../screens/authentication/SplashAction";
import { useSelector } from "react-redux";
import SplashScreen from "react-native-splash-screen";
import UserStack from "./UserStack";

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
  // gestureEnabled: true,
  // cardShadowEnabled: false,
  // cardOverlayEnabled: false,
  // ...TransitionPresets.SlideFromRightIOS,
};

function App() {
  const { userInfo } = useSelector((state) => state.user);
  // useEffect(() => {
  //   // if (userInfo == null) {
  //   //   SplashScreen.hide();
  //   // }
  // }, [userInfo]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="UserStack"
          screenOptions={screenOptions}
        >
          {/* {userInfo == null ? (
            <> */}
          <Stack.Screen name="SplashAction" component={SplashAction} />
          <Stack.Screen name="AuthStack" component={AuthStack} />
          {/* </>
          ) : ( */}
          <Stack.Screen name="BrandStack" component={BrandStack} />
          <Stack.Screen name="UserStack" component={UserStack} />
          {/* )} */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
