import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Image,
  ImageBackground,
} from "react-native";
import Video from "react-native-video";
import { useDispatch } from "react-redux";
import { locationIcon, playCircleIcon } from "../../../assets/icons";
import {
  CTSButtonsGradient,
  CTSHeader,
  CTSKeyboardAvoidScrollView,
  CTSSimpleInput,
  CTSSeparator,
  CTSAvatar,
  CTSDateTimePicker,
  CTSConfirmationBox,
} from "../../../components";
import { colors, fontSizes, fonts } from "../../../constants";
import { __simpleToast } from "../../../utils/basicFunctions/SimpleToast";
import { apiTest, rootLoader } from "../../../actions";
import { videoPlaceholderImg } from "../../../assets/images";

export default function NextCreatePost({ navigation, route }) {
  const hPostText = route.params?.postText;
  const hPostData = route.params?.postData;
  console.log(
    "🚀 ~ file: NextCreatePost.js ~ line 29 ~ NextCreatePost ~ hPostData",
    hPostData
  );
  const dispatch = useDispatch();

  const [offerTitle, setOfferTitle] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [location, setLocation] = useState("");
  const [offerStartDate, setOfferStartDate] = useState("");
  const [offerStartTime, setOfferStartTime] = useState("");
  const [offerEndDate, setOfferEndDate] = useState("");
  const [offerEndTime, setOfferEndTime] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [videoPaused, setVideoPaused] = useState(true);

  const onsubmit = async () => {
    if (!offerTitle) return __simpleToast("Please enter offer title!");
    if (!price) return __simpleToast("Please enter price!");
    if (!discount) return __simpleToast("Please enter discount!");
    if (!offerStartDate) return __simpleToast("Please enter offer start date!");
    if (!offerStartTime) return __simpleToast("Please enter offer start time!");
    if (!offerEndDate) return __simpleToast("Please select offer end date!");
    if (!offerEndTime) return __simpleToast("Please select offer end time!");
    if (offerStartDate > offerEndDate)
      return __simpleToast(
        "offer end date must be bigger than offer start date!"
      );
    if (new Date(offerStartTime).getTime() >= new Date(offerEndTime).getTime())
      return __simpleToast(
        "offer end time must be bigger than offer start time!"
      );

    if (!postalCode) return __simpleToast("Please enter postal code!");
    if (!(postalCode.trim().length == 6))
      return __simpleToast("Please enter valid postal code!");
    if (!location) return __simpleToast("Please enter location!");

    dispatch(rootLoader(true));
    const request = {
      offer_title: offerTitle,
      offer_price: price,
      offer_discount: discount,
      offer_start_date: offerStartDate,
      offer_start_time: offerStartTime,
      offer_end_date: offerEndDate,
      offer_end_time: offerEndTime,
      postal_code: postalCode,
      location: location,
    };
    const result = await apiTest(request, true);
    if (result.status) {
      __simpleToast("Success");
    } else {
      __simpleToast(result.message);
    }
    dispatch(rootLoader(false));
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
        onBackPress={() => navigation.goBack()}
        rightComp={
          <CTSButtonsGradient
            title="Post"
            height={35}
            leftComp={<View />}
            rightComp={<View />}
            onFullPress={onsubmit}
          />
        }
      />
      <CTSKeyboardAvoidScrollView
        scrollContentContainerStyle={{ paddingVertical: 20 }}
      >
        <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
          <View style={{ marginHorizontal: 15 }}>
            <Text style={styles.offerText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Text>
            {hPostData && hPostData.data != "" && hPostData.data != null && (
              <View style={{ marginTop: 10 }}>
                {hPostData?.type === "image" ? (
                  <Image
                    source={{
                      uri: hPostData.data.uri,
                    }}
                    style={{ width: "100%", height: 200 }}
                  />
                ) : null}
                {hPostData?.type === "video" ? (
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
                          uri: hPostData.thumbnail.uri,
                        }}
                      >
                        <Video
                          source={{
                            uri: hPostData.data.uri,
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
            )}
          </View>
          <CTSSeparator />
          <CTSSimpleInput
            title="Offer Title"
            placeholder="Enter offer"
            value={offerTitle}
            onChangeText={setOfferTitle}
          />
          <CTSSeparator />
          <CTSSimpleInput
            title="Price"
            placeholder="Enter price"
            value={price}
            onChangeText={setPrice}
            keyboardType="number-pad"
          />
          <CTSSeparator />
          <View>
            <CTSSimpleInput
              title="Discount (%)"
              placeholder="Enter discount"
              value={discount}
              onChangeText={setDiscount}
              keyboardType="number-pad"
            />
            <Text
              style={{
                position: "absolute",
                top: 40,
                right: 20,
                color: colors.secondary,
                fontSize: fontSizes.f16,
                fontFamily: fonts.sairaMediumFont,
              }}
            >
              %
            </Text>
          </View>
          <CTSSeparator />
          <View>
            <Text
              style={{
                fontSize: fontSizes.f15,
                fontFamily: fonts.sairaSemiBoldFont,
                color: colors.secondary,
                marginBottom: 5,
              }}
            >
              Offer Start Time
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 1, marginRight: 5 }}>
                <CTSDateTimePicker
                  mode="date"
                  selectedDate={offerStartDate}
                  getSelectedDate={(date) => setOfferStartDate(date)}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 5 }}>
                <CTSDateTimePicker
                  mode="time"
                  value={offerStartTime}
                  selectedTime={offerStartTime}
                  getSelectedTime={(time) => setOfferStartTime(time)}
                />
              </View>
            </View>
          </View>
          <CTSSeparator />
          <View>
            <Text
              style={{
                fontSize: fontSizes.f15,
                fontFamily: fonts.sairaSemiBoldFont,
                color: colors.secondary,
                marginBottom: 5,
              }}
            >
              Offer End Time
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 1, marginRight: 5 }}>
                <CTSDateTimePicker
                  mode="date"
                  selectedDate={offerEndDate}
                  getSelectedDate={(date) => setOfferEndDate(date)}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 5 }}>
                <CTSDateTimePicker
                  mode="time"
                  value={offerEndTime}
                  selectedTime={offerEndTime}
                  getSelectedTime={(time) => setOfferEndTime(time)}
                />
              </View>
            </View>
          </View>
          <CTSSeparator />
          <CTSSimpleInput
            title="Postal Code"
            placeholder="Enter code"
            value={postalCode}
            maxLength={6}
            keyboardType="number-pad"
            onChangeText={setPostalCode}
          />
          <CTSSeparator />
          <CTSSimpleInput
            title="Location"
            placeholder="Enter location"
            value={location}
            rightSource={locationIcon}
            onChangeText={setLocation}
          />
        </TouchableOpacity>
      </CTSKeyboardAvoidScrollView>

      <CTSConfirmationBox
        isVisible={isVisible}
        title="Are you sure you want offer extension of time ?"
        isGradientButton={false}
        confirmButtonTitle="Yes"
        onConfirm={() => setIsVisible(false)}
        onDismiss={() => setIsVisible(false)}
        dismissButtonTitle="No"
      />

      <SafeAreaView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headingText: {
    fontFamily: fonts.sairaSemiBoldFont,
    fontSize: fontSizes.f17,
    color: colors.secondary,
  },
  subHeadingText: {
    fontFamily: fonts.sairaSemiBoldFont,
    fontSize: fontSizes.f11,
    color: colors.lightslategray,
  },
  skipText: {
    fontFamily: fonts.sairaMediumFont,
    fontSize: fontSizes.f15,
    color: colors.lightslategray,
    textTransform: "uppercase",
  },
  offerText: {
    fontFamily: fonts.sairaMediumFont,
    fontSize: fontSizes.f12,
    color: colors.secondary,
    marginVertical: 10,
  },
});
