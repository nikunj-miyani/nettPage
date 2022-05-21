import React, { useState, useEffect, useRef } from "react";
import {
  ImageBackground,
  ViewPropTypes,
  TouchableOpacity,
  View,
  Text,
  Platform,
  StyleSheet,
} from "react-native";
import PropTypes from "prop-types";
import Video from "react-native-video";
import __stylesFunc, {
  __themeStyleFunc,
} from "../utils/basicFunctions/StylesFunc";
import { videoPlaceholderImg } from "../assets/images";
import themeStyles from "../assets/styles/themestyles";
import { CTSIcon } from ".";
import { volumeOffIcon, volumeOnIcon, playCircleIcon } from "../assets/icons";
import Slider from "@react-native-community/slider";
import { colors, fonts, fontSizes } from "../constants";
import LinearGradient from "react-native-linear-gradient";

export default function CTVideoView({
  videoPlaceholderSource,
  source,
  onPress,
  isPausedVideo,
  height,
  width,
  style,
  videoStyle,
  containerStyle,
  contentContainerStyle,
  seekContainerStyle,
  seekBarStyle,
}) {
  const video = useRef();
  const [videoPlaceholder, setVideoPlaceholder] = React.useState(
    videoPlaceholderSource || videoPlaceholderImg
  );
  const [mute, setMute] = React.useState(true);
  const [pause, setPause] = React.useState(isPausedVideo);
  const [seekCurrentValue, setSeekCurrentValue] = useState(0);
  const [seekMaxValue, setSeekMaxValue] = useState(0);

  useEffect(() => {
    setPause(isPausedVideo);
  }, [isPausedVideo]);

  height = height || 100;
  width = width || 100;

  style = __themeStyleFunc(style, themeStyles.CTVideoView);
  containerStyle = __stylesFunc(containerStyle, style, "containerStyle");
  contentContainerStyle = __stylesFunc(
    contentContainerStyle,
    style,
    "contentContainerStyle"
  );
  videoStyle = __stylesFunc(videoStyle, style, "videoStyle");
  seekContainerStyle = __stylesFunc(
    seekContainerStyle,
    style,
    "seekContainerStyle"
  );
  seekBarStyle = __stylesFunc(seekBarStyle, style, "seekBarStyle");

  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? (h < 10 ? "0" + h : h) : "";
    var mDisplay = m > 0 ? (m < 10 ? "0" + m : m) : "00";
    var sDisplay = s > 0 ? (s < 10 ? "0" + s : s) : "00";
    return hDisplay + mDisplay + ":" + sDisplay;
  }

  return (
    <ImageBackground
      source={videoPlaceholder}
      style={[
        {
          width,
          height,
        },
        ...containerStyle,
      ]}
      resizeMode="cover"
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={[{ flex: 1 }, ...contentContainerStyle]}
      >
        <Video
          ref={video}
          source={{ uri: source }}
          style={[...videoStyle]}
          resizeMode="cover"
          repeat
          muted={mute}
          paused={pause}
          onLoad={(data) => {
            setVideoPlaceholder(null);
            setSeekMaxValue(data.duration);
          }}
          onProgress={(data) => {
            setSeekCurrentValue(data.currentTime);
          }}
          onError={(error) => {
            console.log("error", error);
          }}
          bufferConfig={{
            minBufferMs: 15000,
            maxBufferMs: 50000,
            bufferForPlaybackMs: 2500,
            bufferForPlaybackAfterRebufferMs: 5000,
          }}
        />
        <TouchableOpacity
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => setPause(!pause)}
        >
          {pause && (
            <CTSIcon
              disabled
              source={playCircleIcon}
              iconStyle={{
                width: 45,
                height: 45,
              }}
            />
          )}
        </TouchableOpacity>

        <LinearGradient
          colors={[colors.transparent, colors.transparentShadow]}
          style={[styles.seekContainerStyle, ...seekContainerStyle]}
          useAngle={true}
          angle={180}
          locations={[0.2, 0.5]}
        >
          <Slider
            thumbTintColor="#fff"
            value={seekCurrentValue}
            minimumValue={0}
            maximumValue={seekMaxValue}
            tapToSeek
            style={[styles.seekBarStyle, ...seekBarStyle]}
            onSlidingComplete={(data) => {
              video.current.seek(data);
            }}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#909090"
          />
          <View style={styles.textIconView}>
            <Text style={styles.timeText}>
              {secondsToHms(seekCurrentValue)}/{secondsToHms(seekMaxValue)}
            </Text>
            <CTSIcon
              source={mute ? volumeOnIcon : volumeOffIcon}
              iconStyle={{ width: 15, height: 15 }}
              onPress={() => setMute(!mute)}
            />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  seekContainerStyle: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingBottom: 8,
    paddingTop: 15,
  },
  seekBarStyle: {
    width: Platform.OS === "ios" ? "92%" : "100%",
    height: 20,
    marginHorizontal: Platform.OS === "ios" ? "4%" : 0,
  },
  textIconView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
  },
  timeText: {
    fontSize: fontSizes.f10,
    fontFamily: fonts.sairaRegularFont,
    color: colors.white,
  },
});

CTVideoView.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  volumePress: PropTypes.func,
  style: PropTypes.shape({
    imageStyle: PropTypes.object,
    containerStyle: ViewPropTypes.style,
    contentContainerStyle: ViewPropTypes.style,
    seekContainerStyle: ViewPropTypes.style,
  }),
};
