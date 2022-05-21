import { colors, fonts, fontSizes } from "../../constants";
import { sairaRegularFont } from "../fonts";

const themeStyles = {
  CTSShadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  CTButtonStyle: {
    contentContainerStyle: {
      backgroundColor: colors.primary,
    },
    titleStyle: {
      color: colors.white,
      fontSize: fontSizes.f14,
    },
    rightIconContainerStyle: {},
    rightIconStyle: {},
    leftIconContainerStyle: {},
    leftIconStyle: {},
  },
  CTButtonGradientStyle: {
    contentContainerStyle: {
      overflow: "hidden",
      borderRadius: 5,
    },
    titleStyle: {
      color: colors.white,
      fontSize: fontSizes.f20,
      fontFamily: fonts.sairaBoldFont,
    },
    rightIconContainerStyle: {},
    rightIconStyle: { width: 25, height: 25 },
    leftIconContainerStyle: {},
    leftIconStyle: {},
  },
  CTAvatar: {
    editIconContainerStyle: {
      backgroundColor: colors.secondary,
    },
    deleteIconContainerStyle: {
      backgroundColor: colors.primary,
    },
    imagePlaceholderStyle: {},
    imageStyle: {},
    editIconStyle: {},
    deleteIconStyle: {},
    contentContainerStyle: {},
  },
  CTBottomModal: {
    containerStyle: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    itemContainerStyle: {
      backgroundColor: colors.white,
    },
    titleStyle: {
      color: colors.darkGrayDisable,
    },
    cancelStyle: {
      backgroundColor: colors.white,
    },
  },
  CTCarousal: {
    skipTextStyle: {
      color: colors.primary,
    },
    skipButtonContainerStyle: {
      backgroundColor: colors.white,
    },
    dotStyle: {
      backgroundColor: colors.primary,
    },
    descriptionTextStyle: {
      color: colors.primary,
    },
    titleStyle: {
      color: colors.secondary,
    },
    contentContainerStyle: {},
    imageStyle: {},
    finishButtonStyle: {},
    finishTextStyle: {},
    previousButtonStyle: {},
    previousTextStyle: {},
    nextButtonStyle: {},
    nextTextStyle: {},
    dotContainerStyle: {},
    buttonContainerStyle: {},
  },
  CTConfirmationBox: {
    contentContainerStyle: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContainerStyle: {
      backgroundColor: colors.white,
    },
    confirmButtonTitleStyle: {
      color: colors.white,
      fontFamily: fonts.sairaSemiBoldFont,
      fontSize: fontSizes.f17,
    },
    buttonStyle: {
      backgroundColor: "#0a86f2",
    },
    titleStyle: {
      fontSize: fontSizes.f23,
      color: colors.secondary,
      fontFamily: fonts.sairaSemiBoldFont,
    },
    descriptionStyle: {
      fontSize: fontSizes.f15,
      color: colors.lightslategray,
      fontFamily: fonts.sairaMediumFont,
      textAlign: "center",
    },
    dismissButtonTitleStyle: {
      color: colors.white,
      fontFamily: fonts.sairaSemiBoldFont,
      fontSize: fontSizes.f17,
    },
    dismissButtonStyle: {
      backgroundColor: colors.tomato,
      width: "45%",
      alignItems: "center",
      paddingVertical: 5,
    },
    confirmButtonStyle: {
      width: "45%",
      alignItems: "center",
      paddingVertical: 5,
      backgroundColor: colors.forestgreen,
    },
    iconContainerStyle: {
      alignItems: "flex-end",
    },
    iconStyle: {
      width: 25,
      height: 25,
    },
    imageContainerStyle: {
      alignItems: "center",
      marginBottom: 15,
    },
    imageStyle: {
      width: 70,
      height: 70,
    },
    buttonContainerStyle: {
      marginTop: 15,
    },
  },
  CTHeader: {
    headerSubtitleStyle: {
      color: colors.midnightblue,
      fontSize: fontSizes.f12,
    },
    headerTitleStyle: {
      color: colors.midnightblue,
      fontSize: fontSizes.f20,
      fontFamily: fonts.sairaMediumFont,
    },
    backDropStyle: {
      backgroundColor: "rgba(0,0,0,.5)",
    },
    backButtonStyle: {},
    backIconStyle: {},
    rightCompContainerStyle: {},
    leftCompContainerStyle: {},
    headerContainerStyle: { backgroundColor: colors.transparent },
    statusbarStyle: {},
  },
  CTInput: {
    titleStyle: {
      color: colors.lightGray,
      fontSize: fontSizes.f14,
      fontFamily: fonts.sairaMediumFont,
      paddingHorizontal: 5,
      backgroundColor: colors.background,
    },

    inputContainerStyle: {
      borderColor: colors.gainsboro,
    },
    leftIconContainerStyle: {
      backgroundColor: colors.transparent,
    },
    leftIconStyle: {
      tintColor: colors.lightGray,
    },
    rightIconContainerStyle: {
      backgroundColor: colors.background,
    },
    inputStyle: {
      backgroundColor: colors.background,
      paddingLeft: 15,
      fontSize: fontSizes.f16,
      color: colors.secondary,
      fontFamily: fonts.sairaSemiBoldFont,
    },
    containerStyle: {},
    rightIconStyle: {},
    errorMSGStyle: {},
  },
  CTSimpleInput: {
    titleStyle: {
      color: colors.secondary,
      fontSize: fontSizes.f14,
      paddingHorizontal: 5,
      backgroundColor: colors.background,
      fontFamily: fonts.sairaSemiBoldFont,
    },

    inputContainerStyle: {
      borderColor: colors.gainsboro,
    },
    leftIconContainerStyle: {
      backgroundColor: colors.white,
    },
    leftIconStyle: {
      tintColor: colors.lightGray,
    },
    rightIconContainerStyle: {
      backgroundColor: colors.white,
    },
    inputStyle: {
      backgroundColor: colors.white,
      color: colors.secondary,
      paddingLeft: 15,
      fontSize: fontSizes.f16,
      fontFamily: fonts.sairaMediumFont,
    },
    containerStyle: {},
    rightIconStyle: {},
    errorMSGStyle: {},
  },
  CTLoader: {
    contentContainerStyle: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContainerStyle: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    titleStyle: {
      color: colors.white,
      fontSize: fontSizes.f14,
    },
    modalStyle: {},
  },
  CTSelectBoxDropdown: {
    dropdownBoxContainerStyle: {
      backgroundColor: colors.white,
      borderColor: colors.gainsboro,
    },
    titleStyle: {
      color: colors.secondary,
      paddingHorizontal: 5,
      fontSize: fontSizes.f14,
      backgroundColor: colors.background,
      fontFamily: fonts.sairaBoldFont,
    },
    dropdownSelectedItemTextStyle: {
      fontSize: fontSizes.f15,
      color: colors.lightslategray,
      fontFamily: fonts.sairaMediumFont,
    },
    dropdownSelectedItemContainerTextStyle: {
      backgroundColor: colors.primary,
    },
    placeholderTextStyle: {
      fontSize: fontSizes.f16,
      color: colors.secondary,
      fontFamily: fonts.sairaSemiBoldFont,
    },
    checkIconStyle: {
      tintColor: colors.primary,
    },
    modalItemTextStyle: {
      fontSize: fontSizes.f15,
      color: colors.secondary,
      fontFamily: fonts.sairaRegularFont,
    },
    modalSelectedItemTextStyle: {
      fontSize: fontSizes.f15,
      color: colors.secondary,
      fontFamily: fonts.sairaBoldFont,
    },
    listItemContainerStyle: {},
    placeholderContainerTextStyle: {},
    checkIconContainerStyle: {},
    searchBoxStyle: {},
    buttonContainerStyle: {},
    buttonTitleStyle: {},
    dropdownSelectedItemContainerStyle: {},
    rightIconContainerStyle: {},
    rightIconStyle: {},
    clearButtonContainerStyle: {},
    clearButtonTextStyle: {},
  },
  CTSimpleModal: {
    containerStyle: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    itemContainerStyle: {
      backgroundColor: colors.background,
    },
    modalContainerStyle: {},
  },
  CTText: {
    titleStyle: {
      fontSize: fontSizes.f12,
      color: colors.lightGray,
    },
    containerStyle: {
      borderColor: colors.grayDisable,
    },
    leftIconContainerStyle: {
      backgroundColor: colors.transparent,
    },
    leftIconStyle: {
      tintColor: colors.lightGray,
    },
    rightIconContainerStyle: {
      backgroundColor: colors.white,
    },
    inputStyle: {
      backgroundColor: colors.white,
      color: colors.secondary,
      fontSize: fontSizes.f14,
    },
    titleContainerStyle: {},

    rightIconStyle: {},
  },
  CTActionSheet: {
    itemContainerStyle: {
      backgroundColor: colors.white,
    },
    itemStyle: {
      backgroundColor: colors.white,
    },

    cancelStyle: {
      backgroundColor: colors.white,
    },
    bottomSafeAreaStyle: {
      backgroundColor: colors.white,
    },

    itemTextStyle: {},
    containerStyle: {},
    cancelIconStyle: {},
    itemIconStyle: {},
  },
  CTDateTimePicker: {
    contentContainerStyle: {
      borderColor: colors.black,
    },
    titleContainerStyle: {
      backgroundColor: colors.white,
    },
    titleStyle: {
      fontSize: fontSizes.f11,
      color: colors.darkGrayDisable,
    },
    selectTextStyle: {
      fontSize: fontSizes.f15,
      fontFamily: fonts.sairaMediumFont,
      color: colors.lightslategray,
    },

    selectContainerStyle: {},
    iconContainerStyle: {},
    iconStyle: {},
  },
  CTEmptyList: {
    iconStyle: {
      tintColor: colors.lightGray,
    },
    titleStyle: {
      fontSize: fontSizes.f11,
      color: colors.darkGrayDisable,
    },
    containerStyle: {},
  },
  CTMultiSelectBoxDropdown: {
    itemContainerStyle: {
      backgroundColor: colors.white,
    },

    contentContainerStyle: {
      borderColor: colors.gray,
    },

    selectTextStyle: {
      fontSize: fontSizes.f14,
    },
    titleStyle: {
      fontSize: fontSizes.f16,
    },
    inputContainerStyle: {
      borderColor: colors.gray,
    },
    dropdownBoxtitleContainerStyle: {
      backgroundColor: colors.white,
    },
    dropdownBoxtitleStyle: {
      fontSize: fontSizes.f12,

      color: colors.lightGray,
    },
    blankTextStyle: {
      fontSize: fontSizes.f14,
      color: colors.darkGrayDisable,
    },
    itemTextStyle: {},
    iconContainerStyle: {},
  },
  CTTextMoreLessView: {
    textStyle: {
      fontSize: fontSizes.f13,
      fontFamily: fonts.sairaMediumFont,
      color: colors.secondary,
    },
    lessTextStyle: {
      fontSize: fontSizes.f13,
      fontFamily: fonts.sairaBoldFont,
      color: colors.midnightblue,
    },
    moreTextStyle: {
      fontSize: fontSizes.f13,
      fontFamily: fonts.sairaBoldFont,
      color: colors.midnightblue,
    },
  },
  CTAnimatedLoader: {
    titleStyle: {
      color: colors.white,
      fontSize: fontSizes.f14,
    },
    contentContainerStyle: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContainerStyle: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    lottieStyle: {},
  },
  CTICon: {
    iconContainerStyle: {},
    iconStyle: {},
  },
  CTImageView: {
    containerStyle: {
      width: "100%",
      height: 200,
      overflow: "hidden",
      borderRadius: 20,
    },
    contentContainerStyle: {},
    imageStyle: {},
  },
  CTVideoView: {
    containerStyle: {
      width: "100%",
      height: 200,
      overflow: "hidden",
      borderRadius: 20,
    },
    contentContainerStyle: { alignItems: "center", justifyContent: "center" },
    videoStyle: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    seekContainerStyle: {},
    seekBarStyle: {},
  },
  CTKeyboardAvoidScrollView: {
    keyboardAvoidingStyle: {
      justifyContent: "center",
    },
    keyboardAvoidingContentContainerStyle: {},
    scrollStyle: {},
    scrollContentContainerStyle: {
      paddingHorizontal: 20,
    },
  },
  CTSeparatorLine: {
    separatorStyle: {},
  },
  CTCardView: {
    contentContainerStyle: {},
    imageStyle: {},
    iconContainerStyle: {},
    titleContainerStyle: {},
    titleStyle: {},
  },
  CTMenu: {
    iconStyle: {},
    iconContainerStyle: {},
    menuItemStyle: { backgroundColor: colors.aliceblue },
    menuItemTextStyle: {
      color: colors.secondary,
      fontSize: fontSizes.f14,
      fontFamily: fonts.sairaRegularFont,
    },
    containerStyle: {},
  },
};
export default themeStyles;
