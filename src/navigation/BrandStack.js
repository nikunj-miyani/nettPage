import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

// Custom Tab
import CustomBottomStack from "./CustomBottomStack";
//Screens
import Home from "../screens/users/home/Home";
import Notification from "../screens/users/notification/Notification";
import Profile from "../screens/users/profile";
import Settings from "../screens/users/settings/Settings";

import EditProfile from "../screens/users/profile/EditProfile";
import ChangePassword from "../screens/users/settings/ChangePassword";
import PrivacyPolicy from "../screens/users/settings/PrivacyPolicy";
import TermsConditions from "../screens/users/settings/TermsConditions";
import CreatePost from "../screens/users/post/CreatePost";
import NextCreatePost from "../screens/users/post/NextCreatePost";
import TagPeople from "../screens/users/post/TagPeople";

const BottomStack = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function BrandStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="BrandHomeStack"
      screenOptions={{
        gestureEnabled: false,
        headerBackTitle: false,
        headerShown: false,
      }}
    >
      {/* Home */}
      <Stack.Screen name="BrandHomeStack" component={BrandHomeStack} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
      <Stack.Screen name="TagPeople" component={TagPeople} />
      <Stack.Screen name="NextCreatePost" component={NextCreatePost} />

      {/* Notification */}

      {/* Profile */}
      <Stack.Screen name="EditProfile" component={EditProfile} />

      {/* Setting */}
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="TermsConditions" component={TermsConditions} />
    </Stack.Navigator>
  );
}

const BrandHomeStack = () => (
  <BottomStack.Navigator
    initialRouteName="Home"
    tabBar={(props) => <CustomBottomStack {...props} />}
    screenOptions={{
      gestureEnabled: false,
    }}
  >
    <BottomStack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />

    <BottomStack.Screen
      name="Notification"
      component={Notification}
      options={{ headerShown: false }}
    />
    <BottomStack.Screen
      name="Profile"
      component={Profile}
      options={{ headerShown: false }}
    />
    <BottomStack.Screen
      name="Settings"
      component={Settings}
      options={{ headerShown: false }}
    />
  </BottomStack.Navigator>
);
