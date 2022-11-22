import * as yup from "yup";

export const selectedItemsSchema = yup.object().shape({
  status: yup.mixed().oneOf(["InProgress","Finished", "Selected"]),
  items: yup.array().of(yup.object().shape({ id: yup.string(), image: yup.string(), quantity: yup.number(), title: yup.string(), price: yup.number() })).notRequired(),
  items_amount: yup.number().required("Quantidade dos itens é obrigatória!"),
  items_price: yup.number().required("Preço dos itens é obrigatório!"),
  delivery_price: yup.number().required("Preço do transporte é obrigatório!"),
  userId: yup.string(),
  deliveryId: yup.string(),
});
