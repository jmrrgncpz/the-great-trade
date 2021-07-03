import { storageRef, db } from "../firebase";
import { getCurrentUser } from "./AuthenticationService";

// loads items of current user
// NOTE: this doesn't include images
// images are loaded separately when the Item component is loaded
export const getUserItems = async (currentUser) => {
  if (!currentUser) {
    return Promise.resolve([]);
  }

  // users/{user id}/items/*
  const querySnapshot = await db
    .collection(`users`)
    .doc(currentUser.uid)
    .collection("items")
    .get();

  const items = [];
  querySnapshot.forEach((doc) => {
    items.push({
      ...doc.data(),
      id: doc.id
    })
  });
  return items;
};

export const getItemFirstImageURLAsync = async (itemId) => {
  const imageItemsRef = storageRef.child(`item-images/${itemId}`);
  const images = [];
  const res = await imageItemsRef.listAll()
  res.items.forEach(itemRef => {
    images.push(itemRef);
  });
  const url = await images[0].getDownloadURL();
  return url;
}

export const submitNewItemAsync = async ({ images, ...rest }) => {
  const uid = getCurrentUser().uid;
  if (!uid) {
    throw "User not signed in.";
  }

  // save item to db
  const newItemRef = await db
    .collection("users")
    .doc(uid)
    .collection("items")
    .add({
      ...rest,
      createdOn: Date.now(),
    });

  const imageUploadPromises = saveItemImages(newItemRef.id, images);
  return imageUploadPromises;
};

const saveItemImages = (itemId, images) => {
  const itemFolder = storageRef.child(`item-images/${itemId}`);

  // get promises of image-upload tasks
  return images.map(async (image) => {
    const itemName = getItemName(image.uri);
    // fetch image from device memory to retrieve BLOB
    const res = await fetch(image.uri);
    const imageBlob = await res.blob();

    return itemFolder
      .child(itemName)
      .put(imageBlob, { contentType: "image/jpeg" });
  });
};

// splits the Image URI with / and
// take the last entry to get the file name
const getItemName = (uri) => {
  const uriSplit = uri.split("/");
  return uriSplit[uriSplit.length - 1];
};
