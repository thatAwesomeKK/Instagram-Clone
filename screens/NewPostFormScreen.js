import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import { Divider } from "@rneui/base";
import { useNavigation, useRoute } from "@react-navigation/native";
import { uploadImage, uploadPost, uploadReel } from "../lib/db";
import { uploadPostSchema } from "../utils/schemas";
import { SafeAreaView } from "react-native-safe-area-context";
import {Video} from 'expo-av'

const PLACEHOLDER_IMAGE =
  "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=";

export default function NewPostFormScreen() {
  const { params } = useRoute();
  const { selectedMedia, mediaType } = params;
  const navigation = useNavigation();

  const handleUpload = async (values) => {
    if (mediaType === "image") {
      await uploadImage({ ...values, uri: selectedMedia });
    } else if (mediaType === "video") {
      await uploadReel({ ...values, uri: selectedMedia });
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <Formik
        initialValues={{ caption: "", imageUrl: "" }}
        onSubmit={(values) => handleUpload(values)}
        validationSchema={uploadPostSchema}
        validateOnMount={true}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <>
            <View style={{ margin: 20 }}>
              <View style={{ marginBottom: 15 }}>
                {mediaType === "image" ? (
                  <Image
                    style={styles.image}
                    source={{
                      uri: selectedMedia ? selectedMedia : PLACEHOLDER_IMAGE,
                    }}
                  />
                ) : (
                  <Video
                    style={styles.image}
                    resizeMode='contain'
                    source={{
                      uri: selectedMedia ? selectedMedia : PLACEHOLDER_IMAGE,
                    }}
                  />
                )}
                <TextInput
                  placeholder="Write a Caption..."
                  placeholderTextColor="gray"
                  multiline={true}
                  style={{
                    color: "black",
                    fontSize: 20,
                    marginTop: 20,
                    textAlignVertical: "top",
                  }}
                  onChangeText={handleChange("caption")}
                  onBlur={handleBlur("caption")}
                  value={values.caption}
                />
              </View>
              <Divider width={0.2} orientation="vertical" />
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <TouchableOpacity
                style={!isValid ? styles.buttonInvalid : styles.buttonValid}
                onPress={handleSubmit}
                disabled={!isValid}
              >
                <Text
                  style={{
                    color: "blue",
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize: 17,
                  }}
                >
                  Share!
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    resizeMode: "contain",
  },
  buttonValid: {
    backgroundColor: "white",
    width: 140,
    paddingVertical: 13,
    borderRadius: 5,
  },
  buttonInvalid: {
    backgroundColor: "gray",
    width: 140,
    paddingVertical: 13,
    borderRadius: 5,
  },
});
