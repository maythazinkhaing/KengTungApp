import {Alert} from 'react-native';
import database, {firebase} from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import React, {useState} from 'react';
export const handleDelete = async itemID => {
  console.log(itemID);
  try {
    Alert.alert('Delete Item', 'Are you sure you want to delete this item?', [
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: 'No',
      },
      // The "Yes" button

      {
        text: 'Yes',

        onPress: () => Delete(itemID),
      },
    ]);
  } catch (e) {
    console.log(e);
  }
};

export const Delete = itemID => {
  console.log('Current ID is : ' + itemID);
  database()
    .ref(`Items/${itemID}`)
    .once('value')
    .then(doc => {
      const {images} = doc.val();
      console.log(' Image is : ' + images);
      images.map(image => {
        const storageRef = storage().refFromURL(image);
        const imageRef = storage().ref(storageRef.fullPath);

        imageRef
          .delete()
          .then(() => {
            console.log(`${image} has been deleted successfully.`);
            deleteFirestoreData(itemID);
          })
          .catch(e => {
            console.log('Error while deleting the image. ', e);
          });
      });
    });
};

const deleteFirestoreData = ItemID => {
  database()
    .ref(`/Items/${ItemID}`)
    .remove()
    .then(() => {
      Alert.alert('Post deleted!', 'Your post has been deleted successfully!');
    })
    .catch(e => console.log('Error deleting posst.', e));
};
