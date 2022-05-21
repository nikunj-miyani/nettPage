import { StyleSheet } from "react-native";
import { colors, fontSizes } from "../../constants";

const myStyle = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  socialButton: {
    iconContainerStyle: {
      paddingHorizontal: 30,
      paddingVertical: 10,
      backgroundColor: colors.transparent,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: colors.silver,
      marginRight: 15,
    },
    iconStyle: { width: 25, height: 25 },
  },
});
export default myStyle;
