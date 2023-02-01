import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  StatusBar,
  View,
  Pressable,
  FlatList,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Details from './Details';
import {placeList} from '../assets/data/foodlist';
import COLORS from '../assets/colors';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
const {width} = Dimensions.get('screen');

// Travel
export default function Travel({navigation}) {
  const [post, setPost] = useState();

  const pressHandler = () => {
    navigation.navigate(Details);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataList = [];
        database()
          .ref('Items')
          .orderByChild('Category_ID')
          .equalTo(2)
          .once('value')
          .then(response => {
            // console.log(response.val());
            response.forEach(doc => {
              const {Title, images, Details, Phone, Address} = doc.val();

              dataList.push({
                title: Title,
                image: images,
                detail: Details,
                phone: Phone,
                address: Address,
              });
            });

            setPost(dataList);
          });
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const Card = ({place}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Details', {
            title: place.title,
            images: place.image,
            details: place.detail,
            phone: place.phone,
            address: place.address,
          })
        }
        style={{top: 5, marginHorizontal: 20, marginVertical: 10}}>
        <ImageBackground style={styles.ImgCard} source={{uri: place.image[0]}}>
          <Text style={styles.title}>{place.title}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <FlatList
        style={styles.shadow}
        data={post}
        renderItem={({item}) => <Card place={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    flex: 1,
  },
  ImgCard: {
    height: 200,
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 8,
  },
  title: {
    color: COLORS.white,
    padding: 10,
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    letterSpacing: -1,
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
});
