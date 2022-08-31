import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AddNewPost from "../components/newPost/AddNewPost";
import Navigator from "../components/newPost/Navigator";
import AddNewReel from "../components/newPost/AddNewReel";

export default function NewPostScreen() {
  const [route, setRoute] = useState("POST");

  const checkRoute = () => {
    switch (route) {
      case "POST":
        return <AddNewPost />;
      case "REEL":
        return <AddNewReel />;
      default:
        return "POST";
    }
  };

  return (
  <SafeAreaView style={styles.container}>
    {checkRoute()}
    <Navigator route={route} setRoute={setRoute}/>
  </SafeAreaView>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "black",
  },
});
