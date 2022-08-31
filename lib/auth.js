import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-native";
import { auth } from "./firebase";

export const signUpwithEmail = async (email, password) => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    return Alert.alert(error.message);
  }
};

export const signInWithEmail = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return console.log("Firebase Authentication Successfull");
  } catch (error) {
    return Alert.alert(error.message);
  }
};

export const LogOut = async () => {
  try {
    await auth.signOut()
    console.log('Sign Out Success');
  } catch (error) {
    Alert.alert(error.message);
  }

}
