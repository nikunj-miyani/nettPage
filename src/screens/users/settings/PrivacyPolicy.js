import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { CTSHeader, CTSKeyboardAvoidScrollView } from "../../../components";
import { colors, fonts, fontSizes } from "../../../constants";

export default function PrivacyPolicy() {
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <CTSHeader
        title="Privacy Policy"
        statusbarColor={colors.background}
        statusbarStyle="dark-content"
        onBackPress={() => navigation.goBack()}
      />
      <CTSKeyboardAvoidScrollView
        scrollContentContainerStyle={{ paddingTop: 20 }}
      >
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.headingText}>What is Lorem Ipsum?</Text>
          <Text style={styles.discriptionText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={styles.headingText}>Why do we use it?</Text>
          <Text style={styles.discriptionText}>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English.
          </Text>
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={styles.headingText}>Where does it come from?</Text>
          <Text style={styles.discriptionText}>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old.
          </Text>
        </View>
      </CTSKeyboardAvoidScrollView>
      <SafeAreaView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headingText: {
    fontSize: fontSizes.f17,
    fontFamily: fonts.sairaSemiBoldFont,
    color: colors.secondary,
  },
  discriptionText: {
    fontSize: fontSizes.f13,
    fontFamily: fonts.sairaMediumFont,
    color: colors.lightslategray,
    textAlign: "justify",
    marginTop: 5,
  },
});
