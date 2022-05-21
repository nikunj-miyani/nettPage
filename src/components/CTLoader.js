import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  ActivityIndicator,
  ViewPropTypes,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import {colors} from '../constants';
import {CTIcon} from './CTIcon';
import {checkIcon} from '../assets/icons';
import __stylesFunc, {
  __themeStyleFunc,
} from '../utils/basicFunctions/StylesFunc';
import themeStyles from '../assets/styles/themestyles';

export default function CTLoader({
  isVisible,
  isTrue,
  title,
  successTitle,
  titleStyle,
  indicatorSize,
  modalBackgroundColor,
  ActivityIndicatorColor,
  contentContainerStyle,
  modalContainerStyle,
  style,
  animationType,
  modalStyle,
  // ...other
}) {
  style = __themeStyleFunc(style, themeStyles.CTLoader);
  contentContainerStyle = __stylesFunc(
    contentContainerStyle,
    style,
    'contentContainerStyle',
  );

  modalContainerStyle = __stylesFunc(
    modalContainerStyle,
    style,
    'modalContainerStyle',
  );
  modalStyle = __stylesFunc(modalStyle, style, 'modalStyle');
  titleStyle = __stylesFunc(titleStyle, style, 'titleStyle');

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType={animationType || 'fade'}
      // {...other}
    >
      <View style={[styles.contentContainerStyle, ...contentContainerStyle]}>
        <View
          style={[
            {
              backgroundColor: modalBackgroundColor || colors.white,
            },
            styles.modalContainerStyle,
            ...modalContainerStyle,
          ]}>
          {isTrue ? (
            <CTIcon source={checkIcon} iconStyle={{tintColor: colors.white}} />
          ) : (
            <ActivityIndicator
              size={indicatorSize || 'small'}
              color={ActivityIndicatorColor || colors.white}
            />
          )}
          {((title && !isTrue) || (successTitle && isTrue)) && (
            <Text style={[styles.titleStyle, ...titleStyle]}>
              {isTrue ? successTitle : title}
            </Text>
          )}
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainerStyle: {
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
  },
  titleStyle: {
    marginLeft: 10,
  },
});

CTLoader.propTypes = {
  title: PropTypes.string,
  successTitle: PropTypes.string,
  isVisible: PropTypes.bool,
  indicatorSize: PropTypes.string, // multi option type
  contentContainerStyle: ViewPropTypes.style,
  modalContainerStyle: ViewPropTypes.style,
  titleStyle: PropTypes.object, // titleStyle: TextPropTypes.style,
  modalStyle: ViewPropTypes.style,
  modalBackgroundColor: PropTypes.string,
  ActivityIndicatorColor: PropTypes.string,
  animationType: PropTypes.string, // multi option type
  style: PropTypes.shape({
    contentContainerStyle: ViewPropTypes.style,
    modalContainerStyle: ViewPropTypes.style,
    modalStyle: ViewPropTypes.style,
    titleStyle: PropTypes.object, // titleStyle: TextPropTypes.style,
  }),
};
