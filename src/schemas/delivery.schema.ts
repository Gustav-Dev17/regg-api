import * as yup from "yup";

export const deliverySchema = yup.object().shape({
  status: yup.mixed().oneOf(["Accepted", "InProgress", "Refused", "Waiting", "Finished", "Cancelled"]).required("A valid status is required!"),
  origin: yup.string().required("Origin coordinates are required!"),
  origin_desc: yup.string().required("Origin description is required!"),
  destine: yup.string().required("Destine coordinates are required!"),
  destine_desc: yup.string().required("Destine description is required!")
});
