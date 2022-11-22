import * as yup from "yup";

export const furnitureImagesSchema = yup.object().shape({
  image_altname: yup.string().min(50, "Informe um nome de imagem alternativo por razões de acessibilidade").required("Nome alternativo é obrigatório!"),
  image_path: yup.string().min(100, "Informe um arquivo").required("Um arquivo de imagem é obrigatório!"),
});
