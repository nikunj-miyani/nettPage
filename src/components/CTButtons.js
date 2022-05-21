import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ViewPropTypes,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import {colors, fontSizes} from '../constants/index';
import {CTSIcon} from './index';
import __stylesFunc, {
  __themeStyleFunc,
} from '../utils/basicFunctions/StylesFunc';
import themeStyles from '../assets/styles/themestyles';

export function CTButton({
  title,
  titleStyle,
  width = '100%',
  height = 40,
  rightSource,
  rightIconContainerStyle,
  rightIconStyle,
  onRightIconPress,
  rightComp,
  leftSource,
  leftIconContainerStyle,
  leftIconStyle,
  onLeftIconPress,
  leftComp,
  contentContainerStyle,
  noEffect,
  onFullPress,
  style,
  // ...other
}) {
  style = __themeStyleFunc(style, themeStyles.CTButtonStyle);
  titleStyle = __stylesFunc(titleStyle, style, 'titleStyle');
  contentContainerStyle = __stylesFunc(
    contentContainerStyle,
    style,
    'contentContainerStyle',
  );

  rightIconStyle = __stylesFunc(rightIconStyle, style, 'rightIconStyle');

  rightIconContainerStyle = __stylesFunc(
    rightIconContainerStyle,
    style,
    'rightIconContainerStyle',
  );

  leftIconStyle = __stylesFunc(leftIconStyle, style, 'leftIconStyle');
  leftIconContainerStyle = __stylesFunc(
    leftIconContainerStyle,
    style,
    'leftIconContainerStyle',
  );

  return (
    <TouchableOpacity
      activeOpacity={noEffect ? 1 : onFullPress ? 0 : 1}
      style={[
        {
          width,
          minHeight: height,
        },
        styles.contentContainerStyle,
        ...contentContainerStyle,
      ]}
      onPress={onFullPress}
      // {...other}
    >
      {!leftComp && leftSource && leftSource !== null ? (
        <CTSIcon
          source={leftSource}
          onPress={onLeftIconPress}
          iconContainerStyle={[
            {
              width: height,
              height,
            },
            styles.leftIconContainerStyle,
            ...leftIconContainerStyle,
          ]}
          iconStyle={[{tintColor: colors.secondary}, ...leftIconStyle]}
        />
      ) : (
        !leftComp && <View style={{width: height}} />
      )}
      {leftComp}
      {title && title !== '' && (
        <Text style={[styles.titleStyle, ...titleStyle]}>{title}</Text>
      )}

      {!rightComp && rightSource && rightSource !== null ? (
        <CTSIcon
          source={rightSource}
          onPress={onRightIconPress}
          iconContainerStyle={[
            {
              width: height,
              height,
            },
            styles.rightIconContainerStyle,
            ...rightIconContainerStyle,
          ]}
          iconStyle={[{tintColor: colors.secondary}, ...rightIconStyle]}
        />
      ) : (
        !rightComp && <View style={{width: height}} />
      )}
      {rightComp}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIconContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    flex: 1,
    textAlign: 'center',
  },
  rightIconContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
CTButton.propTypes = {
  title: PropTypes.string,
  // titleStyle: PropTypes.object, // titleStyle: TextPropTypes.style,
  width: PropTypes.number,
  height: PropTypes.number,
  // rightSource: PropTypes.string, // rightSource: ImagePropTypes.source,
  rightIconContainerStyle: ViewPropTypes.style,
  // rightIconStyle: PropTypes.object, // rightIconStyle: ImagePropTypes.style,
  onRightIconPress: PropTypes.func,
  rightComp: PropTypes.bool,
  // leftSource: PropTypes.string, // leftSource: ImagePropTypes.source,
  leftIconContainerStyle: ViewPropTypes.style,
  // leftIconStyle: PropTypes.string, // leftIconStyle: ImagePropTypes.style,
  onLeftIconPress: PropTypes.func,
  leftComp: PropTypes.bool,
  contentContainerStyle: ViewPropTypes.style,
  noEffect: PropTypes.bool,
  onFullPress: PropTypes.func,
  style: PropTypes.shape({
    rightIconContainerStyle: ViewPropTypes.style,
    leftIconContainerStyle: ViewPropTypes.style,
    contentContainerStyle: ViewPropTypes.style,
    titleStyle: PropTypes.object, // titleStyle: TextPropTypes.style,
    rightIconStyle: PropTypes.object, // rightIconStyle: ImagePropTypes.style,
    leftIconStyle: PropTypes.string, // leftIconStyle: ImagePropTypes.style,
  }),
};
