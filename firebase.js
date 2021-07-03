import * as firebase from "firebase";
import keys from "./config/keys";

if (!firebase.apps.length) {
  firebase.initializeApp(keys);
}

export default firebase;

const storage = firebase.storage();
export const storageRef = storage.ref();

export const db = firebase.firestore();