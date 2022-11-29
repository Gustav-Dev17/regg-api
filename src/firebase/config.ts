import firebaseAdmin from "firebase-admin";
import serviceAccount from "./regg-86e2b-firebase-adminsdk-zauge-6c5a6b6600.json"

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount as any),
  storageBucket: "gs://regg-86e2b.appspot.com",
});
const bucket = firebaseAdmin.storage().bucket();

export { bucket };

