import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  ViewPropTypes,
} from 'react-native';
import propTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import {bottomDropdownArrowIcon, closeIcon, searchIcon} from '../assets/icons';
import {colors, fontSizes} from '../constants';
import {CTSInput, CTSButton, CTSIcon, CTSMapList} from '.';
import {
  __localSearch,
  __selectDeselect,
} from '../utils/basicFunctions/InitFunction';
import __stylesFunc, {
  __themeStyleFunc,
} from '../utils/basicFunctions/StylesFunc';
import themeStyles from '../assets/styles/themestyles';

export default function CTMultiSelectBoxDropdown({
  data,
  onPressDropdown,
  itemContainerStyle,
  itemStyle,
  itemTextStyle,
  onBackdropPress,
  title,
  selectedTitle,
  titleStyle,
  iconContainerStyle,
  contentContainerStyle,
  dropdownBoxtitleContainerStyle,
  inputContainerStyle,
  dropdownBoxtitleStyle,
  selectTextStyle,
  searchable = true,
  selectedItem,
  getSelectedItem,
  placeholder,
  itemTitleKey,
  style,
  blankError = 'No recored found',
  blankTextStyle,
}) {
  style = __themeStyleFunc(style, themeStyles.CTMultiSelectBoxDropdown);

  itemStyle = __stylesFunc(itemStyle, style, 'itemStyle');
  itemContainerStyle = __stylesFunc(
    itemContainerStyle,
    style,
    'itemContainerStyle',
  );
  itemTextStyle = __stylesFunc(itemTextStyle, style, 'itemTextStyle');
  titleStyle = __stylesFunc(titleStyle, style, 'titleStyle');
  iconContainerStyle = __stylesFunc(
    iconContainerStyle,
    style,
    'iconContainerStyle',
  );
  contentContainerStyle = __stylesFunc(
    contentContainerStyle,
    style,
    'contentContainerStyle',
  );
  dropdownBoxtitleStyle = __stylesFunc(
    dropdownBoxtitleStyle,
    style,
    'dropdownBoxtitleStyle',
  );
  dropdownBoxtitleContainerStyle = __stylesFunc(
    dropdownBoxtitleContainerStyle,
    style,
    'dropdownBoxtitleContainerStyle',
  );
  selectTextStyle = __stylesFunc(selectTextStyle, style, 'selectTextStyle');
  inputContainerStyle = __stylesFunc(
    inputContainerStyle,
    style,
    'inputContainerStyle',
  );
  blankTextStyle = __stylesFunc(blankTextStyle, style, 'blankTextStyle');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [tempData, setTempData] = useState();
  const [tempSelected, setTempSelected] = useState([]);

  useEffect(() => {
    const temp = [];
    if (typeof data[0] === 'object') {
      data.forEach(element => {
        temp.push({title: element[itemTitleKey], ...element});
      });
    }
    setFilterData(temp);

    setTempSelected(selectedItem.map(item => item[itemTitleKey]));
  }, [isModalVisible]);
  const onPressSelect = () => {
    const tempArray = data.filter(item =>
      tempSelected.includes(item[itemTitleKey]),
    );

    getSelectedItem && getSelectedItem(tempArray);
    setIsModalVisible(false);
  };
  const onPressCancel = () => {
    setIsModalVisible(false);
  };
  const renderItem = ({item, index}) => {
    const isSelected = tempSelected.includes(item.title);
    return (
      <TouchableOpacity
        style={[{flexDirection: 'row', alignItems: 'center'}, ...itemStyle]}
        onPress={() => {
          setTempSelected([...__selectDeselect(item.title, tempSelected)]);
        }}>
        {isSelected && (
          <View
            style={{
              height: 12,
              backgroundColor: colors.primary,
              width: 2,
            }}
          />
        )}
        <Text
          style={{
            fontSize: fontSizes.f14,
            marginVertical: 10,
            marginLeft: 10,
            color: isSelected ? colors.primary : colors.black,
            ...itemTextStyle,
          }}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <Modal
        isVisible={isModalVisible}
        style={{margin: 0, justifyContent: 'flex-end'}}
        useNativeDriver
        onBackdropPress={() => {
          setIsModalVisible(false);
          onBackdropPress && onBackdropPress();
        }}
        onBackButtonPress={() => {
          setIsModalVisible(false);
          onBackdropPress && onBackdropPress();
        }}>
        <SafeAreaView />
        <View style={[styles.itemContainerStyle, ...itemContainerStyle]}>
          <View
            style={{
              width: 32,
              height: 4,
              backgroundColor: colors.gray,
              alignSelf: 'center',
            }}
          />
          <Text style={[styles.titleStyle, ...titleStyle]}>{title}</Text>
          {searchable && (
            <CTSInput
              inputContainerStyle={[
                styles.inputContainerStyle,
                ...inputContainerStyle,
              ]}
              placeholder={placeholder}
              rightIconStyle={{width: 16, height: 16}}
              placeholderTextColor={colors.gray}
              rightSource={searchIcon}
              onFocus={() => {
                setTempData(filterData);
              }}
              onChangeText={text => {
                if (text !== '') {
                  setFilterData(__localSearch(tempData, text, [itemTitleKey]));
                } else {
                  setFilterData(tempData);
                }
              }}
            />
          )}
          {filterData.length !== 0 ? (
            <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
              <CTSMapList data={filterData} renderItem={renderItem} />
            </ScrollView>
          ) : (
            <Text style={[styles.blankTextStyle, ...blankTextStyle]}>
              {blankError}
            </Text>
          )}
          <View style={styles.buttonContainerStyle}>
            {filterData.length !== 0 && (
              <>
                <CTSButton
                  contentContainerStyle={{
                    width: '50%',
                    backgroundColor: colors.white,
                  }}
                  titleStyle={{color: colors.darkGrayDisable}}
                  title="Cancel"
                  onFullPress={onPressCancel}
                />
                <CTSButton
                  contentContainerStyle={{width: '50%'}}
                  title="Select"
                  onFullPress={onPressSelect}
                />
              </>
            )}
          </View>
        </View>

        <SafeAreaView style={{backgroundColor: '#fff'}} />
      </Modal>

      <TouchableOpacity
        onPress={() => {
          setIsModalVisible(!isModalVisible);
          onPressDropdown && onPressDropdown();
        }}
        style={[styles.contentContainerStyle, ...contentContainerStyle]}>
        <View
          style={[
            styles.dropdownBoxtitleContainerStyle,
            ...dropdownBoxtitleContainerStyle,
          ]}>
          <Text
            style={[styles.dropdownBoxtitleStyle, ...dropdownBoxtitleStyle]}>
            {title}
          </Text>
        </View>
        <View>
          <Text style={[styles.selectTextStyle]}>
            {selectedItem.length !== 0
              ? `${selectedItem.length} ${selectedTitle}`
              : `Select ${title}`}
          </Text>
        </View>
        <View style={[styles.iconContainerStyle, ...iconContainerStyle]}>
          <FastImage
            source={bottomDropdownArrowIcon}
            style={{width: 12, height: 12}}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
      <View style={{marginTop: 10}}>
        {selectedItem.length !== 0 && (
          <FlatList
            bounces={false}
            keyExtractor={(item, index) => String(item)}
            data={selectedItem}
            extraData={selectedItem}
            numColumns={2}
            renderItem={({item, index}) => (
              <View
                style={{
                  flexDirection: 'row',
                  borderRadius: 100,
                  padding: 10,
                  paddingLeft: 15,
                  alignItems: 'center',
                  marginVertical: 5,
                  marginRight: 5,
                  backgroundColor: colors.grayDisable,
                }}>
                {/* <Text>{item[itemTitleKey]}</Text> */}
                <CTSIcon
                  source={closeIcon}
                  iconStyle={{width: 10, height: 10}}
                  iconContainerStyle={{paddingHorizontal: 10}}
                  onPress={() => {
                    const newArray = selectedItem.filter(
                      item2 => item2 !== item,
                    );
                    getSelectedItem && getSelectedItem(newArray);
                  }}
                />
              </View>
            )}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  itemContainerStyle: {
    overflow: 'hidden',
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: 20,
    paddingTop: 20,
    maxHeight: '70%',
    minHeight: '70%',
    paddingBottom: 10,
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  contentContainerStyle: {
    width: '100%',
    height: 48,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 1,
  },
  iconContainerStyle: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectTextStyle: {
    marginLeft: 15,
  },
  titleStyle: {
    textAlign: 'center',
    marginVertical: 10,
    marginTop: 20,
  },
  inputContainerStyle: {
    height: 40,
    borderWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  dropdownBoxtitleContainerStyle: {
    position: 'absolute',
    top: -9,
    left: 10,
    paddingHorizontal: 5,
  },

  blankTextStyle: {
    textAlign: 'center',
  },
});
CTMultiSelectBoxDropdown.ppropTypes = {
  data: propTypes.array,
  title: propTypes.string,
  selectedTitle: propTypes.string,
  onPressDropdown: propTypes.func,
  onBackdropPress: propTypes.func,
  searchable: propTypes.bool,
  selectedItem: propTypes.array,
  getSelectedItem: propTypes.func,
  placeholder: propTypes.string,
  itemTitleKey: propTypes.string,
  blankError: propTypes.string,
  itemContainerStyle: ViewPropTypes.style,
  itemStyle: ViewPropTypes.style,
  itemTextStyle: propTypes.object,
  titleStyle: propTypes.object,
  iconContainerStyle: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  dropdownBoxtitleContainerStyle: ViewPropTypes.style,
  inputContainerStyle: ViewPropTypes.style,
  dropdownBoxtitleStyle: propTypes.object,
  selectTextStyle: propTypes.object,
  blankTextStyle: propTypes.object,
  style: propTypes.shape({
    itemContainerStyle: ViewPropTypes.style,
    itemStyle: ViewPropTypes.style,
    itemTextStyle: propTypes.object,
    titleStyle: propTypes.object,
    iconContainerStyle: ViewPropTypes.style,
    contentContainerStyle: ViewPropTypes.style,
    dropdownBoxtitleContainerStyle: ViewPropTypes.style,
    inputContainerStyle: ViewPropTypes.style,
    dropdownBoxtitleStyle: propTypes.object,
    selectTextStyle: propTypes.object,
    blankTextStyle: propTypes.object,
  }),
};
