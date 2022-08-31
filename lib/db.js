import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Alert } from "react-native";
import { auth, db, storage } from "./firebase";

//Creating User
export const createUser = async (authUser, username) => {
  return await setDoc(doc(db, "users", authUser.user.uid), {
    uid: authUser.user.uid,
    username,
    pfp: await getRandomProfilePicture(),
    timestamp: serverTimestamp(),
  });
};

//Getting Random User Profiles (For Dev Only)
const getRandomProfilePicture = async () => {
  const response = await fetch("https://randomuser.me/api");
  const data = await response.json();
  return data.results[0].picture.large;
};

//Fetching all the posts
export const getPosts = (setPosts) =>
  onSnapshot(
    query(collection(db, "posts"), orderBy("createdAt", "desc")),
    (snapshot) => {
      if (snapshot) {
        setPosts(snapshot.docs.map((post) => post.data()));
      }
    }
  );

export const getReels = (setReels) =>
  onSnapshot(
    query(collection(db, "reels"), orderBy("createdAt", "desc")),
    (snapshot) => {
      if (snapshot) {
        setReels(snapshot.docs.map((reel) => reel.data()));
      }
    }
  );


//Upload a Reel
export const uploadReel = async (values) => {
  const uid = auth.currentUser.uid;
  try {
    //Slicing Filename from URI
    const filename = values.uri.substring(values.uri.lastIndexOf("/") + 1);

    //Storage Bucket URI
    const reelRef = ref(storage, `reels/${filename}`);

    //Need to create a BLOB from the Image URI
    const blob = await getBlobFromUri(values.uri)

    //Uploading to Firebase
    await uploadBytes(reelRef, blob)

    //Obtaining the Download URL
    const downloadURL = await getDownloadURL(reelRef);
    const url = downloadURL.replace("https://firebasestorage.googleapis.com","https://ik.imagekit.io/kudozog");

    //Creating the Firestore Ref
    const userRef = await getDoc(doc(db, "users", uid));

    //Destucturing username and pfp 
    const { username, pfp } = userRef.data();

    //Adding Post DOC
    const postRef = await addDoc(
      collection(db, "reels"),
      {
        reelUrl: url,
        username,
        pfp,
        owner_uid: uid,
        caption: values.caption,
        createdAt: serverTimestamp(),
        likes_by_users: [],
        comments: [],
      },
      { merge: true }
    );

    //Updating the Document for storing post id
    await updateDoc(doc(db, "reels", postRef.id), {
      id: postRef.id,
    });
    Alert.alert("Upload Success");
  } catch (error) {
    console.log(error);
    return Alert.alert("Upload UnsuccessFull");
  }
};

export const uploadImage = async (values) => {
  const uid = auth.currentUser.uid;
  try {
    //Slicing Filename from URI
    const filename = values.uri.substring(values.uri.lastIndexOf("/") + 1);

    //Storage Bucket URI
    const imageRef = ref(storage, `images/${filename}`);

    //Need to create a BLOB from the Image URI
    const blob = await getBlobFromUri(values.uri)

    //Uploading to Firebase
    await uploadBytes(imageRef, blob)

    //Obtaining the Download URL
    const downloadURL = await getDownloadURL(imageRef);
    const url = downloadURL.replace("https://firebasestorage.googleapis.com","https://ik.imagekit.io/kudozog");

    //Creating the Firestore Ref
    const userRef = await getDoc(doc(db, "users", uid));

    //Destucturing username and pfp 
    const { username, pfp } = userRef.data();

    //Adding Post DOC
    const postRef = await addDoc(
      collection(db, "posts"),
      {
        imageUrl: url,
        username,
        pfp,
        owner_uid: uid,
        caption: values.caption,
        createdAt: serverTimestamp(),
        likes_by_users: [],
        comments: [],
      },
      { merge: true }
    );

    //Updating the Document for storing post id
    await updateDoc(doc(db, "posts", postRef.id), {
      id: postRef.id,
    });
    Alert.alert("Upload Success");
  } catch (error) {
    return Alert.alert("Upload UnsuccessFull");
  }
};

//BLOB CREATOR
const getBlobFromUri = async (uri) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  return blob;
};

//Handling Likes
export const handleLike = async (post) => {
  const userId = auth.currentUser.uid;
  const currentLikeStatus = !post.likes_by_users.includes(userId);
  await updateDoc(doc(db, "posts", post.id), {
    likes_by_users: currentLikeStatus
      ? arrayUnion(userId)
      : arrayRemove(userId),
  });
};

//Checking if a user has Liked
export const checkLike = (post) => {
  return post.likes_by_users.includes(auth.currentUser.uid) ? true : false;
};
