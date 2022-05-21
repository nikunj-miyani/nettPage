import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Menu, MenuDivider, MenuItem } from "react-native-material-menu";
import { CTSIcon } from ".";
import themeStyles from "../assets/styles/themestyles";
import { colors, fonts, fontSizes } from "../constants";
import __stylesFunc, {
  __themeStyleFunc,
} from "../utils/basicFunctions/StylesFunc";

export default function CTMenu({
  source,
  data,
  style,
  iconStyle,
  iconContainerStyle,
  menuItemStyle,
  menuItemTextStyle,
  containerStyle,
}) {
  style = __themeStyleFunc(style, themeStyles.CTMenu);
  containerStyle = __stylesFunc(containerStyle, style, "containerStyle");
  iconStyle = __stylesFunc(iconStyle, style, "iconStyle");
  iconContainerStyle = __stylesFunc(
    iconContainerStyle,
    style,
    "iconContainerStyle"
  );
  menuItemStyle = __stylesFunc(menuItemStyle, style, "menuItemStyle");
  menuItemTextStyle = __stylesFunc(
    menuItemTextStyle,
    style,
    "menuItemTextStyle"
  );
  let _menu = null;

  const gfSetMenuRef = (ref) => {
    _menu = ref;
  };

  const gfHideMenu = async () => {
    await _menu.hide();
  };

  const gfShowMenu = () => {
    _menu.show();
  };

  return (
    <View>
      <CTSIcon
        source={source}
        iconStyle={{ ...styles.iconStyle, ...iconStyle }}
        onPress={() => gfShowMenu()}
      />
      <Menu
        ref={(ref) => gfSetMenuRef(ref)}
        onRequestClose={() => gfHideMenu()}
      >
        {data &&
          data.map((fItem, fIndex) => {
            return (
              <View key={String(fIndex)}>
                <MenuItem
                  style={[...menuItemStyle]}
                  onPress={() => {
                    fItem.onPress(), gfHideMenu();
                  }}
                  textStyle={[...menuItemTextStyle]}
                >
                  {fItem.title}
                </MenuItem>
                <MenuDivider color={colors.echoBlue} />
              </View>
            );
          })}
        {/*           
        <MenuItem
          style={[...menuItemStyle]}
          onPress={() => gfHideMenu()}
          textStyle={[...menuItemTextStyle]}
        >
          Remove Tag
        </MenuItem> */}
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  iconStyle: {
    width: 20,
    height: 20,
  },
});
