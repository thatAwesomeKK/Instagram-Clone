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
import { uploadPost } from "../../lib/db";
import { uploadPostSchema } from "../../utils/schemas";
import { useNavigation } from "@react-navigation/native";

const PLACEHOLDER_IMAGE =
  "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=";

export default function AddNewsPostForm() {
  const [thumbnailURL, setThumbnailURL] = useState(PLACEHOLDER_IMAGE);
  const navigation = useNavigation();

  const handleUpload = async (values) => {
    await uploadPost(values);
    navigation.goBack();
  };

  return (
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
            <View style={{ flexDirection: "row", marginBottom: 15 }}>
              <Image
                style={styles.image}
                source={{
                  uri: thumbnailURL ? thumbnailURL : PLACEHOLDER_IMAGE,
                }}
              />
              <TextInput
                placeholder="Write a Caption..."
                placeholderTextColor="gray"
                multiline={true}
                style={{
                  flex: 1,
                  color: "white",
                  fontSize: 20,
                  marginLeft: 10,
                  textAlignVertical: "top",
                }}
                onChangeText={handleChange("caption")}
                onBlur={handleBlur("caption")}
                value={values.caption}
              />
            </View>
            <Divider width={0.2} orientation="vertical" />
            <TextInput
              onChange={(e) => setThumbnailURL(e.nativeEvent.text)}
              placeholder="Enter Image URL"
              placeholderTextColor="gray"
              onChangeText={handleChange("imageUrl")}
              onBlur={handleBlur("imageUrl")}
              value={values.imageUrl}
              style={{ color: "white", fontSize: 15 }}
            />
            {errors.imageUrl && (
              <Text style={{ fontSize: 13, color: "red" }}>
                {errors.imageUrl}
              </Text>
            )}
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
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
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
