import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string().min(5, "Username must be longer than 5 characters!").required("Username is required!"),
  cpf: yup.string().min(11, "CPF must be 11 characters long!!").required("CPF is required!"),
  phone: yup.string().min(11, "Phone number must include DDD!").required("Phone number is required!"),
  email: yup.string().email().required("Email address is required!"),
  password: yup.string().min(8, "Password must be at least 8 characters long!").required("Password is required!"),
});
