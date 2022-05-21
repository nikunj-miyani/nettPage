import { Alert, Linking, PermissionsAndroid, Platform } from "react-native";

import { launchCamera } from "react-native-image-picker";
import ImageCropPicker from "react-native-image-crop-picker";
import { createThumbnail } from "react-native-create-thumbnail";

export function videoPicker() {
  return new Promise((resolve) => {
    ImageCropPicker.openPicker({
      mediaType: "video",
    })
      .then(async (response) => {
        const thumb = await createThumbnail({
          url: response.path,
          timeStamp: 10000,
          format: "jpeg",
        });
        const dataObj = {
          uri: response.path,
          name: `file${new Date().getTime()}.mp4`,
          type: response.mime,
          duration: response.duration / 1000,
        };
        const thumbnail = {
          uri: thumb.path,
          name: `Thumbnail-${new Date().getTime()}.jpeg`,
          type: thumb.mime,
        };
        resolve({ status: true, data: dataObj, thumbnail });
      })
      .catch((e) => {
        console.log(e);
        resolve({ status: false, message: "Opps! something is wrong" });
      });
  });
}

export function recordVideo(options) {
  return new Promise(async (resolve) => {
    try {
      if (Platform.OS === "android") {
        const response = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        if (response === "granted") {
          launchCamera(options, async (response) => {
            if (response.didCancel) {
              resolve({
                status: false,
                message: "User cancelled image picker",
              });
            } else if (response.error) {
              resolve({ status: false, message: response.error });
            } else {
              const thumb = await createThumbnail({
                url: response.assets[0].uri,
                timeStamp: 10000,
                format: "jpeg",
              });
              const dataObj = {
                uri: response.assets[0].uri,
                name: `file${new Date().getTime()}.mp4`,
                type: "video/mp4",
                duration: response.assets[0].duration,
              };
              const thumbnail = {
                uri: thumb.path,
                name: `Thumbnail-${new Date().getTime()}.jpeg`,
                type: thumb.mime,
              };
              resolve({ status: true, data: dataObj, thumbnail });
            }
          });
        } else {
          resolve({ status: false, message: "Camera permission denied" });
        }
      } else {
        launchCamera(options, async (response) => {
          if (response.didCancel) {
            resolve({
              status: false,
              message: "User cancelled image picker",
            });
          } else if (response.error) {
            resolve({ status: false, message: response.error });
          } else {
            const thumb = await createThumbnail({
              url: response.uri,
              timeStamp: 10000,
              format: "jpeg",
            });
            const dataObj = {
              uri: response.uri,
              name: `file${new Date().getTime()}.mp4`,
              type: "video/mp4",
              duration: response.duration,
            };
            const thumbnail = {
              uri: thumb.path,
              name: `Thumbnail-${new Date().getTime()}.jpeg`,
              type: thumb.mime,
            };
            resolve({ status: true, data: dataObj, thumbnail });
          }
        });
      }
    } catch (error) {
      console.log(e);
      resolve({ status: false, message: "Opps! something is wrong" });
    }
  });
}

export function photoPicker(options) {
  return new Promise(async (resolve) => {
    if (Platform.OS == "android") {
      const storageResponse = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      if (
        storageResponse === "never_ask_again" ||
        storageResponse === "denied"
      ) {
        Alert.alert("Are you sure?", "Denied storage permission permanently", [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => Linking.openSettings() },
        ]);
      }
    }
    ImageCropPicker.openPicker({
      cropping: true,
      width: 500,
      height: 500,
      forceJpg: true,
      mediaType: "photo",
      compressImageQuality: 0.6,
      ...options,
    })
      .then((response) => {
        const dataObj = {
          uri: response.path,
          name: `file${new Date().getTime()}.jpg`,
          type: response.mime,
        };
        resolve({ status: true, data: dataObj });
      })
      .catch((e) => {
        console.log(e);
        resolve({ status: false, message: "Opps! something is wrong" });
      });
  });
}

export function cameraPicker(options) {
  return new Promise(async (resolve) => {
    if (Platform.OS == "android") {
      const cameraResponse = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      const storageResponse = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      if (
        cameraResponse === "never_ask_again" ||
        cameraResponse === "denied" ||
        storageResponse === "never_ask_again" ||
        storageResponse === "denied"
      ) {
        Alert.alert(
          "Are you sure?",
          `Denied ${
            cameraResponse !== "granted" && storageResponse !== "granted"
              ? "camera and storage"
              : cameraResponse === "granted"
              ? "storage"
              : "camera"
          } permission permanently`,
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => Linking.openSettings() },
          ]
        );
      }
    }

    ImageCropPicker.openCamera({
      cropping: true,
      width: 500,
      height: 500,
      forceJpg: true,
      mediaType: "photo",
      compressImageQuality: 1,
      ...options,
    })
      .then((response) => {
        const dataObj = {
          uri: response.path,
          name: `file${new Date().getTime()}.jpg`,
          type: response.mime,
        };
        resolve({ status: true, data: dataObj });
      })
      .catch((e) => {
        console.log(e);
        resolve({ status: false, message: "Opps! something is wrong" });
      });
  });
}

export function cleanPicker() {
  ImageCropPicker.clean();
}
