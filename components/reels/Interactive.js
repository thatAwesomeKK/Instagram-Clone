import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "@rneui/base";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

//Main Interactive Component
export default function Interactive({item}) {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Bottom item={item}/>
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
const Bottom = ({item}) => (
  <View style={styles.BottomTab}>
    <Caption item={item} />
    <ActivityTab />
  </View>
);

//Caption Sub-Sub-Component
const Caption = ({item}) => (
  <View style={styles.Caption}>
    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
      <Icon type="font-awesome-5" name="user-circle" color="white" size={30} />
      <Text
        style={{
          color: "white",
          fontWeight: "500",
          marginLeft: 10,
          fontSize: 12,
        }}
      >
        {item.username}
      </Text>
    </TouchableOpacity>
    <Text style={{ marginTop: 7, color: "white", fontSize: 12 }}>
      {item.caption}
    </Text>
  </View>
);

//Activity Sub-Sub-Component
const ActivityTab = () => (
  <View style={styles.ActivityTab}>
    <TouchableOpacity style={styles.Icons}>
      <Icon type="antdesign" name="heart" color="white" size={25} />
      <Text style={{color:'white', fontSize: 12}}>10</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.Icons}>
      <Icon type="feather" name="message-circle" color="white" size={25} />
      <Text style={{color:'white', fontSize: 12}}>12</Text>
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
          paddingHorizontal: 7,
          paddingVertical: 3,
          borderWidth: 1,
          borderColor: "white",
        },
      ]}
    >
      <Icon type="font-awesome" name="user" color="white" size={30} />
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
