import * as yup from "yup";

export const authGoogleSchema = yup.object().shape({
  email: yup.string().email().required("Email address is required!"),
});
