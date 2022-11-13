import * as yup from "yup";

export const itemSchema = yup.object().shape({
  title: yup.string().min(2, "Item title must be at least 1 character long!").required("Item title is required!"),
  price: yup.number().required("Item price is required!"),
});
