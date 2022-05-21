import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { apiTest, rootLoader } from "../../../actions";
import {
  rightArrowIcon,
  offerHistoryIcon,
  bookmarkIcon,
  blocklistIcon,
  policyIcon,
  lockIcon,
  termsIcon,
  logoutIcon,
} from "../../../assets/icons";
import { sampleImg } from "../../../assets/images";
import FastImage from "react-native-fast-image";
import { getVersion } from "react-native-device-info";
import {
  CTSAvatar,
  CTSButtonsGradient,
  CTSHeader,
  CTSIcon,
  CTSSeparator,
  CTSSeparatorLine,
  CTSShadow,
} from "../../../components";
import { colors, fontSizes, fonts } from "../../../constants";
import { __simpleToast } from "../../../utils/basicFunctions/SimpleToast";
import { StackActions } from "@react-navigation/native";
import { __clearAllLocalData } from "../../../utils/basicFunctions/AsyncStorage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function Settings({ navigation }) {
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
    <View style={styles.container}>
      <SafeAreaView />
      <CTSHeader
        title="Settings"
        statusbarColor={colors.background}
        statusbarStyle="dark-content"
      />
      <View style={styles.containerViewStyle}>
        <View style={[styles.rowCenterStyle, styles.profileView]}>
          <View style={styles.rowCenterStyle}>
            <CTSAvatar
              source={sampleImg}
              onPress={() => setIsPickerVisible(!isPickerVisible)}
              contentContainerStyle={{ width: 65, height: 65 }}
            />
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.headingText}>Levi Garcia</Text>
              <Text style={styles.subHeadingText}>My Profile</Text>
            </View>
          </View>
          <CTSIcon
            disabled
            source={rightArrowIcon}
            iconStyle={[
              {
                tintColor: colors.dimgray,
              },
              styles.rightArrow,
            ]}
          />
        </View>

        <CTSSeparatorLine
          separatorStyle={{ marginHorizontal: 20, marginTop: 20 }}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 20 }}
          bounces={true}
        >
          <ListItemView
            source={offerHistoryIcon}
            title="Offer History"
            onPress={() => console.log("Offer History")}
          />
          <CTSSeparator />
          <ListItemView
            source={bookmarkIcon}
            title="My Bookmarks"
            onPress={() => console.log("My Bookmarks")}
          />
          <CTSSeparator />
          <ListItemView
            source={blocklistIcon}
            title="Block List"
            onPress={() => console.log("Block List")}
          />
          <CTSSeparator />
          <ListItemView
            source={lockIcon}
            title="Change Password"
            onPress={() => console.log("Change Password")}
          />
          <CTSSeparator />
          <ListItemView
            source={policyIcon}
            title="Privacy Policy"
            onPress={() => console.log("Privacy Policy")}
          />
          <CTSSeparator />
          <ListItemView
            source={termsIcon}
            title="Terms & Conditions"
            onPress={() => console.log("Terms & Conditions")}
          />

          <View style={{ marginHorizontal: 30, marginTop: 40 }}>
            <CTSButtonsGradient
              title="Log Out"
              onFullPress={onsubmit}
              iconDisabled
              leftComp={<View />}
              rightComp={
                <CTSIcon
                  disabled
                  source={logoutIcon}
                  iconStyle={{ width: 25, height: 25 }}
                  iconContainerStyle={{ marginLeft: 10 }}
                />
              }
              contentContainerStyle={{ justifyContent: "center" }}
              titleStyle={{ flex: 0 }}
            />
          </View>
          <Text style={styles.versionText}>{`version ${getVersion()}`}</Text>
        </ScrollView>
      </View>
      <SafeAreaView />
    </View>
  );
}

const ListItemView = ({ source, title, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.rowCenterStyle, { justifyContent: "space-between" }]}
      onPress={onPress}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CTSShadow style={styles.shadowStyle}>
          <View style={styles.iconContainerStyle}>
            <FastImage
              source={source}
              style={[
                {
                  width: 25,
                  height: 25,
                },
              ]}
              resizeMode={"contain"}
            />
          </View>
        </CTSShadow>
        <View style={styles.titleContainerStyle}>
          <Text style={styles.titleStyle}>{title}</Text>
        </View>
      </View>
      <CTSIcon
        disabled
        source={rightArrowIcon}
        iconStyle={[
          styles.rightArrow,
          {
            tintColor: colors.dimgray,
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  containerViewStyle: {
    flex: 1,
    paddingTop: 20,
  },
  rowCenterStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  shadowStyle: {
    shadowColor: colors.steelblue,
    shadowRadius: 5,
    shadowOpacity: 0.21,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  profileView: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  headingText: {
    fontSize: fontSizes.f20,
    color: colors.secondary,
    fontFamily: fonts.sairaSemiBoldFont,
  },
  subHeadingText: {
    fontSize: fontSizes.f15,
    color: colors.lightslategray,
    fontFamily: fonts.sairaRegularFont,
    textDecorationLine: "underline",
  },
  contentContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rightArrow: {
    width: 25,
    height: 25,
  },
  iconContainerStyle: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  titleContainerStyle: {
    marginLeft: 15,
  },
  titleStyle: {
    fontSize: fontSizes.f15,
    fontFamily: fonts.sairaMediumFont,
    color: colors.secondary,
  },
  versionText: {
    fontSize: fontSizes.f15,
    fontFamily: fonts.sairaMediumFont,
    color: colors.secondSilver,
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 50,
  },
});
