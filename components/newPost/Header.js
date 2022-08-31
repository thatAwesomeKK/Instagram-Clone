import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';

export default function Header({selectedImage}) {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
        <Icon type="antdesign" name="left" color='white' size={30} />
      </TouchableOpacity>
      <Text style={styles.HeaderText}>New Post</Text>
      <TouchableOpacity onPress={() => navigation.navigate('NewPostForm', {
        selectedMedia: selectedImage,
        mediaType: 'image'
      })}>
        <Icon type="antdesign" name="right" color='white' size={30} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    height: '7%',
    paddingHorizontal: 20
  },
  HeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  }
});
