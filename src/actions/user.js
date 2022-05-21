import Api from "../utils/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { StackActions } from "@react-navigation/native";
import { navigateDispatch } from "../utils/NavigationService";
import { USER_SIGNIN } from "../reducers/reducersType";
import { asyncAccesss } from "../constants";
import DeviceInfo from "react-native-device-info";

export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";

export function setLoginDetails(data) {
  return (dispatch) => {
    const request = {
      UserId: data.user_id,
      Token: data.Token,
    };

    Api.defaultHeader(request);
    dispatch({ type: USER_SIGNIN, payload: data });
    AsyncStorage.setItem(
      asyncAccesss.CURRENT_USER_PROFILE,
      JSON.stringify(data)
    );
  };
}
export function userRegister(data) {
  return async (dispatch) => {
    try {
      const res = await Api.POSTFORMDATA("user_register", data);
      if (res.status) {
        dispatch(setLoginDetails(res.data));
        return { status: res.status, data: res.data };
      } else {
        return { status: res.status, message: res.message };
      }
    } catch (error) {
      console.log("userRegister Error: ", error);
      return { status: false, message: "Oops, Something Went Wrong" };
    }
  };
}

export function userLogin(data) {
  return async (dispatch) => {
    try {
      const res = await Api.POST("user_login", data);
      // console.log("Login Info => ", res);
      if (res.status) {
        dispatch(setLoginDetails(res.data));
        return { status: res.status, data: res.data };
      } else {
        // if (parseInt(res.code) === 3) {
        //   await AsyncStorage.clear();
        //   navigateDispatch(StackActions.replace("AuthStack"));
        // }
        return { status: res.status, message: res.message };
      }
    } catch (error) {
      console.log("userLogin Error: ", error);
      return { status: false, message: "Oops, Something Went Wrong" };
    }
  };
}

export async function appVersionCheck(userId) {
  try {
    const request = {
      device_type: Platform.OS,
      application_version: DeviceInfo.getVersion(),
      user_id: userId,
    };
    const hResult = await Api.POST("check_version", request);

    if (hResult.status) {
      if (hResult.is_application_update == "is_force_update") {
        Alert.alert(
          "Update Available",
          "Please uninstall app before you install new app",
          [
            {
              text: "Update",
              onPress: async () => {},
            },
          ]
        );
      } else if (hResult.is_application_update == "is_partial_update") {
        Alert.alert(
          "Update Available",
          "Please uninstall app before you install new app",
          [
            {
              text: "Cancel",
            },
            {
              text: "Update",
              onPress: async () => {},
            },
          ]
        );
      }
    } else {
      return { status: hResult.status, message: hResult.message };
    }
  } catch (error) {
    console.log("app_version_check Error: ", error);
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}
export async function verifySocialLogin(data) {
  try {
    const res = await Api.POST("verify_social_login", data);
    if (res.status) {
      return { status: res.status, data: res.data };
    } else {
      return { status: res.status, message: res.message };
    }
  } catch (error) {
    console.log("verify_social_login Error: ", error);
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}
export async function getCountryList(data) {
  try {
    const res = await Api.POST("get_country_list", data);
    if (res.status) {
      return { status: res.status, data: res.data };
    } else {
      return { status: res.status, message: res.message };
    }
  } catch (error) {
    console.log("get_country_list Error: ", error);
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}
export async function getStateList(data) {
  try {
    const res = await Api.POST("get_state_list", data);
    if (res.status) {
      return { status: res.status, data: res.data };
    } else {
      return { status: res.status, message: res.message };
    }
  } catch (error) {
    console.log("get_state_list Error: ", error);
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}
export async function getCityList(data) {
  try {
    const res = await Api.POST("get_city_list", data);
    if (res.status) {
      return { status: res.status, data: res.data };
    } else {
      return { status: res.status, message: res.message };
    }
  } catch (error) {
    console.log("get_city_list Error: ", error);
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}
export async function editUser(data) {
  try {
    const res = await Api.POSTFORMDATA("edit_user", data);
    if (res.status) {
      return { status: res.status, data: res.data };
    } else {
      return { status: res.status, message: res.message };
    }
  } catch (error) {
    console.log("edit_user Error: ", error);
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}
export async function editBankDetail(data) {
  try {
    const res = await Api.POST("edit_bank_detail", data);
    if (res.status) {
      return { status: res.status, data: res.data };
    } else {
      return { status: res.status, message: res.message };
    }
  } catch (error) {
    console.log("edit_bank_detail Error: ", error);
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}
export async function getCategoryList(data) {
  try {
    const res = await Api.POST("get_category_list", data);
    if (res.status) {
      return { status: res.status, data: res.data };
    } else {
      return { status: res.status, message: res.message };
    }
  } catch (error) {
    console.log("get_category_list Error: ", error);
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}
export async function forgotPassword(data) {
  try {
    const res = await Api.POST("forgot_password", data);
    if (res.status) {
      return { status: res.status, data: res.data };
    } else {
      return { status: res.status, message: res.message };
    }
  } catch (error) {
    console.log("forgot_password Error: ", error);
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}
export async function verifyPhone(data) {
  try {
    const res = await Api.POST("verify_phone", data);
    if (res.status) {
      return { status: res.status, data: res.data };
    } else {
      return { status: res.status, message: res.message };
    }
  } catch (error) {
    console.log("verify_phone Error: ", error);
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}
export async function verifyCode(data) {
  try {
    const res = await Api.POST("verify_code", data);
    if (res.status) {
      return { status: res.status, data: res.data };
    } else {
      return { status: res.status, message: res.message };
    }
  } catch (error) {
    console.log("verify_code Error: ", error);
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}
export async function resetPassword(data) {
  try {
    const res = await Api.POST("reset_password", data);
    if (res.status) {
      return { status: res.status, data: res.data };
    } else {
      return { status: res.status, message: res.message };
    }
  } catch (error) {
    console.log("reset_password Error: ", error);
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}

export function apiTest(fRequest, fIsTrue) {
  try {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (fIsTrue) {
          return resolve({ status: true, message: "success" });
        } else {
          return resolve({ status: false, message: "failed" });
        }
      }, 500);
    });
  } catch (error) {
    console.log("apiTest Error: ", error);
    return reject({ status: false, message: "Oops, Something Went Wrong" });
  }
}
