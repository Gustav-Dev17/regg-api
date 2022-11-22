import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email().required("Informe o endereço de e-mail!"),
  password: yup.string().required("Informe a senha!"),
});
