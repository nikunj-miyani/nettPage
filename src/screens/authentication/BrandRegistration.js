import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Keyboard } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import {
  editUser,
  getCategoryList,
  getCityList,
  getCountryList,
  getStateList,
  rootLoader,
} from "../../actions";

import {
  cameraIcon,
  documentUploadIcon,
  galleryIcon,
} from "../../assets/icons";
import {
  CTSActionSheet,
  CTSButtonsGradient,
  CTSHeader,
  CTSIcon,
  CTSKeyboardAvoidScrollView,
  CTSSelectBoxDropdown,
  CTSSeparator,
  CTSShadow,
  CTSSimpleInput,
} from "../../components";
import { colors, fonts, fontSizes } from "../../constants";
import Api from "../../utils/Api";
import { __simpleToast } from "../../utils/basicFunctions/SimpleToast";
import { cameraPicker, photoPicker } from "../../utils/MediaManger";

const GHeaderLef = ({ title }) => {
  return (
    <Text
      style={{
        fontSize: fontSizes.f20,
        color: colors.secondary,
        fontFamily: fonts.sairaSemiBoldFont,
      }}
    >
      {title}
    </Text>
  );
};

const GDocumentPicker = ({ gettedData }) => {
  const [imageData, setImageData] = useState(null);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const pickerOptions = [
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
  ];

  const hfPhotoPicker = async (option) => {
    if (option === "camera") {
      let res = await cameraPicker({ height: 1000, width: 1000 });
      if (res.status) {
        setImageData(res.data);
        gettedData(res.data);
      }
    } else if (option === "gallery") {
      let res = await photoPicker({ height: 1000, width: 1000 });
      if (res.status) {
        setImageData(res.data);
        gettedData(res.data);
      }
    }
    setIsPickerVisible(false);
  };

  return (
    <CTSShadow style={styles.shadowContainerStyle}>
      <CTSActionSheet
        isVisible={isPickerVisible}
        data={pickerOptions}
        onBackdropPress={setIsPickerVisible}
      />
      {imageData ? (
        <TouchableOpacity
          onPress={() => setIsPickerVisible(!isPickerVisible)}
          style={styles.selectedDocContainerStyle}
        >
          <CTSIcon
            source={{ uri: imageData?.uri }}
            iconStyle={{ width: 45, height: 45, borderRadius: 10 }}
          />
          <Text style={styles.selectedDocTextStyle}>{imageData?.name}</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => setIsPickerVisible(!isPickerVisible)}
            style={styles.unSelectedDocContainerStyle}
          >
            <CTSIcon
              source={documentUploadIcon}
              iconStyle={{ width: 30, height: 30, marginBottom: 5 }}
            />
            <Text style={styles.descriptionStyle}>
              Your File here or Browse to upload
            </Text>
            <Text style={styles.subDescriptionStyle}>
              Only JPEG, PNG and PDF Files
            </Text>
          </TouchableOpacity>
        </>
      )}
    </CTSShadow>
  );
};
export default function BrandRegistration({ navigation }) {
  const dispatch = useDispatch();

  const [bio, setBio] = useState("");
  const [link, setLink] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessOwner, setBusinessOwner] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [yearOfEstablishment, setYearOfEstablishment] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [incorporationDoc, setIncorporationDoc] = useState("");
  const [addressDoc, setAddressDoc] = useState("");
  const [countryArray, setCountryArray] = useState([]);
  const [stateArray, setStateArray] = useState([]);
  const [cityArray, setCityArray] = useState([]);
  const [businessTypeArray, setBusinessTypeArray] = useState([]);

  React.useEffect(() => {
    fGetCountryList();
    fGetBusinessTypeList();
  }, [navigation]);

  React.useEffect(() => {
    fGetStateList();
    setState("");
    setCity("");
  }, [country]);

  React.useEffect(() => {
    fGetCity();
    setCity("");
  }, [state]);

  const onPressNext = async () => {
    let hReg =
      /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    if (bio == "") {
      return __simpleToast("Please Enter Bio");
    } else if (link == "") {
      return __simpleToast("Please Enter Link");
    } else if (!hReg.test(link)) {
      return __simpleToast("Please Enter Valid Link");
    } else if (businessName == "") {
      return __simpleToast("Please Enter Business Name");
    } else if (businessOwner == "") {
      return __simpleToast("Please Enter Business Owner Name");
    } else if (businessType == "") {
      return __simpleToast("Please Select Business Type");
    } else if (yearOfEstablishment == "") {
      return __simpleToast("Please Enter Year of Establishment");
    } else if (yearOfEstablishment.length < 4) {
      return __simpleToast("Please Enter Valid Year ");
    } else if (address == "") {
      return __simpleToast("Please Enter Address");
    } else if (country == "") {
      return __simpleToast("Please Select Country");
    } else if (state == "") {
      return __simpleToast("Please Select State");
    } else if (city == "") {
      return __simpleToast("Please Select City");
    } else if (incorporationDoc == "") {
      return __simpleToast("Please Enter Proof of Incorporation Document");
    } else if (addressDoc == "") {
      return __simpleToast("Please Enter Proof of Address");
    }
    dispatch(rootLoader(true));
    const request = {
      user_bio: bio,
      user_website: link,
      business_name: businessName,
      business_owner: businessOwner,
      category_id: businessType.category_id,
      establishment_year: yearOfEstablishment,
      user_address: address,
      country_id: country.country_id,
      state_id: state.state_id,
      city_id: city.city_id,
      incorporation_doc: incorporationDoc,
      address_proof_doc: addressDoc,
    };
    const hResult = await editUser(request);

    if (hResult.status) {
      navigation.navigate("BankingInformation");
    } else {
      __simpleToast(hResult.message);
    }
    dispatch(rootLoader(false));
  };

  const onPressSkip = async () => {
    navigation.navigate("BankingInformation");
  };
  const fGetCountryList = async () => {
    try {
      const hCountryData = await getCountryList();

      if (hCountryData.status) {
        setCountryArray(hCountryData?.data);
      }
    } catch (error) {
      __simpleToast(error.message);
    }
  };
  const fGetStateList = async () => {
    try {
      const request = { country_id: country?.country_id };
      const hStateData = await getStateList(request);
      if (hStateData.status) {
        setStateArray(hStateData?.data);
      }
    } catch (error) {
      __simpleToast(error.message);
    }
  };

  const fGetCity = async () => {
    try {
      const request = { state_id: state?.state_id };
      const hCityData = await getCityList(request);
      if (hCityData.status) {
        setCityArray(hCityData?.data);
      }
    } catch (error) {
      __simpleToast(error.message);
    }
  };

  const fGetBusinessTypeList = async () => {
    try {
      const hBusinessTypeData = await getCategoryList();

      if (hBusinessTypeData.status) {
        setBusinessTypeArray(hBusinessTypeData?.data);
      }
    } catch (error) {
      __simpleToast(error.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView />
      <CTSHeader
        title="Brand Registration"
        statusbarColor={colors.background}
        statusbarStyle="dark-content"
        onBackPress={() => navigation.goBack()}
      />
      <CTSKeyboardAvoidScrollView>
        <GHeaderLef title={"Basic Info."} />
        <CTSSeparator />
        <CTSSimpleInput
          title="Bio"
          placeholder="Enter bio"
          value={bio}
          maxLength={150}
          multiline
          subTitle={`${bio.length} / 150`}
          inputStyle={{ height: 120, textAlignVertical: "top", paddingTop: 5 }}
          onChangeText={setBio}
        />
        <CTSSeparator />
        <CTSSimpleInput
          title="Website"
          placeholder="Enter Link"
          onChangeText={setLink}
          value={link}
          keyboardType="url"
        />
        <CTSSeparator />
        <GHeaderLef title={"Business Info."} />
        <CTSSeparator />
        <CTSSimpleInput
          title="Business Name"
          placeholder="Enter Name"
          maxLength={35}
          onChangeText={setBusinessName}
          value={businessName}
        />
        <CTSSeparator />

        <CTSSimpleInput
          title="Business Owner"
          placeholder="Enter Name"
          maxLength={35}
          onChangeText={setBusinessOwner}
          value={businessOwner}
        />

        <CTSSeparator />
        <CTSSelectBoxDropdown
          data={businessTypeArray}
          selectedItem={businessType}
          itemTitleKey={"category_name"}
          title="Business Type"
          placeholder={"Select Business Type"}
          getSelectedData={setBusinessType}
        />

        <CTSSeparator />
        <CTSSimpleInput
          title="Year of Establishment"
          placeholder="Enter Year"
          onChangeText={setYearOfEstablishment}
          value={yearOfEstablishment}
          keyboardType="numeric"
          maxLength={4}
        />

        <CTSSeparator />
        <GHeaderLef title={"Business Place"} />
        <CTSSeparator />
        <CTSSimpleInput
          title="Address"
          placeholder="Enter Address"
          onChangeText={setAddress}
          value={address}
        />
        <CTSSeparator />
        <CTSSelectBoxDropdown
          data={countryArray}
          title="Country"
          placeholder="Select country"
          itemTitleKey="country_name"
          selectedItem={country}
          getSelectedData={setCountry}
        />
        <CTSSeparator />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ width: "45%" }}>
            <CTSSelectBoxDropdown
              data={stateArray}
              title="State"
              placeholder="Select"
              selectedItem={state}
              getSelectedData={setState}
              itemTitleKey="state_name"
            />
          </View>
          <View style={{ width: "45%" }}>
            <CTSSelectBoxDropdown
              data={cityArray}
              title="City"
              placeholder="Select"
              itemTitleKey={"city_name"}
              selectedItem={city}
              getSelectedData={setCity}
            />
          </View>
        </View>
        <CTSSeparator />
        <Text style={styles.titleStyle}>Proof of Incorporation Document</Text>
        <GDocumentPicker gettedData={setIncorporationDoc} />
        <CTSSeparator />
        <Text style={styles.titleStyle}>Proof of address</Text>
        <GDocumentPicker gettedData={setAddressDoc} />
        <CTSSeparator />

        <View style={{ marginHorizontal: 30, marginVertical: 20 }}>
          <CTSButtonsGradient title="Next" onFullPress={onPressNext} />
        </View>

        <TouchableOpacity onPress={onPressSkip}>
          <Text style={styles.skipStyle}>SKIP</Text>
        </TouchableOpacity>

        <CTSSeparator />
      </CTSKeyboardAvoidScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  skipStyle: {
    textAlign: "center",
    color: colors.lightslategray,
    fontSize: fontSizes.f20,
    fontFamily: fonts.sairaSemiBoldFont,
  },
  titleStyle: {
    color: colors.secondary,
    fontSize: fontSizes.f14,
    paddingHorizontal: 5,
    backgroundColor: colors.background,
    fontFamily: fonts.sairaBoldFont,
    marginBottom: 5,
  },
  descriptionStyle: {
    fontSize: fontSizes.f13,
    color: colors.secondary,
    fontFamily: fonts.sairaMediumFont,
  },
  subDescriptionStyle: {
    fontSize: fontSizes.f10,
    color: colors.secondary,
    fontFamily: fonts.sairaRegularFont,
  },
  unSelectedDocContainerStyle: {
    backgroundColor: colors.white,
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 10,
    borderWidth: 0.7,
    borderStyle: "dashed",
    borderColor: colors.lightslategray,
  },
  selectedDocContainerStyle: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 10,
    alignItems: "center",
    padding: 10,
    borderWidth: 0.7,
    borderColor: colors.silver,
  },
  selectedDocTextStyle: {
    fontSize: fontSizes.f15,
    color: colors.secondary,
    fontFamily: fonts.sairaSemiBoldFont,
    marginLeft: 10,
  },
  shadowContainerStyle: {
    shadowColor: colors.steelblue,
    shadowRadius: 5,
    shadowOpacity: 0.21,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
});
