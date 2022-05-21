import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function OnboardingSecond() {
  return (
    <View style={styles.container}>
      <Text>OnboardingSecond</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
