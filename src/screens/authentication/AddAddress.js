import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { rootLoader } from "../../actions/";
import {
  editUser,
  getCityList,
  getCountryList,
  getStateList,
} from "../../actions/user";

import {
  CTSButtonsGradient,
  CTSHeader,
  CTSKeyboardAvoidScrollView,
  CTSSelectBoxDropdown,
  CTSSimpleInput,
} from "../../components";
import CTSeparator from "../../components/CTSeparator";
import { colors, fontSizes, fonts } from "../../constants";
import { __simpleToast } from "../../utils/basicFunctions/SimpleToast";

export default function AddAddress({ navigation }) {
  const dispatch = useDispatch();
  const userInfo = useSelector((data) => data.user.userInfo);

  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [countryArray, setCountryArray] = useState([]);
  const [stateArray, setStateArray] = useState([]);
  const [cityArray, setCityArray] = useState([]);

  React.useEffect(() => {
    fGetCountryList();
  }, []);

  React.useEffect(() => {
    fGetStateList();
    setState("");
    setCity("");
  }, [country]);

  React.useEffect(() => {
    fGetCity();
    setCity("");
  }, [state]);

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

  const onPressSave = async () => {
    if (address == "") return __simpleToast("Please enter address!");
    if (country == "") return __simpleToast("Please select country!");
    if (state == "") return __simpleToast("Please select state!");
    if (city == "") return __simpleToast("Please select city!");
    if (!zipCode) return __simpleToast("Please enter zip/post code!");
    if (!(zipCode.trim().length == 6))
      return __simpleToast("Please enter valid zip/post code!");
    if (!phone) return __simpleToast("Please enter phone!");
    if (!(phone.trim().length == 11))
      return __simpleToast("Please enter valid phone!");

    dispatch(rootLoader(true));
    const request = {
      user_address: address,
      country_id: country?.country_id,
      state_id: state?.state_id,
      city_id: city?.city_id,
      user_zip_code: zipCode,
      user_phone: phone,
    };
    const result = await editUser(request);
    console.log(result);
    if (result.status) {
      console.log("Success");
      navigation.navigate("UserStack"); // Move userStack
    } else {
      __simpleToast(result.message);
    }
    dispatch(rootLoader(false));
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <CTSHeader
        title="Add Address"
        statusbarColor={colors.background}
        statusbarStyle="dark-content"
      />
      <CTSKeyboardAvoidScrollView
        scrollContentContainerStyle={{ paddingVertical: 20 }}
      >
        <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
          <CTSSimpleInput
            title="Street Address"
            placeholder="Enter address"
            value={address}
            onChangeText={setAddress}
          />
          <CTSeparator />
          <CTSSelectBoxDropdown
            data={countryArray}
            title="Country"
            placeholder="Select country"
            itemTitleKey="country_name"
            selectedItem={country}
            getSelectedData={setCountry}
          />
          <CTSeparator />
          <CTSSelectBoxDropdown
            data={stateArray}
            title="State"
            placeholder="Select state"
            selectedItem={state}
            getSelectedData={setState}
            itemTitleKey="state_name"
          />
          <CTSeparator />
          <CTSSelectBoxDropdown
            data={cityArray}
            title="City"
            placeholder="Select city"
            itemTitleKey={"city_name"}
            selectedItem={city}
            getSelectedData={setCity}
          />
          <CTSeparator />
          <CTSSimpleInput
            title="Zip/ Post code"
            placeholder="Enter code"
            value={zipCode}
            maxLength={6}
            keyboardType="number-pad"
            onChangeText={setZipCode}
          />
          <CTSeparator />
          <CTSSimpleInput
            title="Phone Number"
            placeholder="Enter number"
            value={phone}
            keyboardType="number-pad"
            onChangeText={setPhone}
            maxLength={11}
          />
          <View style={{ marginHorizontal: 30, marginTop: 40 }}>
            <CTSButtonsGradient title="Save" onFullPress={onPressSave} />
          </View>
          <TouchableOpacity style={{ marginTop: 10, alignSelf: "center" }}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </CTSKeyboardAvoidScrollView>
      <SafeAreaView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  skipText: {
    fontFamily: fonts.sairaMediumFont,
    fontSize: fontSizes.f15,
    color: colors.lightslategray,
    textTransform: "uppercase",
  },
});
