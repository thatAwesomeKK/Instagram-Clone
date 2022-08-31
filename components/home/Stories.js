import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { USERS } from "../../data/users";

export default function Stories() {
  return (
    <View>
      <FlatList
        data={USERS}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.story}>
            <Image style={styles.storyImage} source={{ uri: item.image }} />
            <Text style={styles.storyName}>{item.user}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  story: {
    marginHorizontal: 4,
    alignItems: "center",
  },
  storyImage: {
    height: 70,
    width: 70,
    borderRadius: 50,
    resizeMode: "contain",
    borderWidth: 2,
    borderColor: "#ff8501",
  },
  storyName: {
    color: "white",
    textAlign: "center",
  },
});
