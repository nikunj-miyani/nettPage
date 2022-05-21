import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  ViewPropTypes,
} from 'react-native';
import propTypes from 'prop-types';
import {CTSIcon} from '.';

import {closeIcon} from '../assets/icons';

import colors from '../constants/colors';
import __stylesFunc, {
  __themeStyleFunc,
} from '../utils/basicFunctions/StylesFunc';
import themeStyles from '../assets/styles/themestyles';

export default function CTBottomModal({
  isVisible,
  title,
  onCancel,
  onDismiss,
  itemContainerStyle,
  cancelStyle,
  containerStyle,
  titleStyle,
  children,
  style,
}) {
  style = __themeStyleFunc(style, themeStyles.CTBottomModal);

  containerStyle = __stylesFunc(containerStyle, style, 'containerStyle');
  cancelStyle = __stylesFunc(cancelStyle, style, 'cancelStyle');
  itemContainerStyle = __stylesFunc(
    itemContainerStyle,
    style,
    'itemContainerStyle',
  );
  titleStyle = __stylesFunc(titleStyle, style, 'titleStyle');
  return (
    <Modal
      visible={isVisible}
      style={{margin: 0, justifyContent: 'flex-end'}}
      onDismiss={() => onDismiss(false)}
      onRequestClose={() => onDismiss(false)}
      transparent>
      <View style={[styles.containerStyle, ...containerStyle]}>
        <View style={{flex: 1}} />
        {onCancel && (
          <>
            <View style={{height: 10}} />
            <TouchableOpacity
              onPress={() => onCancel(false)}
              style={[styles.cancelStyle, ...cancelStyle]}>
              <CTSIcon source={closeIcon} disabled />
            </TouchableOpacity>
          </>
        )}
        <View style={[styles.itemContainer, ...itemContainerStyle]}>
          {title && (
            <Text style={[styles.titleStyle, ...titleStyle]}>{title}</Text>
          )}
          {children}
        </View>
      </View>
      <SafeAreaView style={{backgroundColor: colors.white}} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    overflow: 'hidden',
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: 20,
    paddingTop: 20,

    width: '100%',
  },

  titleStyle: {
    marginBottom: 30,
  },

  cancelStyle: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 15,
    borderRadius: 25,
    alignSelf: 'center',
  },
});
CTBottomModal.propTypes = {
  onCancel: propTypes.func,
  onDismiss: propTypes.func,
  title: propTypes.string,
  isVisible: propTypes.bool,
  cancelStyle: ViewPropTypes.style,
  itemContainerStyle: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
  titleStyle: propTypes.object,
  style: propTypes.shape({
    cancelStyle: ViewPropTypes.style,
    itemContainerStyle: ViewPropTypes.style,
    containerStyle: ViewPropTypes.style,
    titleStyle: propTypes.object,
  }),
};
