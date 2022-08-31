import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';

export default function Header({ selectedVideo }) {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Text style={styles.HeaderText}>New Reel</Text>
      <TouchableOpacity onPress={() => navigation.navigate('NewPostForm', {
        selectedMedia: selectedVideo,
        mediaType: 'video'
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
})