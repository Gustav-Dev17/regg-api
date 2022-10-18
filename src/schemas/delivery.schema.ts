import * as yup from "yup";

export const deliverySchema = yup.object().shape({
  status: yup.mixed().oneOf(["Accepted", "InProgress", "Refused", "Waiting", "Finished"]),
  origin: yup.string().required("Origin coordinates are required!"),
  origin_desc: yup.string().required("Origin description is required!"),
  destine: yup.string().required("Destine coordinates are required!"),
  destine_desc: yup.string().required("Destine description is required!"),
  userId: yup.string().notRequired(),
  selectedItemsId: yup.string().required("selected items are required to create a delivery!"),
  transporterId: yup.string().required("A transporter ID is required to create a delivery!"),
});
