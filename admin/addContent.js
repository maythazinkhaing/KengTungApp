import React, {useState} from 'react';
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
import {Dropdown} from 'react-native-element-dropdown';

import COLORS from '../assets/colors';

const AddContent = ({navigation}) => {
  const [image, setImage] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  //for dropDown
  const [value, setValue] = useState(null);
  const [Subvalue, setSubValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const [Category, setCategory] = useState([]);
  const [SubCategory, setSubCategory] = useState([]);

  const [Title, setTitle] = useState(null);
  const [Address, setAddress] = useState(null);
  const [Phn, setPhn] = useState(null);
  const [Details, setDetails] = useState(null);

  //dropdown action
  database()
    .ref('/Categories/')
    .once('value')
    .then(response => {
      let c = [];
      var r = Object.keys(response.val()).length;
      for (var i = 1; i < r; i++) {
        c.push({
          label: response.val()[i],
          value: i,
        });
      }

      setCategory(c);
    });

  //handle sub Category DropDown
  const handleSubCategory = catID => {
    if (catID === 1) {
      database()
        .ref('SubCategories')
        .orderByChild('catID')
        .equalTo(1)
        .once('value')
        .then(response => {
          let c = [];
          var r = Object.keys(response.val()).length;
          response.forEach(data =>
            c.push({
              label: data.val().name,
              value: data.key,
            }),
          );
          setSubCategory(c);
        });
    } else {
      setSubCategory([{label: 'No Sub-Category', value: '0'}]);
    }
  };

  const renderLabel = () => {
    if (value || isFocus1) {
      return (
        <Text style={[styles.label, isFocus1 && {color: 'darkred'}]}>
          Categories
        </Text>
      );
    }
    return null;
  };

  const renderLabel2 = () => {
    if (Subvalue || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: 'darkred'}]}>
          Sub-Category
        </Text>
      );
    }
    return null;
  };
  //end Drop down

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
          const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
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
    const imageURL = await uploadImage();
    console.log(imageURL);
    // console.log(value);
    database()
      .ref('/Items')
      .once('value')
      .then(response => {
        var r = Object.keys(response.val()).length + 1;
        let getID;
        let subID;
        if (value == 1) {
          subID = Subvalue;
        }
        console.log('get ID is :' + getID);
        console.log('get Item ID is :' + r);

        const itemRef = database().ref('Items');
        itemRef
          .child('T' + r + '-' + Date.now())
          .set({
            Title: Title,
            Details: Details,
            Address: Address,
            Phone: Phn,
            images: imageURL,
            Category_ID: value,
            Sub_Category: subID,
          })
          .then(() => {
            console.log('Complete Posted!');
            setAddress(null);
            setDetails(null);
            setPhn(null);
            setTitle(null);
          })
          .catch(error => {
            console.log(
              'Something went wrong with added post to firestore.',
              error,
            );
          });
      });
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
        Alert.alert('Completely Uploaded New Item...');
        setImage([]);

        return url;
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white', height: '100%'}}>
      {/*  dropdown */}

      <View style={styles.container}>
        <View style={styles.DropdownContainer}>
          {renderLabel()}
          <Dropdown
            style={[styles.dropdown, isFocus1 && {borderColor: 'darkred'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={Category}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select Category' : '...'}
            value={value}
            onFocus={() => setIsFocus1(true)}
            onBlur={() => setIsFocus1(false)}
            onChange={item => {
              setValue(item.value);
              handleSubCategory(item.value);
              setIsFocus1(false);
            }}
          />
        </View>
        <View style={styles.DropdownContainer}>
          {renderLabel2()}
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'darkred'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={SubCategory}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select Sub-Category' : '...'}
            value={Subvalue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setSubValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>
      </View>
      {/* dropdown */}
      <View>
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
        {uploading ? (
          <View>
            <Text>{transferred} % Completed!</Text>
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          <View style={styles.btn}>
            <Button onPress={submitPost} title="ADD" color="black" />
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

const styles = StyleSheet.create({
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

export default AddContent;
