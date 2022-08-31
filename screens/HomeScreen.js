import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/home/Header";
import Stories from "../components/home/Stories";
import Post from "../components/home/Post";
import BottomTabs from "../components/home/BottomTabs";
import { getPosts } from "../lib/db";

export default function HomeScreen() {
  const [posts, setPosts] = useState(null);

  useEffect(() => getPosts(setPosts), []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Stories />
      {posts && <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View key={item.id}>
            <Post post={item} />
          </View>
        )}
      />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
