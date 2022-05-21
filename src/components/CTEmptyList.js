import React from 'react';
import {View, Text, ViewPropTypes} from 'react-native';
import propTypes from 'prop-types';
import {CTSIcon} from '.';
import {recordNotFoundIcon, searchPlaceholderIcon} from '../assets/icons';
import themeStyles from '../assets/styles/themestyles';
import __stylesFunc, {
  __themeStyleFunc,
} from '../utils/basicFunctions/StylesFunc';

export default function CTEmptyList({
  title,
  search,
  containerStyle,
  titleStyle,
  iconStyle,
  style,
}) {
  style = __themeStyleFunc(style, themeStyles.CTEmptyList);
  containerStyle = __stylesFunc(containerStyle, style, 'containerStyle');
  titleStyle = __stylesFunc(titleStyle, style, 'titleStyle');
  iconStyle = __stylesFunc(iconStyle, style, 'iconStyle');
  return (
    <View
      style={[
        {flex: 1, justifyContent: 'center', alignItems: 'center'},
        ...containerStyle,
      ]}>
      <CTSIcon
        source={search ? searchPlaceholderIcon : recordNotFoundIcon}
        iconStyle={[{width: 50, height: 50}, ...iconStyle]}
      />
      <Text style={[...titleStyle]}>{title}</Text>
    </View>
  );
}
CTEmptyList.propTypes = {
  title: propTypes.string,
  search: propTypes.string,
  containerStyle: ViewPropTypes.style,
  titleStyle: propTypes.object,
  iconStyle: propTypes.object,
  style: propTypes.shape({
    containerStyle: ViewPropTypes.style,
    titleStyle: propTypes.object,
    iconStyle: propTypes.object,
  }),
};
