import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginForm from "../components/login/LoginForm";

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          styles={{}}
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/5/58/Instagram-Icon.png",
            height: 100,
            width: 100,
          }}
        />
      </View>
      <LoginForm/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer:{
    alignItems: "center", marginTop: 60,
  }
});
