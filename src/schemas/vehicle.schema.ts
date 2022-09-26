import * as yup from "yup";

export const vehicleSchema = yup.object().shape({
  owner_name: yup.string(),
  owner_cpf: yup.string(),
  brand: yup.string().min(1, "Vehicle brand must be longer than 1 character!").required("Vehicle brand is required!"),
  model: yup.string().min(1, "Vehicle model must be longer than 1 character!").required("Vehicle model is required!"),
  capacity: yup.string().min(1, "Vehicle capacity must be longer than 1 character!").notRequired(),
  year: yup.string().min(4, "Vehicle year must be at least 4 characters long!").required("Vehicle year is required!"),
  color: yup.string().min(4, "Vehicle color must be at least 4 characters long!").notRequired(),
  fuel: yup.string().min(4, "Vehicle fuel must be at least 4 characters long!").notRequired(),
  license_plate: yup.string().min(7, "Vehicle license plate must be 7 characters long!").required("Vehicle license plate is required!"),
  renavam: yup.string().min(9, "Vehicle renavam must be 9 characters long!").required("Vehicle renavam is required!"),
  chassi: yup.string().min(17, "Vehicle chassi must be 17 characters long!").required("Vehicle chassi is required!"),
  transporterId: yup.string(),
});
