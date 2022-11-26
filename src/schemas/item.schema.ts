import * as yup from "yup";

export const itemSchema = yup.object().shape({
  title: yup.string().min(2, "Título do item deve ter pelo menos 1 caractere!").required("Título do item é obrigatório!"),
  price: yup.number().required("Preço do item é obrigatório!"),
  image: yup.string().optional(),
});

