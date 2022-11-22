import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string().min(5, "Nome de usuário deve conter mais de 5 caracteres!").required("Informe um nome de usuário!"),
  cpf: yup.string().min(11, "O CPF deve conter pelo menos 11 caracteres!").required("Informe o CPF!"),
  phone: yup.string().min(11, "Telefone de ter pelo menos 11 caracteres, além do DDD!").required("Informe um número de telefone!"),
  email: yup.string().email().required("Informe um endereço de e-mail!"),
  password: yup.string().min(8, "A senha deve conter pelo menos 8 caracteres!").required("Informe uma senha!"),
});
