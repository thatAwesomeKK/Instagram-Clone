import * as Yup from "yup";
export const SignUpFormSchema = Yup.object().shape({
  email: Yup.string().email().required("An email is required"),
  username: Yup.string()
    .required()
    .min(2, "username must be at least 3 characters"),
  password: Yup.string()
    .required()
    .min(8, "Password must be at least 8 characters long"),
});

export const LoginFormSchema = Yup.object().shape({
  email: Yup.string().email().required("An email is required"),
  password: Yup.string()
    .required()
    .min(8, "Password must be at least 8 characters long"),
});

export const uploadPostSchema = Yup.object().shape({
  caption: Yup.string()
    .max(2200, "Caption has reached the maximum")
    .required("A URL is required"),
});
