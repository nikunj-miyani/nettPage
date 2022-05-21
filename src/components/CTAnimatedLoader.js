import React from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';

import AnimatedLottieView from 'lottie-react-native';
import propType from 'prop-types';
import {colors, fontSizes} from '../constants';
import {checkLottie, loaderLottie} from '../assets/lottieAnimation';
import themeStyles from '../assets/styles/themestyles';
import __stylesFunc, {
  __themeStyleFunc,
} from '../utils/basicFunctions/StylesFunc';

export default function CTAnimatedLoader({
  isTrue,
  isVisible,
  duration,
  title,
  successTitle,
  titleStyle,
  contentContainerStyle,
  modalContainerStyle,
  lottieStyle,
  style,
}) {
  style = __themeStyleFunc(style, themeStyles.CTAnimatedLoader);
  contentContainerStyle = __stylesFunc(
    contentContainerStyle,
    style,
    'contentContainerStyle',
  );
  titleStyle = __stylesFunc(titleStyle, style, 'titleStyle');
  modalContainerStyle = __stylesFunc(
    modalContainerStyle,
    style,
    'modalContainerStyle',
  );
  lottieStyle = __stylesFunc(lottieStyle, style, 'lottieStyle');

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={[styles.contentContainerStyle, ...contentContainerStyle]}>
        <View style={[styles.modalContainerStyle, ...modalContainerStyle]}>
          <AnimatedLottieView
            source={isTrue ? checkLottie : loaderLottie}
            autoPlay
            duration={duration}
            style={[{width: 30, height: 30}, ...lottieStyle]}
          />

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
    alignItems: 'center',
  },
  titleStyle: {
    marginLeft: 10,
  },
});
CTAnimatedLoader.propTypes = {
  isTrue: propType.bool,
  isVisible: propType.bool,
  duration: propType.number,
  title: propType.string,
  titleStyle: propType.object,
  successTitle: propType.string,
};
