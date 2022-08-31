import { StyleSheet } from "react-native";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { Video } from "expo-av";

export const VideoPlayer = forwardRef(({ item }, parentRef) => {
  const ref = useRef(null);

  //Used for Child Ref Drilling
  useImperativeHandle(parentRef, () => ({
    play,
    stop,
    unload,
  }));

  //Triggers the unload when out of View
  useEffect(() => {
    return () => unload();
  }, []);


  //Start the Video
  const play = async () => {
    if (!ref.current) {
      return;
    }
    const status = await ref.current.getStatusAsync();
    if (status?.isPlaying) {
      return;
    }
    await ref.current.playAsync();
  };

  //stops the Video
  const stop = async () => {
    if (!ref.current) {
      return;
    }
    const status = await ref.current.getStatusAsync();
    if (!status?.isPlaying) {
      return;
    }
    await ref.current.stopAsync();
  };

  //Unload Video when out of Frame
  const unload = async () => {
    if (!ref.current) {
      return;
    }
    await ref.current.unloadAsync();
  };

  return (
    <Video
      ref={ref}
      style={styles.container}
      resizeMode="cover"
      shouldPlay={false}
      usePoster
      posterSource={{ uri: 'https://www.wwe.com/f/styles/og_image/public/all/2019/10/RAW_06202016rf_1606--3d3997f53e6f3e9277cd5a67fbd8f31f.jpg' }}
      isLooping
      source={{
        uri: item.reelUrl,
      }}
    />
  );
});

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
