import database from '@react-native-firebase/database';
import React, {useState, useEffect} from 'react';

//fetchAllFood
useEffect(() => {
  const fetchAll = async () => {
    try {
      const Alldata = [];
      database()
        .ref('/Items/')
        .orderByChild('Category_ID')
        .equalTo(1)
        .once('value')
        .then(response => {
          response.forEach(doc => {
            const {Title, images} = doc.val();
            Alldata.push({
              title: Title,
              image: images[0],
            });
          });
          console.log(Alldata);
          setPost(Alldata);
        });
    } catch (e) {
      console.log(e);
    }
  };
  fetchAll();
}, []);

export default fetchAll;
