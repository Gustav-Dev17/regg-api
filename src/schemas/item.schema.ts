import * as yup from "yup";

export const itemSchema = yup.object().shape({
  name: yup.string().min(2, "Item name must be at least 1 character long!").required("Item name is required!"),
  price: yup.number().required("Item price is required!"),
  userId: yup.string(),
  deliveryId: yup.string(),
});
