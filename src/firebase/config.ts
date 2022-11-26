const serviceAccount = require("./regg-86e2b-firebase-adminsdk-zauge-6c5a6b6600.json");
import firebaseAdmin from "firebase-admin";

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  storageBucket: "gs://regg-86e2b.appspot.com",
});
const bucket = firebaseAdmin.storage().bucket();

export { bucket };

