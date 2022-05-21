import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React, { Component } from "react";
import { connect } from "react-redux";
import { CTSLoader } from "../components";

class SettingsProvider extends Component {
  async componentDidMount() {
    // setTimeout(() => {
    //     this.getLocation()
    // }, 1000);
    // if (Platform.OS === "android") {

    //     PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
    //         'title': 'Contacts',
    //         'message': 'This app would like to view your contacts.',
    //         'buttonPositive': 'Please accept bare mortal'
    //     })
    // }

    GoogleSignin.configure({
      webClientId:
        "802825754497-3c9hdaugvbfcvk7kcskcffg3j2uugbvs.apps.googleusercontent.com",
    });
  }
  getLocation = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        AsyncStorage.setItem(
          asyncAcess.CURRENT_LOCATION,
          JSON.stringify(region)
        );
      },
      (error) => {
        console.log("error", error);
      },
      { enableHighAccuracy: false, timeout: 20000 }
    );
  };

  render() {
    const { rootLoader, rootLoaderTitle, rootLoaderTrue } = this.props;
    return (
      <>
        {this.props.children}
        <CTSLoader
          isVisible={rootLoader}
          title={rootLoaderTitle}
          isTrue={rootLoaderTrue}
        />
      </>
    );
  }
}

function mapStateToProps({ activityIndicator }) {
  return {
    rootLoader: activityIndicator.rootLoader,
    rootLoaderTitle: activityIndicator.rootLoaderTitle,
  };
}
export default connect(mapStateToProps, null)(SettingsProvider);
