import * as yup from "yup";

export const deliverySchema = yup.object().shape({
  status: yup.mixed().oneOf(["Accepted", "InProgress", "Refused", "Waiting", "Finished"]),
  origin: yup.string().required("As coordenadas de origem são obrigatórias!"),
  origin_desc: yup.string().required("Descrição da origem é obrigatória!"),
  destine: yup.string().required("As coordenadas de destino são obrigatórias!"),
  destine_desc: yup.string().required("Descrição do destino é obrigatória!"),
  distance: yup.string().required("A distância é obrigatória!"),
  isPaid: yup.boolean().notRequired(),
  paymentId: yup.string().notRequired(),
  userId: yup.string().notRequired(),
  selectedItemsId: yup.string().required("Itens selecionados são obrigatórios para solicitar uma entrega!"),
  transporterId: yup.string().required("Informar um transportador é obrigatório!"),
});
