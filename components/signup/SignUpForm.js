import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import Validator from "email-validator";
import { useNavigation } from "@react-navigation/native";
import { signUpwithEmail } from "../../lib/auth";
import { SignUpFormSchema } from "../../utils/schemas";
import { createUser } from "../../lib/db";

export default function SignUpForm() {
  const navigation = useNavigation();

  const handleRegister = async (email, password, username) => {
    try {
      const authUser = await signUpwithEmail(email, password);
      await createUser(authUser, username);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", username: "", password: "" }}
      onSubmit={(values) =>
        handleRegister(values.email, values.password, values.username)
      }
      validationSchema={SignUpFormSchema}
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
          <View style={styles.container}>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.email.length < 1 || Validator.validate(values.email)
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    1 > values.username.length || values.username.length >= 3
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder="Username"
                autoCapitalize="none"
                textContentType="name"
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
              />
            </View>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    1 > values.password.length || values.password.length >= 8
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder="Password"
                autoCapitalize="none"
                secureTextEntry={true}
                textContentType="password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>
            <View style={{ marginBottom: 13 }}>
              <Text style={{ textAlign: "right", color: "#6BB0F5" }}>
                Forgot Password
              </Text>
            </View>
            <Pressable
              onPress={handleSubmit}
              disabled={!isValid}
              style={styles.button(isValid)}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 16, color: "white" }}
              >
                Sign Up
              </Text>
            </Pressable>
            <View style={styles.signupContainer}>
              <Text>Have and Account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={{ color: "#6BB0F5", fontWeight: "bold" }}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  inputField: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    marginBottom: 10,
  },
  button: (isValid) => ({
    backgroundColor: isValid ? "#0096F6" : "#9ACAF7",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 4,
  }),
  signupContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 50,
  },
});
