import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  ImageBackground,
  FlatList,
  Text,
  TouchableOpacity,
  alert,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/Ionicons';

import COLORS from '../assets/colors';

export const HandleUpdate = ({route}) => {
  const [image, setImage] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const [Title, setTitle] = useState(null);
  const [Address, setAddress] = useState(null);
  const [Phn, setPhn] = useState(null);
  const [Details, setDetails] = useState(null);
  const [Short, setShort] = useState(null);
  const [DEL, setDEL] = useState('0');
  const [Category, setCategory] = useState(null);
  const [SubCategory, setSubCategory] = useState(null);

  const ID = route.params.id;

  console.log(ID);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const imageList = [];

        database()
          .ref(`Items/${ID}`)
          .once('value')
          .then(response => {
            console.log(response.val());

            const {
              Title,
              images,
              Details,
              Phone,
              Address,
              Short_Description,
              Sub_Category,
              Category_ID,
            } = response.val();
            setTitle(Title);
            setDetails(Details);
            setPhn(Phone);
            setAddress(Address);
            setShort(Short_Description);
            setCategory(Category_ID);
            setSubCategory(Sub_Category);
            console.log('Images are :' + images);
            images.map(image => {
              imageList.push({
                imageUri: image,
              });
            });

            setImage(imageList);

            console.log(image);
          });
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  //choosePhoto
  const choosePhoto = () => {
    let imageList = [];
    ImagePicker.openPicker({
      multiple: true,
      maxFiles: 5,
      compressImageQuality: 0.8,
    })
      .then(images => {
        console.log(images);
        images.map(image => {
          const imageUri = image.path;
          imageList.push({
            imageUri,
          });
          console.log('Image Array' + imageUri);
        });
        setImage(imageList);
      })
      .catch(e => console.log('error :', e.massage));
  };

  //submit Post
  const submitPost = async () => {
    console.log(DEL);
    if (DEL == '1') {
      const imageURL = await uploadImage();
      console.log(imageURL);

      database()
        .ref(`/Items/${ID}`)
        .update({
          Category_ID: Category,
          Sub_Category: SubCategory,
          Title: Title,
          Details: Details,
          Address: Address,
          Phone: Phn,
          images: imageURL,

          Short_Description: Short,
        })
        .then(() => {
          console.log('Completely Updated!');
          setAddress(null);
          setDetails(null);
          setPhn(null);
          setTitle(null);
          setShort(null);
          setImage([]);
        })
        .catch(error => {
          console.log(
            'Something went wrong with update post to firestore.',
            error,
          );
        });
    } else {
      database()
        .ref(`/Items/${ID}`)
        .update({
          Category_ID: Category,
          Sub_Category: SubCategory,
          Title: Title,
          Details: Details,
          Address: Address,
          Phone: Phn,

          Short_Description: Short,
        })
        .then(() => {
          console.log('Completely Updated!');
          setAddress(null);
          setDetails(null);
          setPhn(null);
          setTitle(null);
          setShort(null);
          setImage([]);
        })
        .catch(error => {
          console.log(
            'Something went wrong with update post to firestore.',
            error,
          );
        });
    }
  };

  //upload images to storage
  const uploadImage = async () => {
    let uploadUri;
    let fileName;
    let r = image.length;
    const url = [];
    console.log(r);
    for (var i = 0; i < r; i++) {
      uploadUri = image[i].imageUri;
      fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

      // Add timestamp to File Name
      const extension = fileName.split('.').pop();
      const name = fileName.split('.').slice(0, -1).join('.');
      fileName = name + Date.now() + '.' + extension;

      setUploading(true);
      setTransferred(0);

      const storageRef = storage().ref(`Photo/${fileName}`);
      const task = storageRef.putFile(uploadUri);

      //set Transfer
      task.on('state_changed', taskSnapshot => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );

        setTransferred(
          Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
            100,
        );
      });
      try {
        await task;

        const u = await storageRef.getDownloadURL();
        url.push(u);
        // const url[] = await storageRef.getDownloadURL();

        setUploading(false);
        Alert.alert('Completely Updated Item...');
        setImage([]);
      } catch (error) {
        console.log(error);
      }
    }
    return url;
  };

  //de
  const Delete = () => {
    console.log('Current ID is : ' + ID);
    setDEL('1');
    database()
      .ref(`Items/${ID}`)
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
              database()
                .ref(`/Items/${ID}/images`)
                .remove()
                .then(() => {
                  Alert.alert(
                    'Images deleted!',
                    'The image has been deleted successfully!',
                  );
                  setImage([]);
                })
                .catch(e => console.log('Error deleting posst.', e));

              console.log(`${image} has been deleted successfully.`);
            })
            .catch(e => {
              console.log('Error while deleting the image. ', e);
            });
        });
      });
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white', height: '100%'}}>
      <View style={{paddingTop: 10}}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor="grey"
          value={Title}
          onChangeText={text => setTitle(text)}
        />
        <TextInput
          style={styles.Dinput}
          placeholder="Details"
          placeholderTextColor="grey"
          multiline={true}
          value={Details}
          onChangeText={text => setDetails(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Short Description"
          placeholderTextColor="grey"
          multiline={true}
          value={Short}
          onChangeText={text => setShort(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor="grey"
          value={Address}
          onChangeText={text => setAddress(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          placeholderTextColor="grey"
          value={Phn}
          onChangeText={text => setPhn(text)}
        />
      </View>
      <View
        style={{
          margin: 15,
          marginBottom: 0,
          flexDirection: 'row',
        }}>
        <TouchableOpacity style={styles.btn}>
          <Button onPress={choosePhoto} title="Choose Pics" color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Button onPress={() => Delete()} title="Reset Photo" color="black" />
        </TouchableOpacity>
        {uploading ? (
          <View>
            <Text>{transferred} % Completed!</Text>
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          <View style={styles.btn}>
            <Button onPress={submitPost} title="UPDATE ITEM" color="black" />
          </View>
        )}
      </View>

      <View style={{padding: 30, flex: 1, paddingTop: 9}}>
        <FlatList
          data={image}
          renderItem={({item}) => (
            <ImageBackground
              source={{
                uri: item.imageUri,
              }}
              style={styles.img}></ImageBackground>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 20,
    marginTop: 0,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    fontSize: 12,
  },
  Dinput: {
    height: 100,
    margin: 20,
    marginTop: 0,
    marginBottom: 10,
    borderWidth: 6,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  img: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  btn: {
    flex: 1,
    paddingHorizontal: 10,
  },
  overlay: {
    backgroundColor: '#FFBF4B',
    opacity: 0.65,
    width: '100%',
    height: '100%',
  },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: 'row',
  },
  DropdownContainer: {
    marginVertical: 7,
    flex: 1,
    paddingHorizontal: 2,
  },
  dropdown: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 7,
  },
  icon: {
    marginRight: 5,
    fontSize: 12,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: -10,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 12,
  },
  placeholderStyle: {
    fontSize: 12,
  },
  selectedTextStyle: {
    fontSize: 12,
    paddingHorizontal: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
