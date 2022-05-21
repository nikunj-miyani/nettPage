import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  ImageBackground,
  BackHandler,
  Alert,
} from "react-native";
import Video from "react-native-video";
import {
  cameraIcon,
  closeCircleIcon,
  galleryIcon,
  leftArrowIcon,
  playCircleIcon,
  tagUserIcon,
  verifyIcon,
  videoIcon,
} from "../../../assets/icons";
import { sampleImg2, videoPlaceholderImg } from "../../../assets/images";
import {
  CTSActionSheet,
  CTSConfirmationBox,
  CTSHeader,
  CTSIcon,
  CTSSeparatorLine,
  CTSShadow,
} from "../../../components";
import { colors, fonts, fontSizes } from "../../../constants";
import {
  cameraPicker,
  photoPicker,
  recordVideo,
  videoPicker,
} from "../../../utils/MediaManger";

export default function CreatePost({ navigation, route }) {
  const [postText, setPostText] = useState("");
  const [mediaData, setMediaData] = useState({ type: "", data: "", uri: "" });
  const [videoPaused, setVideoPaused] = useState(true);
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [tagPeople, setTagPeople] = useState([]);
  const pickerOptions = [
    {
      icon: cameraIcon,
      title: "Photo",
      onPress: () => hfGalleryPicker("photo"),
    },
    {
      icon: videoIcon,
      title: "Video",
      onPress: () => hfGalleryPicker("video"),
    },
  ];

  React.useEffect(() => {
    if (route.params?.tagPeople) {
      setTagPeople(route.params.tagPeople);
    }
  }, [route.params?.tagPeople]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const backAction = () => {
    setIsVisible(true);
    return true;
  };

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    //  Don't forget to cleanup with remove listeners
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setIsKeyboardShow(true);
  };

  const _keyboardDidHide = () => {
    setIsKeyboardShow(false);
  };

  const hfPhotoPicker = async () => {
    let res = await cameraPicker({ height: 200, width: 300 });
    if (res.status) {
      setMediaData({
        type: "image",
        data: res.data,
        uri: res.data.uri,
      });
    }
  };

  const hfGalleryPicker = async (option) => {
    if (option === "photo") {
      let res = await photoPicker({ height: 200, width: 300 });
      if (res.status) {
        setMediaData({
          type: "image",
          data: res.data,
          uri: res.data.uri,
        });
      }
    } else if (option === "video") {
      let res = await videoPicker();
      if (res.status) {
        setMediaData({
          type: "video",
          data: res.data,
          uri: res.data.uri,
          thumbnail: res.thumbnail,
        });
      }
    }
    setIsPickerVisible(false);
  };

  const hfVideoPicker = async () => {
    const options = {
      mediaType: "video",
      videoQuality: "medium",
      durationLimit: 30,
    };
    let res = await recordVideo(options);
    if (res.status) {
      setMediaData({
        type: "video",
        data: res.data,
        uri: res.data.uri,
        thumbnail: res.thumbnail,
      });
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <CTSHeader
        statusbarColor={colors.background}
        title="Create Post"
        statusbarStyle="dark-content"
        headerTitleStyle={{ textAlign: "left" }}
        rightCompContainerStyle={{ marginRight: 20 }}
        onBackPress={() => setIsVisible(true)}
        rightComp={
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() =>
              navigation.navigate("NextCreatePost", {
                postText: postText,
                postData: mediaData,
              })
            }
          >
            <Text style={styles.headerButtonText}>Next</Text>
          </TouchableOpacity>
        }
      />

      <View style={{ flex: 1, paddingTop: 30, paddingHorizontal: 20 }}>
        <View style={[styles.rowCenterStyle, { paddingVertical: 10 }]}>
          <CTSIcon
            disabled
            source={sampleImg2}
            iconStyle={{ width: 40, height: 40, borderRadius: 20 }}
          />
          <View style={{ marginLeft: 10 }}>
            <View style={styles.rowCenterStyle}>
              <Text style={styles.titleText}>Prada</Text>
              <CTSIcon
                disabled
                source={verifyIcon}
                iconContainerStyle={{ marginLeft: 8 }}
                iconStyle={{ width: 20, height: 20 }}
              />
            </View>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingBottom: 20 }}
        >
          <View style={{ borderColor: colors.gray }}>
            <TextInput
              placeholder="Type Something Here.."
              placeholderTextColor={colors.lightGray}
              value={postText}
              multiline
              style={styles.input}
              onChangeText={(text) => setPostText(text)}
            />
          </View>
          {mediaData?.uri !== "" && mediaData !== null ? (
            <View style={{ marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => setMediaData(null)}
                style={{
                  position: "absolute",
                  right: 10,
                  top: 10,
                  zIndex: 100,
                  backgroundColor: colors.white,
                  borderRadius: 5,
                  padding: 5,
                }}
              >
                <CTSIcon
                  source={closeCircleIcon}
                  iconSize={20}
                  disabled
                  iconStyle={{ tintColor: colors.primary }}
                />
              </TouchableOpacity>
              {mediaData?.type === "image" ? (
                <Image
                  source={{
                    uri: mediaData.uri,
                  }}
                  style={{ width: "100%", height: 200 }}
                />
              ) : null}
              {mediaData?.type === "video" ? (
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  activeOpacity={1}
                  onPress={() => {
                    setVideoPaused(!videoPaused);
                  }}
                >
                  {videoPaused && (
                    <View
                      style={{
                        backgroundColor: "rgba(0,0,0,0.5)",
                        borderRadius: 50,
                        padding: 20,
                        width: 50,
                        height: 50,
                        zIndex: 1,
                        position: "absolute",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={playCircleIcon}
                        style={{
                          width: 30,
                          height: 30,
                          tintColor: colors.white,
                        }}
                      />
                    </View>
                  )}
                  <ImageBackground
                    style={{
                      width: "100%",
                      height: 200,
                      resizeMode: "cover",
                    }}
                    source={videoPlaceholderImg}
                  >
                    <ImageBackground
                      style={{
                        width: "100%",
                        height: 200,
                        resizeMode: "cover",
                      }}
                      source={{
                        uri: mediaData.thumbnail.uri,
                      }}
                    >
                      <Video
                        source={{
                          uri: mediaData.uri,
                        }}
                        style={{
                          width: "100%",
                          height: 200,
                        }}
                        resizeMode="cover"
                        repeat
                        paused={videoPaused}
                        onError={(error) => console.log(error)}
                        bufferConfig={{
                          minBufferMs: 5000,
                          maxBufferMs: 30000,
                          bufferForPlaybackMs: 2500,
                          bufferForPlaybackAfterRebufferMs: 5000,
                        }}
                      />
                    </ImageBackground>
                  </ImageBackground>
                </TouchableOpacity>
              ) : null}
            </View>
          ) : null}
        </ScrollView>
      </View>

      {!isKeyboardShow && (
        <CTSShadow
          style={{
            shadowColor: colors.steelblue,
            shadowRadius: 8,
            shadowOpacity: 0.2,
            shadowOffset: {
              width: 0,
              height: 2,
            },
          }}
        >
          <View style={{ alignItems: "center", backgroundColor: colors.white }}>
            <View
              style={{
                width: "60%",
                height: 50,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CTSIcon
                source={cameraIcon}
                onPress={() => hfPhotoPicker()}
                iconContainerStyle={{
                  flex: 1,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                iconStyle={{ width: 20, height: 20, tintColor: colors.dimgray }}
              />
              <CTSIcon
                source={galleryIcon}
                onPress={() => setIsPickerVisible(!isPickerVisible)}
                iconContainerStyle={{
                  flex: 1,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                iconStyle={{ width: 20, height: 20, tintColor: colors.dimgray }}
              />
              <CTSIcon
                source={videoIcon}
                onPress={() => hfVideoPicker()}
                iconContainerStyle={{
                  flex: 1,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                iconStyle={{ width: 20, height: 20, tintColor: colors.dimgray }}
              />
              <TouchableOpacity
                style={{
                  flex: 1,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() =>
                  navigation.navigate("TagPeople", {
                    selectedPeople: tagPeople,
                  })
                }
              >
                <CTSIcon
                  disabled
                  source={tagUserIcon}
                  iconStyle={{
                    width: 20,
                    height: 20,
                    tintColor: colors.dimgray,
                  }}
                />
                {tagPeople.length > 0 && (
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      alignItems: "center",
                      justifyContent: "center",
                      position: "absolute",
                      right: 8,
                      top: 5,
                      backgroundColor: colors.forestgreen,
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: fontSizes.f12,
                        color: colors.white,
                        fontFamily: fonts.sairaSemiBoldFont,
                      }}
                    >
                      {tagPeople.length}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </CTSShadow>
      )}

      <CTSActionSheet
        isVisible={isPickerVisible}
        data={pickerOptions}
        onBackdropPress={setIsPickerVisible}
      />

      <CTSConfirmationBox
        isVisible={isVisible}
        title="Are you sure you want to finish your post ?"
        isGradientButton={false}
        confirmButtonTitle="Yes"
        onConfirm={() => {
          setIsVisible(false);
          navigation.goBack();
        }}
        dismissButtonTitle="No"
        onDismiss={() => setIsVisible(false)}
      />
      <SafeAreaView style={{ backgroundColor: colors.white }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerText: {
    fontSize: fontSizes.f18,
    fontFamily: fonts.sairaSemiBoldFont,
    color: colors.midnightblue,
    marginLeft: 8,
  },
  rowCenterStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerButton: {
    borderWidth: 1,
    borderColor: colors.dimgray,
    borderRadius: 5,
    width: 80,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  headerButtonText: {
    fontSize: fontSizes.f20,
    fontFamily: fonts.sairaMediumFont,
    color: colors.dimgray,
  },
  titleText: {
    fontSize: fontSizes.f20,
    fontFamily: fonts.sairaMediumFont,
    color: colors.secondary,
  },
  input: {
    fontSize: fontSizes.f20,
    fontFamily: fonts.sairaMediumFont,
    color: colors.lightslategray,
    overflow: "scroll",
    textAlignVertical: "top",
  },
});
