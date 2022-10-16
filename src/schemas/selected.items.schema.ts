import * as yup from "yup";

export const selectedItemsSchema = yup.object().shape({
  status: yup.mixed().oneOf(["Accepted", "InProgress", "Refused", "Waiting", "Finished"]).required("A valid status is required!"),
  items: yup.array().of(
    yup.object().shape({
      id: yup.string(),
      image: yup.string(),
      quantity: yup.number(),
      title: yup.string(),
      price: yup.number(),
    }),
  ),
  items_amount: yup.number().required("Items amount is required!"),
  items_price: yup.number().required("Items price is required!"),
  delivery_price: yup.number().required("Delivery price is required!"),
  userId: yup.string(),
  deliveryId: yup.string(),
});
