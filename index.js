/**
 * @format
 */

import { AppRegistry, LogBox } from "react-native";
import App from "./src/index";
import { name as appName } from "./app.json";

LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs([
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
  "new NativeEventEmitter()",
]);

AppRegistry.registerComponent(appName, () => App);
