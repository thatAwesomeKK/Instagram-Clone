import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Interactive from "../components/reels/Interactive";
import VideoPlayer from "../components/reels/VideoPlayer";
import { getReels } from "../lib/db";

export default function ReelsScreen() {
  const mediaRef = useRef([]);
  const [reels, setReels] = useState([])

  useEffect(() => {
    const fetchReels = async () => {
      const reels = await getReels();
      setReels(reels)
    }
    fetchReels()
  }, [])

  const array = [
    "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
  ];

  //Runs when item is Changed on the View
  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach((element) => {
      const cell = mediaRef.current[element.key];
      if (cell) {
        if (element.isViewable) {
          cell.play();
        } else {
          cell.stop();
        }
      }
    });
  });

  const renderItem = ({ item, index }) => (
    <View style={{ height: Dimensions.get("window").height - 49 }}>
      <Interactive item={item} />
      <VideoPlayer
        item={item}
        ref={(VideoPlayerRef) => (mediaRef.current[item.id] = VideoPlayerRef)}
      />
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={reels}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        pagingEnabled
        decelerationRate={"fast"}
        onViewableItemsChanged={onViewableItemsChanged.current}
        windowSize={4}
        maxToRenderPerBatch={2}
        initialNumToRender={0}
        removeClippedSubviews
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative"
  }
});
