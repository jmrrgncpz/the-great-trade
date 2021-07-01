import * as firebase from "firebase";
import "firebase/firestore";
import * as Facebook from "expo-facebook";
import Constants from 'expo-constants';
import * as GoogleAuthentication from 'expo-google-app-auth'

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
  return signInToFirebase(credential, result.token);
}

export async function signInWithGoogleAsync() {
  const res = await GoogleAuthentication.logInAsync({
    clientId: Constants.manifest.extra.goAndroidStandaloneAppClientId,
    scopes: ['profile', 'email']
  })

  if (res.type != 'success') {
    return Promise.reject({ type: 'cancel' });
  }

  const { idToken, accessToken } = res;
  const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
  return signInToFirebase(credential, accessToken);
}

async function signInToFirebase(credential, token) {
  const setPersistence = () => firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  const signIn = () => firebase.auth().signInWithCredential(credential);

  return Promise.all([setPersistence(), signIn()])
  .then(() => {
    return Promise.resolve({ type: 'success', token });
  })
}
