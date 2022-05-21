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
import { rootLoader } from "../../actions/index";
import {
  editBankDetail,
  getCityList,
  getCountryList,
  getStateList,
} from "../../actions/user";
import {
  CTSButtonsGradient,
  CTSConfirmationBox,
  CTSHeader,
  CTSKeyboardAvoidScrollView,
  CTSSelectBoxDropdown,
  CTSSeparator,
  CTSSimpleInput,
} from "../../components";
import { colors, fontSizes, fonts } from "../../constants";
import Api from "../../utils/Api";
import { __simpleToast } from "../../utils/basicFunctions/SimpleToast";

export default function BankingInformation({ navigation }) {
  const dispatch = useDispatch();

  const [accountNo, setAccountNo] = useState("");
  const [routingNo, setRoutingNo] = useState("");
  const [email, setEmail] = useState("");
  const [ssn, setSsn] = useState("");
  const [idNo, setIdNo] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [stateArray, setStateArray] = useState([]);
  const [cityArray, setCityArray] = useState([]);
  const [countryArray, setCountryArray] = useState([]);

  React.useEffect(() => {
    fGetCountryList();
  }, []);

  React.useEffect(() => {
    fGetStateList();
    setState("");
    setCityArray([]);
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

  const onsubmit = async () => {
    let hReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!accountNo) return __simpleToast("Please enter account number!");
    else if (!routingNo) return __simpleToast("Please enter routing number!");
    else if (!email) return __simpleToast("Please enter email!");
    else if (!hReg.test(email))
      return __simpleToast("Please enter valid email!");
    else if (!ssn) return __simpleToast("Please enter SSN!");
    else if (!idNo) return __simpleToast("Please enter Id number!");
    else if (!address) return __simpleToast("Please enter address!");
    else if (!state) return __simpleToast("Please select state!");
    else if (!city) return __simpleToast("Please select city!");
    else if (!zipCode) return __simpleToast("Please enter zip code!");

    dispatch(rootLoader(true));
    const request = {
      account_no: accountNo,
      routing_no: routingNo,
      contact_email: email,
      ssn_no: ssn,
      id_no: idNo,
      address_line_1: address,
      contact_country: country.country_name,
      contact_state: state.state_name,
      contact_city: city.city_name,
      // contact_country: "SAN",
      // contact_state: "California",
      // contact_city: "SAN FRANCISCO",
      contact_zip_code: zipCode,
    };

    const result = await editBankDetail(request);
    if (result.status) {
      setIsVisible(true);
      navigation.navigate("BrandStack");
    } else {
      __simpleToast(result.message);
    }
    dispatch(rootLoader(false));
  };
  const onPressOkConfirmBox = () => {
    setIsVisible(false);
    navigation.navigate("BrandStack");
  };
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <CTSHeader
        title="Banking Information"
        statusbarColor={colors.background}
        statusbarStyle="dark-content"
        onBackPress={() => navigation.goBack()}
      />
      <CTSKeyboardAvoidScrollView
        scrollContentContainerStyle={{ paddingVertical: 20 }}
      >
        <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
          <CTSSimpleInput
            title="Account Number"
            placeholder="Enter number"
            value={accountNo}
            keyboardType="number-pad"
            onChangeText={setAccountNo}
          />
          <CTSSeparator />
          <CTSSimpleInput
            title="Routing Number"
            placeholder="Enter number"
            value={routingNo}
            // maxLength={10}
            keyboardType="number-pad"
            onChangeText={setRoutingNo}
          />
          <CTSSeparator />
          <Text style={styles.headingText}>
            Please Enter Contact Information
          </Text>
          <Text style={styles.subHeadingText}>
            *In case we need to contact you regarding any issues.
          </Text>
          <CTSSeparator />
          <CTSSimpleInput
            title="Email Address"
            placeholder="Enter Email"
            value={email}
            maxLength={50}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <CTSSeparator />
          <CTSSimpleInput
            title="SSN (Last 4 Digits)"
            placeholder="Enter 4 digits"
            value={ssn}
            maxLength={4}
            keyboardType="number-pad"
            onChangeText={setSsn}
          />
          <CTSSeparator />
          <CTSSimpleInput
            title="ID Number"
            placeholder="Enter number"
            value={idNo}
            keyboardType="number-pad"
            onChangeText={setIdNo}
          />
          <CTSSeparator />
          <CTSSimpleInput
            title="Address Line 1"
            placeholder="Enter address"
            value={address}
            onChangeText={setAddress}
          />
          <CTSSeparator />
          <CTSSelectBoxDropdown
            data={countryArray}
            title="Country"
            placeholder="Select"
            itemTitleKey="country_name"
            selectedItem={country}
            getSelectedData={setCountry}
          />
          <CTSSeparator />
          <CTSSelectBoxDropdown
            data={["stateArray"]}
            title="State"
            placeholder="Select"
            selectedItem={state}
            getSelectedData={setState}
            itemTitleKey="state_name"
          />
          <CTSSeparator />
          <CTSSelectBoxDropdown
            data={cityArray}
            title="City"
            placeholder="Select City"
            itemTitleKey={"city_name"}
            selectedItem={city}
            getSelectedData={setCity}
          />
          <CTSSeparator />
          <CTSSimpleInput
            title="Zip code"
            placeholder="Enter code"
            value={zipCode}
            // maxLength={6}
            keyboardType="number-pad"
            onChangeText={setZipCode}
          />
          <View style={{ marginHorizontal: 30, marginTop: 40 }}>
            <CTSButtonsGradient title="Submit" onFullPress={onsubmit} />
          </View>
          <TouchableOpacity style={{ marginTop: 10, alignSelf: "center" }}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </CTSKeyboardAvoidScrollView>

      <CTSConfirmationBox
        isVisible={isVisible}
        title="Thank You For Brand Registration."
        description={`Please wait some time for Registration verification.\n\nAfter Verification Successfully then you
        use Nettpage.`}
        onConfirm={onPressOkConfirmBox}
        confirmButtonTitle="Ok"
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
});
