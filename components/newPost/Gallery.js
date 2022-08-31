import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

export default function Gallery({selectedImage ,setSelectedImage}) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(false);
  const [galleryItems, setGalleryItems] = useState([]);
  

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");

      if (galleryStatus.status === "granted") {
        const userGalleryMedia = await MediaLibrary.getAssetsAsync({
          sortBy: ["creationTime"],
          mediaType: ["photo"],
        });
        setGalleryItems(userGalleryMedia);
      }
    })();
  }, []);

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <View
        style={{
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <TouchableOpacity style={styles.PostButton}>
          <Text style={{ color: "black" }}>Post</Text>
        </TouchableOpacity>
        <Image
          style={{
            width: 400,
            height: 400,
          }}
          resizeMode="contain"
          source={{ uri: selectedImage }} r
        />
      </View>
      <FlatList
        data={galleryItems?.assets}
        horizontal={false}
        numColumns={3}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedImage(item.uri)}>
            <Image
              style={{ width: 130, height: 130 }}
              resizeMode="cover"
              source={{ uri: item.uri }}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  PostButton: {
    position: "absolute",
    zIndex: 10,
    top: 5,
    right: 20,
    backgroundColor: "#458eff",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 4
  },
});
