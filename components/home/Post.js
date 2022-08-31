import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Divider } from "react-native-elements";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { checkLike, handleLike } from "../../lib/db";

export default function Post({ post }) {
  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <PostFooter post={post} />
    </View>
  );
}

//Top Header
const PostHeader = ({ post }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginHorizontal: 5,
      marginVertical: 10,
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image source={{ uri: post?.pfp }} style={styles.headerImage} />
      <Text style={styles.headerName}>{post?.username}</Text>
    </View>
    <SimpleLineIcons name="options" style={{ color: "white", fontSize: 15 }} />
  </View>
);

//Middle Main Image
const PostImage = ({ post }) => (
  <View style={{ width: "100%", height: 450 }}>
    <Image style={styles.mainImage} source={{ uri: post?.imageUrl }} />
  </View>
);

//Bottom Footer
const PostFooter = ({ post }) => (
  <View style={{ marginHorizontal: 5, marginTop: 10 }}>
    <Icons post={post} />
    <Text style={{ color: "white", marginVertical: 4, fontWeight: "500" }}>
      {post?.likes_by_users.length} likes
    </Text>
    <Caption post={post} />
    {post?.comments?.length > 0 && <CommentSection post={post} />}
  </View>
);

const Caption = ({ post }) => (
  <View>
    <Text>
      <Text style={styles.captionName}>{post?.username} </Text>
      <Text style={styles.caption}>{post?.caption}</Text>
    </Text>
  </View>
);

const CommentSection = ({ post }) => (
  <>
    <Text style={{ color: "gray" }}>
      {post?.comments?.length > 1
        ? `View all ${post?.comments?.length} comments`
        : "View the comment"}
    </Text>
    <Comment post={post} />
  </>
);

const Comment = ({ post }) => (
  <FlatList
    data={post?.comments}
    initialNumToRender={0}
    renderItem={({ item }) => (
      <Text key={item.id}>
        <Text style={styles.commentName}>{item.username} </Text>
        <Text style={styles.comment}>{item.comment}</Text>
      </Text>
    )}
  />
);

const Icons = ({ post }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity onPress={() => handleLike(post)}>
        <FAIcon
          name={checkLike(post) ? "heart" : "heart-o"}
          style={checkLike(post) ? styles.likedHeart : styles.footerIcons}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <FeatherIcon name="message-circle" style={styles.footerIcons} />
      </TouchableOpacity>
      <TouchableOpacity>
        <FeatherIcon name="send" style={styles.footerIcons} />
      </TouchableOpacity>
    </View>
    <TouchableOpacity>
      <FeatherIcon name="bookmark" style={styles.footerIcons} />
    </TouchableOpacity>
  </View>
);

//Styles
const styles = StyleSheet.create({
  headerImage: {
    height: 35,
    width: 35,
    borderRadius: 50,
    resizeMode: "contain",
    borderWidth: 1.6,
    borderColor: "#ff8501",
  },
  headerName: {
    fontWeight: "700",
    fontSize: 16,
    color: "white",
    marginLeft: 5,
  },
  mainImage: {
    height: "100%",
    resizeMode: "cover",
  },
  footerIcons: {
    fontSize: 30,
    height: 30,
    color: "white",
    marginHorizontal: 3,
  },
  likedHeart: {
    fontSize: 30,
    height: 30,
    color: "red",
    marginHorizontal: 3,
  },
  captionName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  caption: {
    color: "white",
  },
  commentName: {
    color: "white",
    fontWeight: "700",
    fontSize: 14,
  },
  comment: {
    color: "white",
    fontSize: 13,
  },
});
