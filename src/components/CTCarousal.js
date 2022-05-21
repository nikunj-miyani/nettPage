import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  ViewPropTypes,
} from 'react-native';
import propTypes from 'prop-types';
import {CTSButton} from '.';
import {arrowLeftIcon} from '../assets/icons';
import themeStyles from '../assets/styles/themestyles';
import colors from '../constants/colors';
import __stylesFunc, {
  __themeStyleFunc,
} from '../utils/basicFunctions/StylesFunc';

const DeviceWidth = Dimensions.get('screen').width;

export function Paginator({
  data,
  scrollX,
  activeDotWidth,
  dotStyle,
  dotContainerStyle,
}) {
  return (
    <View style={[styles.dotContainerStyle, ...dotContainerStyle]}>
      {data.map((_, i) => {
        const inputRange = [
          (i - 1) * DeviceWidth,
          i * DeviceWidth,
          (i + 1) * DeviceWidth,
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, activeDotWidth || 20, 10],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 1, 0.5],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={[{width: dotWidth, opacity}, styles.dotStyle, dotStyle]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
}

export function CTOnBoarding({
  data,
  activeDotWidth,
  previousButton,
  onSkip,
  onFinish,
  nextButton,
  contentContainerStyle,
  descriptionTextStyle,
  skipTextStyle,
  skipButtonContainerStyle,
  imageStyle,
  titleStyle,
  dotStyle,
  finishButtonStyle,
  finishTextStyle,
  previousButtonStyle,
  previousTextStyle,
  nextButtonStyle,
  nextTextStyle,
  dotContainerStyle,
  buttonContainerStyle,
  style,
}) {
  style = __themeStyleFunc(style, themeStyles.CTCarousal);
  contentContainerStyle = __stylesFunc(
    contentContainerStyle,
    style,
    'contentContainerStyle',
  );

  skipButtonContainerStyle = __stylesFunc(
    skipButtonContainerStyle,
    style,
    'skipButtonContainerStyle',
  );
  skipTextStyle = __stylesFunc(skipTextStyle, style, 'skipTextStyle');
  imageStyle = __stylesFunc(imageStyle, style, 'imageStyle');
  titleStyle = __stylesFunc(titleStyle, style, 'titleStyle');
  descriptionTextStyle = __stylesFunc(
    descriptionTextStyle,
    style,
    'descriptionTextStyle',
  );
  dotStyle = __stylesFunc(dotStyle, style, 'dotStyle');
  finishButtonStyle = __stylesFunc(
    finishButtonStyle,
    style,
    'finishButtonStyle',
  );
  previousButtonStyle = __stylesFunc(
    previousButtonStyle,
    style,
    'previousButtonStyle',
  );
  nextButtonStyle = __stylesFunc(nextButtonStyle, style, 'nextButtonStyle');
  dotContainerStyle = __stylesFunc(
    dotContainerStyle,
    style,
    'dotContainerStyle',
  );
  buttonContainerStyle = __stylesFunc(
    buttonContainerStyle,
    style,
    'buttonContainerStyle',
  );
  finishTextStyle = __stylesFunc(finishTextStyle, style, 'finishTextStyle');
  previousTextStyle = __stylesFunc(
    previousTextStyle,
    style,
    'previousTextStyle',
  );
  nextTextStyle = __stylesFunc(nextTextStyle, style, 'nextTextStyle');
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const renderItem = ({item}) => (
    <View>
      <Image
        source={item.image}
        style={[{}, styles.imageStyle, ...imageStyle]}
      />
      <View style={{width: DeviceWidth}}>
        <Text style={[styles.titleStyle, ...titleStyle]}>{item.title}</Text>
        {typeof item.description === 'string' ? (
          <Text style={[styles.description, descriptionTextStyle]}>
            {item.description}
          </Text>
        ) : (
          <item.description />
        )}
      </View>
    </View>
  );
  const nextSlide = () => {
    if (currentIndex < data.length - 1) {
      slidesRef.current.scrollToIndex({index: currentIndex + 1});
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      slidesRef.current.scrollToIndex({index: currentIndex - 1});
    } else {
      console.log('First Item');
    }
  };

  return (
    <View style={[styles.contentContainerStyle, ...contentContainerStyle]}>
      {onSkip && (
        <CTSButton
          contentContainerStyle={[
            styles.skipButtonContainerStyle,
            ...skipButtonContainerStyle,
          ]}
          titleStyle={[styles.skipTextStyle, ...skipTextStyle]}
          title="Skip"
          fullPress={onSkip}
        />
      )}

      <View style={{flex: 1}}>
        <FlatList
          data={data}
          style={{width: DeviceWidth}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
          ref={slidesRef}
        />
      </View>
      <Paginator
        data={data}
        dotStyle={dotStyle}
        activeDotWidth={activeDotWidth}
        dotContainerStyle={dotContainerStyle}
        scrollX={scrollX}
      />

      <View style={[styles.buttonContainerStyle, ...buttonContainerStyle]}>
        {previousButton && (
          <CTSButton
            fullPress={prevSlide}
            title="Prev"
            contentContainerStyle={[
              styles.previousButtonStyle,
              ...previousButtonStyle,
            ]}
            titleStyle={[...previousTextStyle]}
          />
        )}
        {nextButton && currentIndex < data.length - 1 && (
          <CTSButton
            fullPress={nextSlide}
            title="Next"
            contentContainerStyle={[styles.nextButtonStyle, ...nextButtonStyle]}
            titleStyle={[...nextTextStyle]}
          />
        )}

        {currentIndex == data.length - 1 && onFinish && (
          <CTSButton
            fullPress={onFinish}
            title="Finish"
            contentContainerStyle={[
              styles.finishButtonStyle,
              ...finishButtonStyle,
            ]}
            titleStyle={[...finishTextStyle]}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  skipTextStyle: {
    flex: 0,
  },
  skipButtonContainerStyle: {
    width: 100,

    alignSelf: 'flex-end',
  },
  dotStyle: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
  },
  buttonContainerStyle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    flex: 1,
    justifyContent: 'center',
    width: DeviceWidth,
    resizeMode: 'contain',
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
  },
  dotContainerStyle: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  finishButtonStyle: {
    width: '40%',
  },
  nextButtonStyle: {
    width: '40%',
  },
  previousButtonStyle: {
    width: '40%',
  },
});

CTOnBoarding.propTypes = {
  data: propTypes.array,
  activeDotWidth: propTypes.number,
  previousButton: propTypes.bool,
  nextButton: propTypes.bool,
  onSkip: propTypes.func,
  onFinish: propTypes.func,
  contentContainerStyle: ViewPropTypes.style,
  descriptionTextStyle: propTypes.object,
  skipTextStyle: propTypes.object,
  skipButtonContainerStyle: ViewPropTypes.style,
  imageStyle: propTypes.object,
  titleStyle: propTypes.object,
  dotStyle: ViewPropTypes.style,
  finishButtonStyle: ViewPropTypes.style,
  finishTextStyle: propTypes.object,
  previousButtonStyle: ViewPropTypes.style,
  nextButtonStyle: ViewPropTypes.style,
  dotContainerStyle: ViewPropTypes.style,
  buttonContainerStyle: ViewPropTypes.style,
  finishTextStyle: propTypes.object,
  previousTextStyle: propTypes.object,
  nextTextStyle: propTypes.object,
  style: propTypes.shape({
    contentContainerStyle: ViewPropTypes.style,
    descriptionTextStyle: propTypes.object,
    skipTextStyle: propTypes.object,
    skipButtonContainerStyle: ViewPropTypes.style,
    imageStyle: propTypes.object,
    titleStyle: propTypes.object,
    dotStyle: ViewPropTypes.style,
    finishButtonStyle: ViewPropTypes.style,
    finishTextStyle: propTypes.object,
    previousButtonStyle: ViewPropTypes.style,
    nextButtonStyle: ViewPropTypes.style,
    dotContainerStyle: ViewPropTypes.style,
    buttonContainerStyle: ViewPropTypes.style,
    finishTextStyle: propTypes.object,
    previousTextStyle: propTypes.object,
    nextTextStyle: propTypes.object,
  }),
};
