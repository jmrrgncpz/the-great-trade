import * as firebase from "firebase";
import "firebase/firestore";
import * as Facebook from "expo-facebook";
import keys from "../config/keys";

if (!firebase.apps.length) {
  firebase.initializeApp(keys);
}


export async function signOut() {
  return firebase.auth().signOut()
}

export async function isUserSignedIn() {
  return firebase.auth().onAuthState
}

export async function signInWithFacebookAsync() {
  const result = await Facebook.logInWithReadPermissionsAsync({
    permissions: ["public_profile", "email"],
  });

  if (result.type != "success") {
    return Promise.reject({ type: 'cancel' });
  }

  const credential = firebase.auth.FacebookAuthProvider.credential(result.token);
  const setPersistence = () => firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  const signIn = () => firebase.auth().signInWithCredential(credential);

  return Promise.all([setPersistence(), signIn()])
  .then(() => {
    return Promise.resolve({ type: 'success', token: result.token });
  })
}

export async function signInWithGoogleAsync() {
  const result = await Facebook.logInWithReadPermissionsAsync({
    permissions: ["public_profile", "email"],
  });

  console.log(result);

  if (result.type != "success") {
    return Promise.reject({ type: 'cancel' });
  }

  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  const credential = firebase.auth.FacebookAuthProvider.credential(result.token);
  const facebookProfileData = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

  return Promise.resolve({ type: 'success'});
}
