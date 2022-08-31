import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Gallery from "./Gallery";
import Header from "./Header";

export default function AddNewPost() {
    const [selectedImage, setSelectedImage] = useState(null)
  return (
    <View>
      <Header selectedImage={selectedImage} />
      <Gallery
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
