import * as yup from "yup";
export const userSchemaValidations = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Not a valid email format").required("Email is required"),
  password: yup.string().min(4).max(20).required("Password is required"),
  confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords don't match")
    .required("Confirm password is required"),
});
