import * as firebase from "firebase";
import keys from "./config/keys";

if (!firebase.apps.length) {
  firebase.initializeApp(keys);
}

export default firebase;
