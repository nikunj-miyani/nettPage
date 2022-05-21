import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import { apiTest, rootLoader } from "../../../actions";
import { cameraIcon, galleryIcon } from "../../../assets/icons";
import { userPickerImg } from "../../../assets/images";
import {
  CTSAvatar,
  CTSButtonsGradient,
  CTSHeader,
  CTSKeyboardAvoidScrollView,
  CTSShadow,
  CTSSimpleInput,
} from "../../../components";
import { cameraPicker, photoPicker } from "../../../utils/MediaManger";
import CTActionSheet from "../../../components/CTActionSheet";
import CTSeparator from "../../../components/CTSeparator";
import { colors, fontSizes, fonts } from "../../../constants";
import { __simpleToast } from "../../../utils/basicFunctions/SimpleToast";

export default function EditProfile({ navigation }) {
  const userRegistrationType = useSelector(
    (data) => data.user.userRegistrationType
  );

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [imageData, setImageData] = useState({
    uri: "",
  });
  const [pickerOptions, setPickerOptions] = useState([
    {
      icon: cameraIcon,
      title: "Camera",
      onPress: () => hfPhotoPicker("camera"),
    },
    {
      icon: galleryIcon,
      title: "Gallery",
      onPress: () => hfPhotoPicker("gallery"),
    },
  ]);

  const hfPhotoPicker = async (option) => {
    if (option === "camera") {
      let res = await cameraPicker({ height: 1000, width: 1000 });
      if (res.status) {
        setImageData(res.data);
      }
    } else if (option === "gallery") {
      let res = await photoPicker({ height: 1000, width: 1000 });
      if (res.status) {
        setImageData(res.data);
      }
    }
    setIsPickerVisible(false);
  };

  const onSubmit = async () => {
    if (!name) return __simpleToast("Please enter name!");
    if (!(name.length <= 50))
      return __simpleToast("Name must be 50 character or less!");

    dispatch(rootLoader(true));
    const request = {
      name: name,
      bio: bio,
      website: website,
      profile: imageData,
    };
    const result = await apiTest(request, true);
    if (result.status) {
      if (userRegistrationType == "brand") {
        navigation.navigate("BrandRegistration");
      } else {
        navigation.navigate("AddAddress");
      }
    } else {
      __simpleToast(result.message);
    }
    dispatch(rootLoader(false));
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <CTSHeader
        title="Edit Profile"
        statusbarColor={colors.background}
        statusbarStyle="dark-content"
        onBackPress={() => navigation.goBack()}
      />
      <CTSKeyboardAvoidScrollView
        scrollContentContainerStyle={{ paddingTop: 20 }}
      >
        <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
          <View style={styles.profileContainer}>
            <CTSShadow style={styles.shadowStyle}>
              <CTSAvatar
                imagePlaceholderSource={userPickerImg}
                source={imageData}
                onPressEdit={() => setIsPickerVisible(!isPickerVisible)}
                contentContainerStyle={{ width: 125, height: 125 }}
              />
            </CTSShadow>
          </View>
          <CTSSimpleInput
            title="Name"
            placeholder="Enter name"
            value={name}
            onChangeText={setName}
          />
          <CTSeparator />
          <CTSSimpleInput
            title="Bio"
            placeholder="Enter bio"
            value={bio}
            maxLength={150}
            multiline
            subTitle={`${bio.length} / 150`}
            inputStyle={{
              height: 120,
              textAlignVertical: "top",
              paddingTop: 5,
            }}
            onChangeText={setBio}
          />
          <CTSeparator />
          <CTSSimpleInput
            title="Website"
            placeholder="Enter link"
            value={website}
            onChangeText={setWebsite}
          />
          <CTSeparator />
          <View style={{ paddingHorizontal: 5 }}>
            <Text style={styles.titleText}>Edit</Text>
            <View style={styles.infoContainer}>
              <TouchableOpacity style={styles.infoButton}>
                <Text style={styles.infoButtonText}>Business Info.</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.infoButton}>
                <Text style={styles.infoButtonText}>Banking Info.</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginHorizontal: 30, marginVertical: 40 }}>
            <CTSButtonsGradient title="Update" onFullPress={onSubmit} />
          </View>
        </TouchableOpacity>
      </CTSKeyboardAvoidScrollView>
      <SafeAreaView />
      <CTActionSheet
        isVisible={isPickerVisible}
        data={pickerOptions}
        onBackdropPress={setIsPickerVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 20,
    marginBottom: 50,
  },
  shadowStyle: {
    shadowColor: colors.lavender,
    shadowRadius: 5,
    shadowOpacity: 0.9,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  titleText: {
    fontSize: fontSizes.f15,
    fontFamily: fonts.sairaSemiBoldFont,
    color: colors.secondary,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  infoButton: {
    padding: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.secondary,
  },
  infoButtonText: {
    fontSize: fontSizes.f20,
    fontFamily: fonts.sairaMediumFont,
    color: colors.secondary,
  },
});
