import AsyncStorage from "@react-native-async-storage/async-storage";

export async function __setLocalData(key, data) {
  return await AsyncStorage.setItem(key, data);
}

export async function __getLocalData(key) {
  return await AsyncStorage.getItem(key);
}

export async function __removeLocalData(key) {
  return await AsyncStorage.removeItem(key);
}

export async function __clearAllLocalData() {
  return await AsyncStorage.clear();
}
