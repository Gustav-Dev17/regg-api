import * as yup from "yup";

export const avatarImagesSchema = yup.object().shape({
  avatar_path: yup.string().min(100, "Informe um arquivo!").required("O diretório do arquivo é obrigatório!"),
  userId: yup.string().min(50, "Provide the user ID").required("O id do usuário é obrigatório!"),
});
