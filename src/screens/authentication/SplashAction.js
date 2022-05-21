import React, { useEffect } from "react";

// import NetInfo from '@react-native-community/netinfo';
import { useDispatch } from "react-redux";
import SplashScreen from "react-native-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { appVersionCheck } from "../../actions";
import { StackActions, useNavigation } from "@react-navigation/native";
import { __simpleToast } from "../../utils/basicFunctions/SimpleToast";
import asyncAccess from "../../constants/asyncAccess";
import { setLoginDetails } from "../../actions";
import Shortcuts from "react-native-actions-shortcuts";
import { checkIcon } from "../../assets/icons";
import { NativeEventEmitter, Platform } from "react-native";

export default function SplashAction({}) {
  const navigation = useNavigation();
  const ShortcutsEmitter = new NativeEventEmitter(Shortcuts);
  const hfShortcutAction = async () => {
    const postItem = {
      type: "post",
      title: "Add post",
      shortTitle: "set post",
      subtitle: "create new post",
      iconName: "post_ic",
      data: {
        navigationKey: "SelectUser",
      },
    };
    const storyItem = {
      type: "story",
      title: "Add story",
      shortTitle: "set story",
      subtitle: "Create new Story",
      iconName: "camera_ic",
      data: {
        navigationKey: "SignUp",
      },
    };
    const messageItem = {
      type: "message",
      title: "Message",
      shortTitle: "send message",
      subtitle: "chat with friends",
      iconName: "direct_ic",
      data: {
        navigationKey: "SignIn",
      },
    };

    Shortcuts.setShortcuts([postItem, storyItem, messageItem]);
  };
  const dispatch = useDispatch();
  React.useEffect(() => {
    ShortcutsEmitter.addListener("onShortcutItemPressed", (shortcutsProps) => {
      navigation.navigate(shortcutsProps.data.navigationKey);
    });
    Shortcuts.getInitialShortcut().then((shortcutsProps) => {
      const navigationKey = shortcutsProps?.data?.navigationKey;
      navigationKey &&
        setTimeout(() => {
          navigation.navigate(navigationKey);
        }, 100);
    });
  }, [Shortcuts]);

  useEffect(() => {
    hfShortcutAction();
    checkAuth();
  }, []);

  const checkAuth = async () => {
    let hUserDetails = await AsyncStorage.getItem(
      asyncAccess.CURRENT_USER_PROFILE
    );
    if (hUserDetails) {
      hUserDetails = JSON.parse(hUserDetails);
      appVersionCheck(hUserDetails.user_id);
      await dispatch(setLoginDetails(hUserDetails));

      if (hUserDetails.user_type == "brand_user") {
        navigation.dispatch(StackActions.replace("BrandStack"));
      } else {
        navigation.dispatch(StackActions.replace("UserStack"));
      }
    } else {
      appVersionCheck("");
      navigation.dispatch(StackActions.replace("BrandStack"));
    }
    SplashScreen.hide();
  };
  return null;
}
