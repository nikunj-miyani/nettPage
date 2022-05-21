import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
} from "react-native";
import {
  homeIcon,
  homeOutlineIcon,
  notificationIcon,
  notificationOutlineIcon,
  profileIcon,
  profileOutlineIcon,
  settingIcon,
  settingOutlineIcon,
} from "../assets/icons";
import { CTSIcon, CTSShadow } from "../components";
import { colors, fonts, fontSizes } from "../constants";

export default function CustomUserStack({ navigation, state }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, [_keyboardDidHide, _keyboardDidShow]);

  const _keyboardDidShow = useCallback(() => {
    setIsVisible(false);
  }, [navigation]);

  const _keyboardDidHide = useCallback(() => {
    setIsVisible(true);
  }, [navigation]);

  return isVisible ? (
    <>
      <CTSShadow style={styles.shadowStyle}>
        <View style={styles.containerStyle}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              style={styles.centerStyle}
            >
              <CTSIcon
                source={state.index === 0 ? homeIcon : homeOutlineIcon}
                disabled
                iconStyle={{
                  width: 20,
                  height: 20,
                }}
              />
              <Text
                style={[
                  styles.titleStyle,
                  {
                    color:
                      state.index === 0 ? colors.primary : colors.gainsboro,
                  },
                ]}
              >
                Home
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Notification")}
              style={styles.centerStyle}
            >
              <CTSIcon
                source={
                  state.index === 1 ? notificationIcon : notificationOutlineIcon
                }
                disabled
                iconStyle={{
                  width: 20,
                  height: 20,
                }}
              />
              <Text
                style={[
                  styles.titleStyle,
                  {
                    color:
                      state.index === 1 ? colors.primary : colors.gainsboro,
                  },
                ]}
              >
                Notification
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")}
              style={styles.centerStyle}
            >
              <CTSIcon
                source={state.index === 2 ? profileIcon : profileOutlineIcon}
                disabled
                iconStyle={{
                  width: 20,
                  height: 20,
                }}
              />
              <Text
                style={[
                  styles.titleStyle,
                  {
                    color:
                      state.index === 2 ? colors.primary : colors.gainsboro,
                  },
                ]}
              >
                Profile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Settings")}
              style={styles.centerStyle}
            >
              <CTSIcon
                source={state.index === 3 ? settingIcon : settingOutlineIcon}
                disabled
                iconStyle={{
                  width: 20,
                  height: 20,
                }}
              />
              <Text
                style={[
                  styles.titleStyle,
                  {
                    color:
                      state.index === 3 ? colors.primary : colors.gainsboro,
                  },
                ]}
              >
                Settings
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </CTSShadow>
      <SafeAreaView style={{ backgroundColor: colors.white }} />
    </>
  ) : null;
}

const styles = StyleSheet.create({
  shadowStyle: {
    shadowColor: colors.steelblue,
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  containerStyle: {
    height: 50,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  iconViewStyle: {
    width: 5,
    height: 5,
    borderRadius: 50,
    marginTop: 3,
  },
  centerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleStyle: {
    fontSize: fontSizes.f10,
    color: colors.gainsboro,
    fontFamily: fonts.sairaMediumFont,
  },
});
