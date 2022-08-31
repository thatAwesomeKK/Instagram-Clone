import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "@rneui/base";
import { checkLike, getReelsInfo, handleLikeReels } from "../../lib/db";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

//Main Interactive Component
export default function Interactive({ item }) {
  const [info, setInfo] = useState(null)

  useEffect(() => getReelsInfo(item, setInfo), [])

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Bottom info={info} />
    </SafeAreaView>
  );
}

//Header Sub-Component
const Header = () => (
  <View
    style={{
      width: WIDTH - 30,
      marginHorizontal: 15,
      flexDirection: "row",
      justifyContent: "space-between",
    }}
  >
    <Text style={{ color: "white", fontSize: 20 }}>Reels</Text>
    <Icon
      type="material-community"
      name="camera-outline"
      color="white"
      size={30}
    />
  </View>
);

//Bottom Sub-Component
const Bottom = ({ info }) => (
  <View style={styles.BottomTab}>
    <Caption info={info} />
    <ActivityTab info={info} />
  </View>
);

//Caption Sub-Sub-Component
const Caption = ({ info }) => (
  <View style={styles.Caption}>
    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        style={{ width: 30, height: 30, overflow: "hidden", borderRadius: 15 }}
        resizeMode="cover"
        source={{ uri: info?.pfp }}
      />
      <Text
        style={{
          color: "white",
          fontWeight: "500",
          marginLeft: 10,
          fontSize: 12,
        }}
      >
        {info?.username}
      </Text>
    </TouchableOpacity>
    <Text style={{ marginTop: 7, color: "white", fontSize: 12 }}>
      {info?.caption}
    </Text>
  </View>
);

//Activity Sub-Sub-Component
const ActivityTab = ({ info }) => (
  <View style={styles.ActivityTab}>
    <TouchableOpacity onPress={() => handleLikeReels(info)} style={styles.Icons}>
      <Icon type="font-awesome" name={checkLike(info) ? "heart" : "heart-o"} color={checkLike(info) ? "red" : "white"} size={25} />
      <Text style={{ color: 'white', fontSize: 12 }}>{info?.likes_by_users.length}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.Icons}>
      <Icon type="feather" name="message-circle" color="white" size={25} />
      <Text style={{ color: 'white', fontSize: 12 }}>12</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.Icons}>
      <Icon type="feather" name="send" color="white" size={25} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.Icons}>
      <Icon
        type="simple-line-icon"
        name="options-vertical"
        color="white"
        size={20}
      />
    </TouchableOpacity>
    <TouchableOpacity
      style={[
        styles.Icons,
        {
          borderRadius: 5,
          borderWidth: 1,
          borderColor: "white",
          overflow: "hidden",
        },
      ]}
    >
      <Image
        source={{ uri: info?.pfp }}
        style={{ width: 30, height: 30 }}
      />
    </TouchableOpacity>
  </View>
);

//stylesheet
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 100,
    height: HEIGHT - 49,
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 20,
    paddingTop: -10,
  },
  BottomTab: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    width: WIDTH,
    paddingHorizontal: 15,
  },
  Caption: {},
  Icons: {
    marginTop: 15,
    alignItems: "center",
  },
  ActivityTab: {},
});
