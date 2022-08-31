import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const DATA = ["POST", "REEL", "STORY"];

export default function Navigator({ route, setRoute }) {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 30,
        right: -50,
        width: "100%",
        flex: 1,
        alignItems: "center",
      }}
    >
      <FlatList
        data={DATA}
        style={{
          width: "40%",
          overflow: "visible",
        }}
        removeClippedSubviews={false}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>setRoute(item)}>
            <Text style={[styles.text, route===item ? {color: 'white'} : {color: 'gray'}]}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    marginHorizontal: 5,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontWeight: "400",
    fontSize: 16,
  },
});
