import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { Video } from "expo-av";

export default function Gallery({ selectedVideo, setSelectedVideo }) {
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
          mediaType: ["video"],
        });
        const checkDurationAspect = async () => {
          const arr = []
          for (let i = 0; i < userGalleryMedia.assets.length; i++) {
            const element = userGalleryMedia.assets[i];
            if (element.duration > 60 || element.height !== 1920 || element.width !== 1080) {
              console.log('not Found');
            } else {
              arr.push(element)
            }
          }
          return arr
        }
        setGalleryItems(checkDurationAspect);
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
        <Video
          style={{
            width: 400,
            height: 400,
          }}
          shouldPlay
          resizeMode="contain"
          source={{ uri: selectedVideo }}
        />
      </View>
      <FlatList
        data={galleryItems._W}
        horizontal={false}
        numColumns={3}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedVideo(item.uri)}>
            <Video
              style={{ width: 128, height: 128 }}
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
