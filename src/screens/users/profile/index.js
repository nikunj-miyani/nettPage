import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  addIcon,
  archiveIcon,
  menuIcon,
  messageIcon,
  postListIcon,
  tagUserIcon,
  verifyIcon,
} from "../../../assets/icons";
import { sampleImg2 } from "../../../assets/images";
import {
  CTSAvatar,
  CTSButton,
  CTSHeader,
  CTSIcon,
  CTSTextMoreLessView,
} from "../../../components";
import { colors, fonts, fontSizes } from "../../../constants";

import { TabView, SceneMap, TabBar } from "react-native-tab-view";
// import { Tabs } from "react-native-collapsible-tab-view";

import ProfilePost from "./ProfilePost";
import ProfileArchive from "./ProfileArchive";
import ProfileTag from "./ProfileTag";

export default function Profile({ navigation }) {
  const gLayout = useWindowDimensions();

  const [tabIndex, setTabIndex] = React.useState(0);
  const gfRenderScene = ({ route }) => {
    switch (route.key) {
      case "ProfilePost":
        return <ProfilePost />;
      case "ProfileArchive":
        return <ProfileArchive />;
      case "ProfileTag":
        return <ProfileTag />;
      default:
        return null;
    }
  };
  // const gfRenderScene = SceneMap({
  //   ProfilePost: ProfilePost,
  //   ProfileArchive: ProfileArchive,
  //   ProfileTag: ProfileTag,
  // });
  const [routes, setRoutes] = React.useState([
    { key: "ProfilePost", title: "ProfilePost", icon: postListIcon },
    { key: "ProfileArchive", title: "ProfileArchive", icon: archiveIcon },
    { key: "ProfileTag", title: "ProfileTag", icon: tagUserIcon },
  ]);

  const onPressProfilePic = () => {};

  const gfRenderTabBar = (props) => {
    return (
      <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
        {routes.map((fItem, fIndex) => {
          return (
            <TouchableOpacity
              key={String(fIndex)}
              style={{
                ...styles.tabItemContainerStyle,
                borderBottomColor:
                  fIndex == tabIndex ? colors.secondary : colors.shimmeringSky,
              }}
              onPress={() => {
                setTabIndex(fIndex);
              }}
            >
              <CTSIcon
                source={fItem.icon}
                iconStyle={{
                  ...styles.tabIconStyle,
                  tintColor:
                    fIndex == tabIndex
                      ? colors.secondary
                      : colors.shimmeringSky,
                }}
                disabled
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <CTSHeader
        statusbarColor={colors.background}
        statusbarStyle="dark-content"
        headerContainerStyle={{ paddingTop: 10, paddingHorizontal: 20 }}
        leftComp={
          <View style={styles.headerTextContainerStyle}>
            <Text style={styles.headerTextStyle}>Prada</Text>
            <CTSIcon
              disabled
              source={verifyIcon}
              iconStyle={{ width: 20, height: 20 }}
            />
          </View>
        }
        rightComp={
          <View style={{ flexDirection: "row" }}>
            <CTSIcon
              source={messageIcon}
              iconStyle={{ width: 25, height: 25 }}
            />
            <View style={{ width: 10 }} />
            <CTSIcon source={menuIcon} iconStyle={{ width: 25, height: 25 }} />
          </View>
        }
      />
      {/* <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }}> */}
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ flexDirection: "row", paddingTop: 20 }}>
          <CTSAvatar
            source={sampleImg2}
            onPress={onPressProfilePic}
            onPressEdit={() => {}}
            size={71}
            editIconContainerStyle={styles.avatarEditIconContainerStyle}
            editComp={
              <CTSIcon
                disabled
                source={addIcon}
                iconStyle={styles.addIconStyle}
                iconContainerStyle={styles.addIconContainerStyle}
              />
            }
          />
          <View style={styles.detailsContainerStyle}>
            <View style={styles.detailsTextContainerStyle}>
              <Text style={styles.detailsNumericTextStyle}>2</Text>
              <Text style={styles.detailsAlphabeticalTextStyle}>Posts</Text>
            </View>
            <View style={styles.detailsSeparatorStyle} />
            <View style={styles.detailsTextContainerStyle}>
              <Text style={styles.detailsNumericTextStyle}>45.2M</Text>
              <Text style={styles.detailsAlphabeticalTextStyle}>
                Subscribers
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.descriptionContainerStyle}>
          <CTSTextMoreLessView
            style={styles.descriptionTextStyle}
            numberOfCharacter={100}
            text={
              "Lorem Ipsum is simply \ndummy text of the printing and typesetting industry"
            }
          />

          <Text style={styles.descriptionLinkStyle}>www.prada.com</Text>
        </View>
        <CTSButton
          contentContainerStyle={styles.editButtonContainerStyle}
          title="Edit Profile"
          titleStyle={styles.editButtonTitleStyle}
          onFullPress={() => navigation.navigate("EditProfile")}
        />
      </View>

      <TabView
        navigationState={{ index: tabIndex, routes: routes }}
        renderScene={gfRenderScene}
        onIndexChange={setTabIndex}
        initialLayout={{ width: gLayout.width }}
        renderTabBar={gfRenderTabBar}
        swipeEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 10,
  },
  headerTextContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTextStyle: {
    fontSize: fontSizes.f20,
    color: colors.secondary,
    fontFamily: fonts.sairaSemiBoldFont,
    marginRight: 3,
  },
  avatarEditIconContainerStyle: {
    width: 20,
    height: 20,
    backgroundColor: colors.blueBell,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    bottom: -4,
    right: -4,
  },
  addIconContainerStyle: {
    backgroundColor: colors.blueBell,
    borderRadius: 5,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  addIconStyle: {
    width: 10,
    height: 10,
    tintColor: colors.white,
  },
  detailsContainerStyle: {
    height: 71,
    flex: 1,
    marginLeft: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gainsboro,
    flexDirection: "row",
    alignItems: "center",
  },
  detailsSeparatorStyle: {
    height: "50%",
    width: 1.5,
    backgroundColor: colors.gainsboro,
  },
  detailsTextContainerStyle: {
    flex: 1,
    alignItems: "center",
  },
  detailsNumericTextStyle: {
    fontSize: fontSizes.f18,
    color: colors.secondary,
    fontFamily: fonts.sairaBoldFont,
  },
  detailsAlphabeticalTextStyle: {
    fontSize: fontSizes.f12,
    color: colors.lightslategray,
    fontFamily: fonts.sairaBoldFont,
  },
  descriptionContainerStyle: {
    marginTop: 20,
  },
  descriptionTextStyle: {
    fontSize: fontSizes.f12,
    color: colors.secondary,
    fontFamily: fonts.sairaRegularFont,
  },
  descriptionLinkStyle: {
    fontSize: fontSizes.f14,
    color: colors.secondary,
    fontFamily: fonts.sairaSemiBoldFont,
  },
  editButtonContainerStyle: {
    backgroundColor: colors.transparent,
    borderWidth: 1,
    width: "40%",
    alignSelf: "center",
    borderRadius: 10,
    borderColor: colors.lightslategray,
    justifyContent: "center",
    marginVertical: 20,
  },
  editButtonTitleStyle: {
    color: colors.lightslategray,
    fontSize: fontSizes.f15,
    fontFamily: fonts.sairaSemiBoldFont,
    flex: 0,
  },
  tabItemContainerStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  tabIconStyle: {
    width: fontSizes.f25,
    height: fontSizes.f25,
  },
});
