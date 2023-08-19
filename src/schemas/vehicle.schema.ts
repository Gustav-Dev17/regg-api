import * as yup from "yup";

export const vehicleSchema = yup.object().shape({
  owner_name: yup.string(),
  owner_cpf: yup.string(),
  brand: yup.string().min(1, "Marca do veículo deve ter pelo menos 1 caracter!").required("Informe a marca do veículo!"),
  model: yup.string().min(1, "Modelo do veículo deve ter pelo menos 1 caracter!").required("Informe o modelo do veículo!"),
  capacity: yup.string().min(1, "Capacidade do veículo deve ter pelo menos 1 caracter!").notRequired(),
  year: yup.string().min(4, "O ano tem pelo menos 4 caracteres!").required("Informe o ano do veículo!"),
  color: yup.string().min(3, "A cor do veículo deve ter pelo menos 3 caracteres!").notRequired(),
  fuel: yup.string().min(3, "Combustível do veículo deve ter pelo menos 3 caracteres!").notRequired(),
  type: yup.mixed().oneOf(["Pickup", "Caminhao_Toco", "Caminhao_Truck", "Carreta_5Eixos", "Carreta_Eixo_Estendido"]).required("Informe o tipo do veículo!"),
  license_plate: yup.string().min(7, "A placa do veículo deve conter pelo menos 7 caracteres!").required("Informa a placa do veículo!"),
  renavam: yup.string().min(9, "O renavam deve ter pelo menos 9 caracteres!").required("Informe o renavam do veículo!"),
  chassi: yup.string().min(17, "O chassi do veíuclo deve ter pelo menos 17 caracteres!").notRequired(),
  transporterId: yup.string(),
});
