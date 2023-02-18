import path from "path";

export default {
  sandbox: Boolean(process.env.SANDBOX),
  client_id: String(process.env.CLIENT_ID),
  client_secret: String(process.env.CLIENT_SECRET),
  certificate: path.join(__dirname, "..", "certificates", "homologacao-438445-Reggie.p12"),
};
